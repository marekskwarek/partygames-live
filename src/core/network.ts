'use client';

import type {
  ClientEnvelope,
  ClientMessage,
  HostMessage,
  RoomState,
} from './types';

/**
 * Niezawodna warstwa sieciowa czasu rzeczywistego dla PartyGames Live.
 * Wykorzystuje oficjalną bazę Firebase Realtime Database projektu partygames-live
 * po standardowym porcie HTTPS 443 (SSE EventSource + szybki polling REST)
 * oraz lokalny BroadcastChannel. Działa w 100% na każdej sieci komórkowej (LTE/5G)
 * i Wi-Fi bez blokowania portów ani problemów z NAT/CGNAT.
 */

const RTDB_BASE_URL =
  'https://partygames-live-default-rtdb.europe-west1.firebasedatabase.app';

const channelName = (room: string) => `party-hub-net-${room.toUpperCase()}`;

function newMessageId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function isEnvelope(data: unknown): data is ClientEnvelope {
  return (
    !!data &&
    typeof data === 'object' &&
    'mid' in data &&
    'message' in data
  );
}

interface CloudInboxEntry {
  json: string;
  ts: number;
}

interface CloudStateEntry {
  json: string;
  updatedAt: number;
}

export class PartyNetworkHost {
  private roomCode: string;
  private bc: BroadcastChannel | null = null;
  private eventSource: EventSource | null = null;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private isPolling = false;
  private seen = new Set<string>();
  private seenQueue: string[] = [];
  private destroyed = false;
  private onMessage: (msg: ClientMessage) => void;
  private onClientConnected: () => void;

  private pendingStatePayload: string | null = null;
  private isFlushingState = false;

  constructor(
    roomCode: string,
    onMessage: (msg: ClientMessage) => void,
    onClientConnected: () => void
  ) {
    this.roomCode = roomCode.toUpperCase();
    this.onMessage = onMessage;
    this.onClientConnected = onClientConnected;
    this.initBroadcastChannel();
    this.initCloudHost();
  }

  private accept(envelope: ClientEnvelope) {
    if (!envelope || !envelope.mid || this.seen.has(envelope.mid)) return;
    this.seen.add(envelope.mid);
    this.seenQueue.push(envelope.mid);
    if (this.seenQueue.length > 600) {
      const old = this.seenQueue.shift();
      if (old) this.seen.delete(old);
    }
    this.onMessage(envelope.message);
  }

  private processInboxEntry(mid: string, entry: CloudInboxEntry | null | undefined) {
    if (!entry || typeof entry.json !== 'string') return;
    if (!this.seen.has(mid)) {
      try {
        const parsed = JSON.parse(entry.json);
        if (isEnvelope(parsed)) {
          this.accept(parsed);
        }
      } catch {
        // ignore invalid json
      }
    }
  }

  private initBroadcastChannel() {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    this.bc = new BroadcastChannel(channelName(this.roomCode));
    this.bc.onmessage = (ev) => {
      if (ev.data?.direction === 'CLIENT_TO_HOST' && isEnvelope(ev.data.envelope)) {
        this.accept(ev.data.envelope);
      }
    };
  }

  private initCloudHost() {
    if (typeof window === 'undefined' || this.destroyed) return;

    const inboxUrl = `${RTDB_BASE_URL}/rooms/${this.roomCode}/inbox.json`;

    // 1. Strumień czasu rzeczywistego SSE (Server-Sent Events) z Firebase RTDB
    if ('EventSource' in window) {
      try {
        const es = new EventSource(inboxUrl);
        this.eventSource = es;

        const handleSseEvent = (ev: MessageEvent) => {
          if (this.destroyed || !ev.data) return;
          try {
            const payload = JSON.parse(ev.data);
            if (!payload || typeof payload !== 'object') return;
            const { path, data } = payload as { path?: string; data?: unknown };
            if (!path || !data) return;

            if (path === '/') {
              const map = data as Record<string, CloudInboxEntry>;
              Object.entries(map).forEach(([mid, entry]) => {
                this.processInboxEntry(mid, entry);
              });
            } else {
              const mid = path.replace(/^\//, '').split('/')[0];
              if (mid && typeof data === 'object') {
                this.processInboxEntry(mid, data as CloudInboxEntry);
              }
            }
          } catch {
            // ignore
          }
        };

        es.addEventListener('put', handleSseEvent as EventListener);
        es.addEventListener('patch', handleSseEvent as EventListener);
      } catch {
        // fallback to polling
      }
    }

    // 2. Niezawodny szybki polling (co 700ms) + czyszczenie przetworzonych wiadomości
    const pollInbox = async () => {
      if (this.destroyed || this.isPolling) return;
      this.isPolling = true;
      try {
        const res = await fetch(inboxUrl, { cache: 'no-store' });
        if (res.ok) {
          const map = (await res.json()) as Record<string, CloudInboxEntry> | null;
          if (map && typeof map === 'object') {
            const now = Date.now();
            const entries = Object.entries(map).sort(
              (a, b) => (a[1]?.ts ?? 0) - (b[1]?.ts ?? 0)
            );
            for (const [mid, entry] of entries) {
              this.processInboxEntry(mid, entry);
              // Usuń z chmury wiadomości starsze niż 10 sekund, które już przetworzono
              if (this.seen.has(mid) && now - (entry?.ts ?? 0) > 10000) {
                fetch(`${RTDB_BASE_URL}/rooms/${this.roomCode}/inbox/${mid}.json`, {
                  method: 'DELETE',
                }).catch(() => {});
              }
            }
          }
        }
      } catch {
        // ignore network hiccup
      } finally {
        this.isPolling = false;
      }
    };

    pollInbox();
    this.pollTimer = setInterval(pollInbox, 700);
  }

  private async flushStateToCloud() {
    if (this.isFlushingState || this.destroyed) return;
    this.isFlushingState = true;

    while (this.pendingStatePayload !== null && !this.destroyed) {
      const payloadToSend = this.pendingStatePayload;
      this.pendingStatePayload = null;
      try {
        await fetch(`${RTDB_BASE_URL}/rooms/${this.roomCode}/state.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: payloadToSend,
        });
      } catch {
        // ignore transient error
      }
    }

    this.isFlushingState = false;
  }

  public broadcast(room: RoomState) {
    const msg: HostMessage = { type: 'ROOM_SYNC', payload: { room } };
    this.bc?.postMessage({ direction: 'HOST_TO_CLIENT', message: msg });

    const cloudEntry: CloudStateEntry = {
      json: JSON.stringify(msg),
      updatedAt: room.updatedAt || Date.now(),
    };
    this.pendingStatePayload = JSON.stringify(cloudEntry);
    this.flushStateToCloud();
  }

  public destroy() {
    this.destroyed = true;
    this.bc?.close();
    this.bc = null;
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }
}

export class PartyNetworkClient {
  private roomCode: string;
  private bc: BroadcastChannel | null = null;
  private eventSource: EventSource | null = null;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private isPolling = false;
  private destroyed = false;
  private onHostMessage: (msg: HostMessage) => void;
  private onLinkOpen: () => void;

  constructor(
    roomCode: string,
    onHostMessage: (msg: HostMessage) => void,
    onLinkOpen: () => void
  ) {
    this.roomCode = roomCode.toUpperCase();
    this.onHostMessage = onHostMessage;
    this.onLinkOpen = onLinkOpen;
    this.initBroadcastChannel();
    this.initCloudClient();
  }

  private deliverStateEntry(entry: CloudStateEntry | null | undefined) {
    if (!entry || typeof entry.json !== 'string') return;
    try {
      const msg = JSON.parse(entry.json) as HostMessage;
      if (msg && msg.type === 'ROOM_SYNC' && msg.payload?.room) {
        this.onHostMessage(msg);
      }
    } catch {
      // ignore
    }
  }

  private initBroadcastChannel() {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    this.bc = new BroadcastChannel(channelName(this.roomCode));
    this.bc.onmessage = (ev) => {
      if (ev.data?.direction === 'HOST_TO_CLIENT') {
        this.onHostMessage(ev.data.message as HostMessage);
      }
    };
  }

  private initCloudClient() {
    if (typeof window === 'undefined' || this.destroyed) return;

    const stateUrl = `${RTDB_BASE_URL}/rooms/${this.roomCode}/state.json`;

    // 1. Strumień czasu rzeczywistego SSE (Server-Sent Events) z Firebase RTDB
    if ('EventSource' in window) {
      try {
        const es = new EventSource(stateUrl);
        this.eventSource = es;

        es.onopen = () => {
          if (!this.destroyed) {
            this.onLinkOpen();
          }
        };

        const handleSseEvent = (ev: MessageEvent) => {
          if (this.destroyed || !ev.data) return;
          try {
            const payload = JSON.parse(ev.data);
            if (!payload || typeof payload !== 'object') return;
            const { path, data } = payload as { path?: string; data?: unknown };
            if (path === '/' && data && typeof data === 'object') {
              this.deliverStateEntry(data as CloudStateEntry);
            }
          } catch {
            // ignore
          }
        };

        es.addEventListener('put', handleSseEvent as EventListener);
        es.addEventListener('patch', handleSseEvent as EventListener);
      } catch {
        // fallback to polling
      }
    }

    // 2. Szybki polling REST (co 900ms) – gwarantuje odbiór stanu nawet przy uśpieniu SSE na smartfonie
    const pollState = async () => {
      if (this.destroyed || this.isPolling) return;
      this.isPolling = true;
      try {
        const res = await fetch(stateUrl, { cache: 'no-store' });
        if (res.ok) {
          const entry = (await res.json()) as CloudStateEntry | null;
          if (entry && typeof entry === 'object') {
            this.deliverStateEntry(entry);
          }
        }
      } catch {
        // ignore network hiccup
      } finally {
        this.isPolling = false;
      }
    };

    pollState();
    this.pollTimer = setInterval(pollState, 900);
  }

  public send(message: ClientMessage) {
    if (this.destroyed) return;
    const envelope: ClientEnvelope = { mid: newMessageId(), message };
    this.bc?.postMessage({ direction: 'CLIENT_TO_HOST', envelope });

    const entry: CloudInboxEntry = {
      json: JSON.stringify(envelope),
      ts: Date.now(),
    };

    fetch(`${RTDB_BASE_URL}/rooms/${this.roomCode}/inbox/${envelope.mid}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
      keepalive: true,
    }).catch(() => {});
  }

  public destroy() {
    this.destroyed = true;
    this.bc?.close();
    this.bc = null;
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }
}
