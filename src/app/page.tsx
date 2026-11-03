'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv,
  Smartphone,
  Sofa,
  Sparkles,
  BookOpen,
  Gamepad2,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  Flame,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import HostHubView from '@/components/HostHubView';
import PlayerHubView from '@/components/PlayerHubView';
import CouchMode from '@/games/gra-na-p/CouchMode';
import HowToPlay from '@/components/HowToPlay';
import { generateRoomCode, sanitizeRoomCode } from '@/core/roomCode';

type ActiveView = 'MENU' | 'HOST_HUB' | 'PLAYER_HUB' | 'COUCH' | 'HOWTO';

function getUrlJoinCode(fromRouter: string | null): string {
  if (fromRouter) return sanitizeRoomCode(fromRouter);
  if (typeof window !== 'undefined') {
    const fromWindow = new URLSearchParams(window.location.search).get('join');
    if (fromWindow) return sanitizeRoomCode(fromWindow);
  }
  return '';
}

function MainAppContent() {
  const searchParams = useSearchParams();
  const urlJoinParam = getUrlJoinCode(searchParams.get('join'));

  const [view, setView] = useState<ActiveView>(() =>
    urlJoinParam ? 'PLAYER_HUB' : 'MENU'
  );
  const [roomCode, setRoomCode] = useState<string>(() => generateRoomCode());
  const [joinCodeFromUrl, setJoinCodeFromUrl] = useState<string>(urlJoinParam);
  const [showFullRules, setShowFullRules] = useState<boolean>(false);

  useEffect(() => {
    const joinParam = getUrlJoinCode(searchParams.get('join'));
    if (joinParam) {
      setJoinCodeFromUrl(joinParam);
      setView('PLAYER_HUB');
    }
  }, [searchParams]);

  if (view === 'HOST_HUB') {
    return (
      <HostHubView
        key={roomCode}
        roomCode={roomCode}
        onExitRoom={() => setView('MENU')}
      />
    );
  }

  if (view === 'PLAYER_HUB') {
    return (
      <PlayerHubView
        initialRoomCode={joinCodeFromUrl || urlJoinParam}
        onExit={() => {
          setJoinCodeFromUrl('');
          setView('MENU');
        }}
      />
    );
  }

  if (view === 'COUCH') {
    return <CouchMode onBackToMenu={() => setView('MENU')} />;
  }

  if (view === 'HOWTO') {
    return <HowToPlay onBackToMenu={() => setView('MENU')} />;
  }

  // =========================================================================
  // GŁÓWNY EKRAN: INSTRUKCJA NA SAMEJ GÓRZE + WYBÓR TRYBU ROZGRYWKI
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#120A2A] text-white flex flex-col justify-between p-4 md:p-8 relative overflow-x-hidden">
      {/* Tło pop-art */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-10 left-10 text-[18rem] font-black text-party-yellow rotate-[-12deg]">
          P
        </div>
        <div className="absolute bottom-0 right-10 text-[20rem] font-black text-party-green rotate-[14deg]">
          ★
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto w-full my-auto py-2 space-y-6">
        {/* BANER TYTUŁOWY */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs md:text-sm uppercase px-4 py-1.5 rounded-full border-3 border-black shadow-brutal-sm mb-3">
            <Sparkles className="w-4 h-4" /> PartyGames Live • Platforma Gier Towarzyskich
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="bg-party-yellow text-black font-black text-3xl md:text-5xl px-3.5 py-1 rounded-2xl border-4 border-black shadow-brutal rotate-[-4deg]">
              🎮
            </span>
            <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight drop-shadow-[0_6px_0_rgba(0,0,0,1)]">
              PartyGames Live
            </h1>
          </div>

          <p className="text-sm md:text-base text-purple-200 max-w-2xl mx-auto font-semibold">
            Imprezowe gry towarzyskie w stylu <span className="text-party-yellow font-black">Jackbox Games & AirConsole</span>. Telewizor jako ekran główny, a smartfony graczy jako kontrolery!
          </p>
        </motion.div>

        {/* ================================================================= */}
        {/* 1. SEKCJA INSTRUKCJI – PIERWSZA RZECZ NA FRONCIE DLA UŻYTKOWNIKÓW */}
        {/* ================================================================= */}
        <motion.section
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 md:p-6 shadow-brutal relative overflow-hidden"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b-2 border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="bg-party-yellow text-black font-black text-sm px-2.5 py-1 rounded-xl border-2 border-black shadow-brutal-sm">
                📖 INSTRUKCJA
              </span>
              <h2 className="text-xl md:text-2xl font-black uppercase">
                Jak to działa? Na czym polega zabawa
              </h2>
            </div>
            <button
              onClick={() => setShowFullRules(!showFullRules)}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-xs font-black uppercase px-3 py-1.5 rounded-xl border-2 border-black transition"
            >
              {showFullRules ? (
                <>Zwiń szczegóły <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>Pełne zasady gier <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

          {/* 3 KROKI PLATFORMY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5">
            {/* Krok 1 */}
            <div className="bg-black/40 border-3 border-party-green/60 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-party-green text-black font-black text-xs px-2.5 py-0.5 rounded-full border border-black">
                    Krok 1: TV / Laptop
                  </span>
                  <Tv className="w-5 h-5 text-party-green" />
                </div>
                <h3 className="font-black text-base uppercase text-white mb-1">
                  1. Stwórz Pokój
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Podłącz laptopa do TV lub otwórz stronę na wspólnym ekranie. Kliknij zielony przycisk <strong>„Stwórz Pokój”</strong> – wyświetli się 4-literowy kod PIN oraz kod QR.
                </p>
              </div>
            </div>

            {/* Krok 2 */}
            <div className="bg-black/40 border-3 border-party-yellow/60 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-party-yellow text-black font-black text-xs px-2.5 py-0.5 rounded-full border border-black">
                    Krok 2: Smartfony
                  </span>
                  <Smartphone className="w-5 h-5 text-party-yellow" />
                </div>
                <h3 className="font-black text-base uppercase text-white mb-1">
                  2. Dołącz Telefonem
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Każdy z graczy skanuje kod QR aparatem w swoim telefonie (lub wpisuje PIN). <strong>Brak instalacji aplikacji i brak rejestracji</strong> – grasz od razu w przeglądarce!
                </p>
              </div>
            </div>

            {/* Krok 3 */}
            <div className="bg-black/40 border-3 border-party-blue/60 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-party-blue text-black font-black text-xs px-2.5 py-0.5 rounded-full border border-black">
                    Krok 3: Zabawa
                  </span>
                  <Gamepad2 className="w-5 h-5 text-party-blue" />
                </div>
                <h3 className="font-black text-base uppercase text-white mb-1">
                  3. Wybierz Grę i Graj
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Host wybiera grę z menu na TV. Smartfony natychmiast zamieniają się w kontrolery i buzzery! <strong>Trwały pokój</strong> sprawia, że po skończonej grze nikt się nie rozłącza.
                </p>
              </div>
            </div>
          </div>

          {/* SZYBKIE PRZEGLĄDY GIER DOSTĘPNYCH W HUBIE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Gra na P */}
            <div className="bg-black/60 border-2 border-black rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase text-party-yellow flex items-center gap-1.5">
                  <span className="bg-party-yellow text-black text-xs font-black px-1.5 py-0.2 rounded">P</span> Gra 1: „Gra na P”
                </span>
                <span className="text-[11px] text-purple-300 font-bold">1000 haseł</span>
              </div>
              <p className="text-xs text-purple-100 leading-snug">
                Opisujący tłumaczy hasło swojemu zespołowi używając <strong>WYŁĄCZNIE słów na literę „P”</strong>. Przeciwnicy mają w rękach buzzery – gdy powiesz inne słowo, wciskają błąd!
              </p>
            </div>

            {/* Marilyn Monroe */}
            <div className="bg-black/60 border-2 border-black rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase text-party-red flex items-center gap-1.5">
                  <span className="bg-party-red text-white text-xs font-black px-1.5 py-0.2 rounded">💋</span> Gra 2: „Marilyn Monroe”
                </span>
                <span className="text-[11px] text-purple-300 font-bold">Tabu Party</span>
              </div>
              <p className="text-xs text-purple-100 leading-snug">
                Zgadujecie znane postacie (popkultura, film, historia), ale masz <strong>3 ZAKAZANE SŁOWA</strong>! Przeciwnicy polują na Twoje potknięcie wielkim czerwonym buzzerem!
              </p>
            </div>

            {/* Szpieg */}
            <div className="bg-black/60 border-2 border-black rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase text-party-blue flex items-center gap-1.5">
                  <span className="bg-party-blue text-black text-xs font-black px-1.5 py-0.2 rounded">🕵️</span> Gra 3: „Szpieg”
                </span>
                <span className="text-[11px] text-purple-300 font-bold">Zero Presji</span>
              </div>
              <p className="text-xs text-purple-100 leading-snug">
                Agenci znają tajną lokację (np. <em>Plaża nudystów, Sejm, SOR</em>), a 1 ukryty Szpieg nie ma pojęcia gdzie jest! Celowane pytania, radar i dedukcja społeczna.
              </p>
            </div>
          </div>

          {/* ROZWIJANA PEŁNA INSTRUKCJA */}
          <AnimatePresence>
            {showFullRules && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4 pt-4 border-t-2 border-white/10 text-xs md:text-sm text-purple-200 space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 border border-white/10 rounded-xl p-3 space-y-1.5">
                    <h4 className="font-black text-white uppercase text-xs text-party-green">
                      💡 Dodatkowe zasady „Gry na P”:
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-purple-200">
                      <li>Zakazane są wszelkie spójniki i przyimki nienależące do litery P (np. „i”, „w”, „z”, „na”).</li>
                      <li>Drużyna zgaduje na głos bez ograniczeń litery.</li>
                      <li>Gdy drużyna zgadnie hasło, Opisujący klika zielone <strong>[ZGADNIĘTE! (+1)]</strong>.</li>
                    </ul>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-xl p-3 space-y-1.5">
                    <h4 className="font-black text-white uppercase text-xs text-party-red">
                      💡 Dodatkowe zasady „Marilyn Monroe”:
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-purple-200">
                      <li>Zakazane słowa obejmują także ich bezpośrednie odmiany gramatyczne.</li>
                      <li>Opisujący ma prawo do 2 pasów w ciągu rundy.</li>
                      <li>Złamanie tabu (czerwony buzzer przeciwnika) to strata 1 punktu i natychmiastowe odrzucenie karty.</li>
                    </ul>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-xl p-3 space-y-1.5 md:col-span-2">
                    <h4 className="font-black text-white uppercase text-xs text-party-blue">
                      💡 Dodatkowe zasady „Szpieg”:
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-purple-200">
                      <li>Gracze na głos odpowiadają na losowane pytania dotyczące lokacji (np. o zapach, ubiór, dźwięki).</li>
                      <li>Szpieg nie zna lokacji – musi sprytnie wymyślać odpowiedzi i analizować słowa innych agentów.</li>
                      <li>W dowolnym momencie Szpieg może zaryzykować i wytypować lokację z listy 16 kafelków (trafienie = wygrana Szpiega!).</li>
                      <li>Gdy agenci zwołają głosowanie i wskażą Szpiega, ten ma ostatnią szansę na strzał ratunkowy.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-purple-300 bg-party-purple/20 p-2.5 rounded-xl border border-party-purple/40">
                  <Sparkles className="w-4 h-4 text-party-yellow shrink-0" />
                  <span>
                    <strong>Wskazówka:</strong> Podłącz laptopa do głośników lub telewizora – dynamiczne efekty dźwiękowe tykającego zegara i przesterowanego buzzera wprowadzają prawdziwą teleturniejową atmosferę!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ================================================================= */}
        {/* 2. SEKCJA ROZPOCZĘCIA ROZGRYWKI (DUŻE PRZYCISKI AKCJI) */}
        {/* ================================================================= */}
        <div>
          <div className="text-center mb-3">
            <h2 className="text-lg md:text-xl font-black uppercase text-white inline-flex items-center gap-2">
              <Play className="w-5 h-5 text-party-green fill-party-green" /> Gotowi do gry? Wybierz tryb:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. STWÓRZ POKÓJ (EKRAN HOSTA / TV) */}
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const code = generateRoomCode();
                setRoomCode(code);
                setView('HOST_HUB');
              }}
              className="text-left bg-party-green text-black border-4 border-black rounded-3xl p-5 shadow-brutal flex flex-col justify-between group transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-black text-party-green font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
                    Ekran Główny
                  </span>
                  <Tv className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase leading-tight">
                  Stwórz Pokój (Host / TV)
                </h3>
                <p className="text-xs font-bold text-black/80 mt-1.5">
                  Wyświetl lobby na telewizorze lub laptopie. Gracze dołączą smartfonami przez kod QR!
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-black text-white font-black text-xs uppercase px-3.5 py-2 rounded-xl self-start group-hover:bg-party-purple transition">
                Uruchom na TV →
              </div>
            </motion.button>

            {/* 2. DOŁĄCZ TELEFONEM (KONTROLER GRACZA) */}
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setJoinCodeFromUrl('');
                setView('PLAYER_HUB');
              }}
              className="text-left bg-party-yellow text-black border-4 border-black rounded-3xl p-5 shadow-brutal flex flex-col justify-between group transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-black text-party-yellow font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
                    Kontroler
                  </span>
                  <Smartphone className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase leading-tight">
                  Dołącz Smartfonem
                </h3>
                <p className="text-xs font-bold text-black/80 mt-1.5">
                  Wpisz 4-literowy kod PIN z telewizora, wybierz nick i używaj telefonu jako kontrolera i buzzera.
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-black text-white font-black text-xs uppercase px-3.5 py-2 rounded-xl self-start group-hover:bg-party-purple transition">
                Wpisz PIN z TV →
              </div>
            </motion.button>

            {/* 3. TRYB KANAPOWY (PASS & PLAY) */}
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('COUCH')}
              className="text-left bg-party-orange text-black border-4 border-black rounded-3xl p-5 shadow-brutal flex flex-col justify-between group transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-black text-party-orange font-black text-xs uppercase px-2.5 py-0.5 rounded-full">
                    Offline • 1 Telefon
                  </span>
                  <Sofa className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase leading-tight">
                  Tryb Kanapowy
                </h3>
                <p className="text-xs font-bold text-black/80 mt-1.5">
                  Brak telewizora? Podawaj jeden smartfon z rąk do rąk między drużynami dla obu gier!
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-black text-white font-black text-xs uppercase px-3.5 py-2 rounded-xl self-start group-hover:bg-party-purple transition">
                Graj na 1 Telefonie →
              </div>
            </motion.button>
          </div>
        </div>

        {/* STOPKA INFORMACYJNA */}
        <div className="bg-[#1E1242] border-4 border-black rounded-2xl p-4 shadow-brutal flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-purple-200">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-party-yellow shrink-0" />
            <span>Gry w bibliotece: <strong>🅿️ Gra na P</strong>, <strong>💋 Marilyn Monroe</strong> oraz <strong>🕵️ Szpieg</strong></span>
          </div>
          <button
            onClick={() => setView('HOWTO')}
            className="text-party-yellow hover:underline flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" /> Otwórz osobną stronę instrukcji →
          </button>
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#120A2A] text-white flex items-center justify-center font-black text-2xl">
          Ładowanie PartyGames Live...
        </div>
      }
    >
      <MainAppContent />
    </Suspense>
  );
}
