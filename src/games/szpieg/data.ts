import type { LocationData } from './types';

export const LOCATIONS: LocationData[] = [
  {
    id: 'loc_01',
    name: 'Plaża Nudystów',
    category: 'Wakacje / Relaks',
    hints: ['Piasek', 'Brak ubrań', 'Krem z filtrem', 'Parawany'],
    questions: [
      'W co jesteś w tej chwili ubrany?',
      'Czego najbardziej wstydziłbyś się tutaj upuścić?',
      'Jaki przedmiot trzymasz w dłoni?',
      'Jaka temperatura tu panuje?'
    ]
  },
  {
    id: 'loc_02',
    name: 'Sejm / Sala Plenarna',
    category: 'Instytucje',
    hints: ['Garnitury', 'Krzyki', 'Mikrofony', 'Głosowanie'],
    questions: [
      'Kto ma tutaj największą władzę?',
      'Co robisz, gdy zaczynasz się nudzić?',
      'Ile zarabiają ludzie pracujący w tym miejscu?',
      'Jaki dźwięk słychać tu najczęściej?'
    ]
  },
  {
    id: 'loc_03',
    name: 'Szpitalny Oddział Ratunkowy (SOR)',
    category: 'Medycyna',
    hints: ['Kolejki', 'Bandaże', 'Lekarze', 'Zapach środków czystości'],
    questions: [
      'Jak długo już tutaj czekasz?',
      'Czym najbardziej pachnie to pomieszczenie?',
      'Czy chciałbyś tu spędzić dzisiejszą noc?',
      'Kto w tym miejscu wzbudza największy strach?'
    ]
  },
  {
    id: 'loc_04',
    name: 'Okręt Podwodny',
    category: 'Pojazdy / Wojsko',
    hints: ['Ciasnota', 'Peryskop', 'Woda', 'Brak okien'],
    questions: [
      'Co widzisz, gdy wyjrzysz przez najbliższe okno?',
      'Czy masz stąd łatwą drogę ucieczki na świeże powietrze?',
      'Co jest największym zagrożeniem w tym miejscu?',
      'Jak oceniasz ilość wolnej przestrzeni wokół siebie?'
    ]
  },
  {
    id: 'loc_05',
    name: 'Wesele na Podlasiu',
    category: 'Imprezy',
    hints: ['Disco polo', 'Wódka', 'Rosół', 'Oczepiny'],
    questions: [
      'Jaka muzyka gra w tle?',
      'Co masz w szklance lub kieliszku?',
      'O której godzinie planujesz stąd wyjść?',
      'Z kim przed chwilą rozmawiałeś?'
    ]
  },
  {
    id: 'loc_06',
    name: 'Stacja Kosmiczna ISS',
    category: 'Kosmos / Technologia',
    hints: ['Nieważkość', 'Kombinezony', 'Ziemia za oknem', 'Tubki z jedzeniem'],
    questions: [
      'Co się stanie, jeśli upuścisz kanapkę?',
      'Co widzisz za największym oknem?',
      'Ile kosztowało cię dotarcie w to miejsce?',
      'Jak radzisz sobie z korzystaniem z toalety?'
    ]
  },
  {
    id: 'loc_07',
    name: 'Klub Nocny / Dyskoteka',
    category: 'Rozrywka',
    hints: ['Stroboskopy', 'Bas', 'Kolejka do baru', 'Ochroniarze'],
    questions: [
      'Czy da się tu swobodnie porozmawiać bez krzyczenia?',
      'Ile wydałeś już na barze?',
      'Kogo minąłeś przy wejściu do tego miejsca?',
      'Czym pachnie powietrze na sali?'
    ]
  },
  {
    id: 'loc_08',
    name: 'Dyskont Biedronka w Sobotę',
    category: 'Zakupy / Życie codzienne',
    hints: ['Palety w alejkach', 'Świeżaki', 'Kasa samoobsługowa', 'Tłum'],
    questions: [
      'O co przed chwilą pokłóciły się dwie osoby obok ciebie?',
      'Jaki komunikat powtarza głos z głośników?',
      'Co blokuje ci przejście do kolejnego działu?',
      'Ile żółtych etykiet z promocją widzisz wokół?'
    ]
  },
  {
    id: 'loc_09',
    name: 'Kasyno w Las Vegas',
    category: 'Gry / Hazard',
    hints: ['Ruletka', 'Brak zegarów', 'Żetony', 'Karty'],
    questions: [
      'Czy wiesz, która jest teraz godzina na zewnątrz?',
      'Co trzymasz w kieszeni lub na stole?',
      'Jaka jest dominująca emocja ludzi przy sąsiednim stole?',
      'Czy wolno ci tu robić zdjęcia?'
    ]
  },
  {
    id: 'loc_10',
    name: 'Pociąg PKP Intercity (Opóźniony)',
    category: 'Podróże',
    hints: ['Korytarz', 'Wars', 'Konduktor', 'Brak miejsc siedzących'],
    questions: [
      'Gdzie teraz siedzisz lub stoisz?',
      'O ile minut spóźnia się twój plan?',
      'Czym pachnie przedział lub korytarz?',
      'Co kupiłeś z wózka gastronomicznego?'
    ]
  },
  {
    id: 'loc_11',
    name: 'Sauna Koedukacyjna',
    category: 'Relaks / Wellness',
    hints: ['Ręcznik', 'Ciepło', 'Para wodna', 'Olejki'],
    questions: [
      'Ile minut jesteś w stanie tu wytrzymać?',
      'W czym tu siedzisz?',
      'Czym pachnie to drewniane pomieszczenie?',
      'Jak reagujesz na widok nowego gościa wchodzącego do środka?'
    ]
  },
  {
    id: 'loc_12',
    name: 'Szkoła Podstawowa / Wywiadówka',
    category: 'Edukacja',
    hints: ['Kreda', 'Niskie ławki', 'Dziennik', 'Nauczyciel'],
    questions: [
      'Za co najbardziej boisz się oberwać?',
      'Na czym w tej chwili siedzisz?',
      'Kto mówi do wszystkich z podniesionym głosem?',
      'Jaki zapach unosi się na korytarzu?'
    ]
  },
  {
    id: 'loc_13',
    name: 'Statek Piracki na Karaibach',
    category: 'Historia / Przygoda',
    hints: ['Maszty', 'Armaty', 'Rum', 'Papugi'],
    questions: [
      'Jaka flaga powiewa nad twoją głową?',
      'Co grozi ci za sprzeciwienie się kapitanowi?',
      'Czym pachnie pokład po burzy?',
      'Jaka broń wisi u twojego pasa?'
    ]
  },
  {
    id: 'loc_14',
    name: 'Więzienie o Zaostrzonym Rygorze',
    category: 'Instytucje',
    hints: ['Kraty', 'Pasiaki', 'Strażnicy', 'Spacerniak'],
    questions: [
      'O której gasną tu wszystkie światła?',
      'Za co mógłbyś tu trafić?',
      'Co jest najcenniejszą walutą w tym budynku?',
      'Kto pilnuje twojego każdego kroku?'
    ]
  },
  {
    id: 'loc_15',
    name: 'Pogrzeb Bogatego Wujka',
    category: 'Uroczystości',
    hints: ['Czerń', 'Wieńce', 'Testament', 'Płacz'],
    questions: [
      'O czym po cichu rozmawiają ludzie w trzecim rzędzie?',
      'W co dokładnie jesteś dzisiaj ubrany?',
      'Czego pod żadnym pozorem nie wypada tu teraz zrobić?',
      'Czy masz nadzieję na zysk po tym spotkaniu?'
    ]
  },
  {
    id: 'loc_16',
    name: 'Studio Dzień Dobry TVN',
    category: 'Media / Telewizja',
    hints: ['Kanapy', 'Kamery', 'Kuchnia na żywo', 'Prompter'],
    questions: [
      'Kto właśnie mówi do kamery z wielkim uśmiechem?',
      'Co pachnie z aneksu kuchennego?',
      'Co musisz zrobić na znak reżysera za kulisami?',
      'Czy makijaż który masz na twarzy jest naturalny?'
    ]
  },
  {
    id: 'loc_17',
    name: 'Salon Tatuażu',
    category: 'Sztuka / Styl życia',
    hints: ['Bzyczenie igły', 'Tusz', 'Wzory na ścianach', 'Folia'],
    questions: [
      'Jaki dźwięk wwierca ci się w głowę?',
      'Czym zdezynfekowano skórę przed chwilą?',
      'Czy to co robisz teraz będzie z tobą do końca życia?',
      'Jak bardzo boli to co się tu dzieje?'
    ]
  },
  {
    id: 'loc_18',
    name: 'Kwatera Główna NATO / Bunkier',
    category: 'Wojsko / Tajemnice',
    hints: ['Ekrany radarów', 'Generałowie', 'Czerwony telefon', 'Karty magnetyczne'],
    questions: [
      'Jaki poziom dostępu posiada twoja przepustka?',
      'Przed czym chronią te 3-metrowe ściany ze zbrojonego betonu?',
      'Co oznacza czerwona lampka migająca nad drzwiami?',
      'Kto ma prawo wcisnąć ten wielki guzik?'
    ]
  },
  {
    id: 'loc_19',
    name: 'Festiwal Pol’and’Rock (Błoto i Namioty)',
    category: 'Festiwale',
    hints: ['Glany', 'Błoto', 'Gitary', 'Zimne piwo'],
    questions: [
      'W jakim stanie są twoje buty?',
      'Skąd dochodzi ten potężny hałas?',
      'Kiedy ostatni raz brałeś prysznic?',
      'Co krzyczą ludzie witając się na ścieżce?'
    ]
  },
  {
    id: 'loc_20',
    name: 'Salka Egzaminacyjna na Prawo Jazdy (WORD)',
    category: 'Życiowe dramaty',
    hints: ['Stres', 'Komputery', 'Egzaminator', 'Plac manewrowy'],
    questions: [
      'Po co tak naprawdę tutaj przyszedłeś?',
      'Co się stanie, jeśli popełnisz dwa drobne błędy?',
      'Jak wygląda człowiek oceniający twoje zachowanie?',
      'Jak mocno drżą ci dłonie?'
    ]
  },
  {
    id: 'loc_21',
    name: 'Świątynia Mnichów Shaolin',
    category: 'Egzotyka / Religia',
    hints: ['Kadzidła', 'Gongi', 'Trening kung-fu', 'Cisza'],
    questions: [
      'Jaka zasada obowiązuje tu przez większość dnia?',
      'Czym pachnie powietrze wokół posągów?',
      'Co jesz na śniadanie i obiad?',
      'W jakiej pozycji spędzasz najwięcej czasu?'
    ]
  },
  {
    id: 'loc_22',
    name: 'Kolejka do Toalety na Festiwalu (Toi-Toi)',
    category: 'Życiowe dramaty',
    hints: ['Plastikowa kabina', 'Niecierpliwość', 'Muzyka w dali', 'Papier'],
    questions: [
      'Jak długo jeszcze jesteś w stanie wytrzymać?',
      'Czym pachnie to otoczenie?',
      'O co pytasz osobę wychodzącą ze środka?',
      'Czy odważysz się dotknąć klamki gołą dłonią?'
    ]
  }
];

export const GENERAL_SPY_QUESTIONS = [
  'W co jesteś w tej chwili ubrany?',
  'Jaki dźwięk słyszysz tu najczęściej?',
  'Po co tak naprawdę tutaj przyszedłeś?',
  'Czym najbardziej pachnie to miejsce?',
  'Kto ma tutaj największą władzę?',
  'Czy czujesz się w tym miejscu bezpiecznie?',
  'Czego najbardziej wstydziłbyś się tutaj upuścić?',
  'Ile pieniędzy wydałeś, żeby się tu znaleźć?',
  'Co widzisz, gdy rozejrzysz się dookoła?',
  'O której godzinie zazwyczaj się stąd wychodzi?'
];
