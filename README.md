# PartyGames Live 🎮

> Imprezowy hub gier towarzyskich w stylu **Jackbox Games** i **AirConsole**.  
> Telewizor lub komputer pełni rolę wspólnego ekranu (Host / TV), a smartfony graczy zamieniają się w bezprzewodowe kontrolery, buzzery i tajne ekrany ról.

Gra działa na żywo pod adresem: **[partygameslive.web.app](https://partygameslive.web.app)**

---

## 🕹️ Dostępne gry w Hubie

1. **Gra na P** 🅿️
   - Opisujący musi naprowadzić drużynę na hasło, używając **wyłącznie słów rozpoczynających się na literę „P”**.
   - Przeciwnicy trzymają w dłoniach buzzery – każde słowo na inną literę to kara czasowa i punktowa!
   - Baza ponad 1000 haseł w języku polskim.

2. **Marilyn Monroe** 💋
   - Towarzyska gra w odgadywanie znanych postaci (popkultura, film, sport, polityka) z bezwzględnym zakazem używania **3 słów kluczowych** (mechanika Tabu).
   - Przeciwnicy widzą zakazane słowa na swoich telefonach i polują na potknięcie opisującego.

3. **Szpieg** 🕵️‍♂️
   - Gra dedukcji społecznej i blefu (format znany z gier *Spyfall* / programu *Zero Presji*).
   - Wszyscy Agenci otrzymują tę samą tajną lokację (np. *Plaża Nudystów*, *Sejm*, *Szpitalny Oddział Ratunkowy*, *Okręt Podwodny*).
   - Dokładnie 1 gracz jest **Szpiegiem** i nie zna lokacji – musi przetrwać pytania na żywo, blefować i wydedukować, gdzie się znajduje.

---

## 🚀 Architektura i Technologie

- **Frontend:** Next.js 15 (React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion)
- **Komunikacja Real-Time:** 
  - Oficjalna chmura **Firebase Realtime Database** (port HTTPS 443 – SSE `EventSource` + szybki REST polling), działająca niezawodnie na każdej sieci LTE/5G i Wi-Fi bez blokad portów i problemów z NAT/CGNAT.
  - Lokalny `BroadcastChannel` do instant testów w obrębie jednej przeglądarki.
- **Dźwięk:** Web Audio API (dzwonki sukcesu, przesterowane buzzery, tykanie zegara).
- **Hosting:** Firebase Hosting.

---

## 🛠️ Uruchomienie lokalne

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev
```

Aplikacja otworzy się pod adresem `http://localhost:3000`.

### Budowanie wersji produkcyjnej

```bash
npm run build
```
Statyczny eksport trafi do katalogu `out/`.
