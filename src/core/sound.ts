'use client';

import type { SoundEvent } from './types';

class PartySoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public vibrate(pattern: number | number[]) {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignoruj na urządzeniach bez wsparcia Vibration API
      }
    }
  }

  // Głośny, komediowy buzzer przyłapania na słowie NIE NA P
  public playBuzzer() {
    this.vibrate([220, 70, 280]);
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Dwa rozstrojone oscylatory sawtooth dla rasowego teleturniejowego brzęczyka
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    subOsc.type = 'square';

    osc1.frequency.setValueAtTime(135, now);
    osc1.frequency.linearRampToValueAtTime(105, now + 0.65);

    osc2.frequency.setValueAtTime(142, now);
    osc2.frequency.linearRampToValueAtTime(110, now + 0.65);

    subOsc.frequency.setValueAtTime(68, now);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    osc1.connect(gain);
    osc2.connect(gain);
    subOsc.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
    subOsc.stop(now + 0.7);
  }

  // Dźwięk odgadniętego hasła (+1 pkt)
  public playSuccess() {
    this.vibrate(90);
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.065);

      gain.gain.setValueAtTime(0.32, now + idx * 0.065);
      gain.gain.exponentialRampToValueAtTime(0.008, now + idx * 0.065 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.065);
      osc.stop(now + idx * 0.065 + 0.28);
    });
  }

  // Dźwięk pominięcia hasła (PAS)
  public playPass() {
    this.vibrate(50);
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(190, now + 0.22);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  // Tykanie zegara (przyspieszone i wyższe poniżej 10 sekund)
  public playTick(urgent: boolean = false) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = urgent ? 'square' : 'sine';
    osc.frequency.setValueAtTime(urgent ? 980 : 620, now);

    gain.gain.setValueAtTime(urgent ? 0.16 : 0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.055);

    // Podwójny tik w ostatnich sekundach dla narastającego napięcia
    if (urgent) {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1180, now + 0.14);
      gain2.gain.setValueAtTime(0.11, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.14);
      osc2.stop(now + 0.195);
    }
  }

  // Dźwięk rozpoczęcia rundy
  public playRoundStart() {
    this.vibrate([80, 40, 120]);
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.08);
      gain.gain.setValueAtTime(0.28, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  // Gong kończący czas rundy
  public playRoundEnd() {
    this.vibrate([300, 100, 300]);
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(290, now);
    osc.frequency.setValueAtTime(220, now + 0.25);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.008, now + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  // Fanfary finałowe na ekranie podium
  public playFanfare() {
    this.vibrate([100, 50, 100, 50, 350]);
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const melody = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 523.25, t: 0.16, d: 0.15 },
      { f: 523.25, t: 0.32, d: 0.15 },
      { f: 659.25, t: 0.48, d: 0.4 },
      { f: 587.33, t: 0.9, d: 0.2 },
      { f: 659.25, t: 1.12, d: 0.2 },
      { f: 783.99, t: 1.35, d: 0.7 },
    ];

    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0.32, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.01, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  }
}

export const soundEngine = new PartySoundEngine();

/** Odtwarza zdarzenie dźwiękowe wygenerowane przez moduł gry. */
export function playSoundEvent(event: SoundEvent) {
  switch (event) {
    case 'BUZZER':
      soundEngine.playBuzzer();
      break;
    case 'SUCCESS':
      soundEngine.playSuccess();
      break;
    case 'PASS':
      soundEngine.playPass();
      break;
    case 'ROUND_START':
      soundEngine.playRoundStart();
      break;
    case 'ROUND_END':
      soundEngine.playRoundEnd();
      break;
    case 'FANFARE':
      soundEngine.playFanfare();
      break;
    case 'TICK':
      soundEngine.playTick(false);
      break;
    case 'TICK_URGENT':
      soundEngine.playTick(true);
      break;
  }
}
