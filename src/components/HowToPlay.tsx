'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Tv,
  Smartphone,
  AlertOctagon,
  Check,
  SkipForward,
  Clock,
  ArrowLeft,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

interface HowToPlayProps {
  onBackToMenu: () => void;
}

function Section({
  number,
  title,
  color,
  children,
}: {
  number: number;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 md:p-6 shadow-brutal"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="w-10 h-10 shrink-0 rounded-xl border-3 border-black flex items-center justify-center font-black text-xl text-black"
          style={{ backgroundColor: color }}
        >
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-black uppercase leading-tight">
          {title}
        </h2>
      </div>
      <div className="text-sm md:text-base text-purple-100 space-y-2">
        {children}
      </div>
    </motion.section>
  );
}

export default function HowToPlay({ onBackToMenu }: HowToPlayProps) {
  return (
    <div className="min-h-screen bg-[#120A2A] text-white p-4 md:p-8 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-10 right-10 text-[18rem] font-black text-party-yellow rotate-[10deg]">
          ★
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-5">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-black transition"
        >
          <ArrowLeft className="w-4 h-4" /> Wróć do menu
        </button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase drop-shadow-[0_5px_0_rgba(0,0,0,1)]">
            Instrukcja PartyGames Hub
          </h1>
          <p className="text-purple-200 font-semibold mt-2">
            Jak działa platforma i zasady gier
          </p>
        </div>

        {/* 1. ARCHITEKTURA POKOJU */}
        <Section number={1} title="Jak działa platforma (Jackbox Style)" color="#FFD600">
          <p>
            <strong>PartyGames Hub</strong> to platforma z trwałym pokojem:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Ekran Hosta (TV / Laptop):</strong> tworzy pokój z 4-literowym kodem PIN i kodem QR.
            </li>
            <li>
              <strong>Kontrolery graczy (Smartfony):</strong> skanujesz kod QR raz i dołączasz do pokoju bez logowania ani instalacji aplikacji.
            </li>
            <li>
              <strong className="text-party-yellow">Trwały pokój:</strong> Host może w dowolnym momencie zmienić grę (przycisk <em>„Zmień grę / Menu Hosta”</em>). Wszyscy gracze przełączają się automatycznie na swoich telefonach – <strong>nikt nie musi ponownie wpisywać kodu!</strong>
            </li>
          </ul>
        </Section>

        {/* 2. GRA NA P */}
        <Section number={2} title="Gra 1: „Gra na P”" color="#00F59B">
          <p>
            Hit inspirowany formatem programu <em>„Zero Presji”</em>:
          </p>
          <div className="bg-black/50 border-3 border-party-yellow rounded-2xl p-3 text-center font-black text-base">
            P-Mówca opisuje hasło używając <span className="bg-party-yellow text-black px-2 rounded">WYŁĄCZNIE</span> słów na literę „P”!
          </div>
          <p>
            Np. hasło <em>„Batman”</em> → <em>„Potężny pan pilnuje porządku, przywdziewa pelerynę...”</em>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong className="text-party-red">🚨 Buzzer przeciwników:</strong> jeśli powiesz spójnik („i”, „w”, „z”) lub słowo na inną literę, przeciwnicy klikają <strong>„BŁĄD! TO NIE NA P!”</strong> na swoich telefonach (−10 s i −1 pkt!).
            </li>
            <li>
              <strong>✅ Zgadnięte:</strong> drużyna zgaduje na głos, P-Mówca klika przycisk (+1 pkt).
            </li>
            <li>
              <strong>Baza:</strong> 1000 jednowyrazowych polskich haseł w 5 kategoriach.
            </li>
          </ul>
        </Section>

        {/* 3. MARILYN MONROE (TABU) */}
        <Section number={3} title="Gra 2: „Marilyn Monroe” (Mechanika Tabu)" color="#FF2A54">
          <p>
            Dynamiczna imprezowa gra w zgadywanie postaci z zakazem 3 słów kluczowych:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              🎭 <strong>Opisujący:</strong> widzi na telefonie postać oraz <strong className="text-party-red">3 zakazane słowa</strong> (np. <em>Donald Trump</em> ➔ zakazane: <em>Prezydent, USA, Włosy</em>; <em>Marilyn Monroe</em> ➔ zakazane: <em>Blondynka, Sukienka, Kennedy</em>).
            </li>
            <li>
              👥 <strong>Zgadujący (Drużyna opisującego):</strong> patrzą na telewizor (widzą tylko kategorię, np. Polityka, Kino) i zgadują na głos. Gdy trafią, Opisujący klika <strong>[ZGADNIĘTE! (+1)]</strong>.
            </li>
            <li>
              🚨 <strong>Cenzorzy / Strażnicy Tabu (Przeciwnicy):</strong> widzą na swoich smartfonach postać i te same 3 zakazane słowa. Gdy Opisujący wypowie którekolwiek – wciskają wielki czerwony przycisk <strong>[ZŁAMAŁ TABU!]</strong> (−10 sekund i −1 punkt!).
            </li>
            <li>
              ⏭️ <strong>Pasy:</strong> Opisujący ma do dyspozycji maksymalnie 2 pasy na rundę.
            </li>
          </ul>
        </Section>

        {/* 4. WSKAZÓWKI */}
        <Section number={4} title="Wskazówki dla udanej imprezy" color="#00D2FF">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Tv className="w-5 h-5 text-party-green shrink-0 mt-0.5" />
              <span>
                Podłącz laptopa do telewizora i włącz głośniki – dźwięki buzzera błędu, tykania zegara i fanfar tworzą niesamowity klimat teleturnieju!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Smartphone className="w-5 h-5 text-party-blue shrink-0 mt-0.5" />
              <span>
                Smartfony łączą się przez WebRTC/PeerJS bez względu na to, czy są w domowym Wi-Fi, czy na danych komórkowych LTE/5G.
              </span>
            </li>
          </ul>
        </Section>

        <button
          onClick={onBackToMenu}
          className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase"
        >
          Wszystko jasne – Wracam do Menu!
        </button>
      </div>
    </div>
  );
}
