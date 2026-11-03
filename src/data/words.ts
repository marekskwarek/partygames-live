import { WordCategory, WordItem } from '@/types/game';

export const ALL_CATEGORIES: WordCategory[] = [
  'Filmy i Seriale',
  'Postacie i Celebryci',
  'Czynności i Zawody',
  'Przedmioty i Rzeczy',
  'Abstrakcje i Trudne',
];

export const AVATARS = [
  { id: 'sausage', emoji: '🌭', label: 'Parówa' },
  { id: 'panda', emoji: '🐼', label: 'Panda' },
  { id: 'dumpling', emoji: '🥟', label: 'Pieróg' },
  { id: 'penguin', emoji: '🐧', label: 'Pingwin' },
  { id: 'pizza', emoji: '🍕', label: 'Pizza' },
  { id: 'pirate', emoji: '🏴‍☠️', label: 'Pirat' },
  { id: 'parrot', emoji: '🦜', label: 'Papuga' },
  { id: 'ghost', emoji: '👻', label: 'Postrach' },
  { id: 'clown', emoji: '🤡', label: 'Pajac' },
  { id: 'alien', emoji: '👽', label: 'Przybysz' },
  { id: 'monkey', emoji: '🐒', label: 'Pawian' },
  { id: 'frog', emoji: '🐸', label: 'Płaz' },
  { id: 'bee', emoji: '🐝', label: 'Pszczoła' },
  { id: 'spider', emoji: '🕷️', label: 'Pająk' },
  { id: 'tomato', emoji: '🍅', label: 'Pomidor' },
  { id: 'donut', emoji: '🍩', label: 'Pączek' },
];

export const DEFAULT_TEAMS = [
  {
    id: 'team-1',
    name: 'Drużyna Parówek',
    icon: '🌭',
    color: '#FF7B00',
    score: 0,
  },
  {
    id: 'team-2',
    name: 'Drużyna Pandy',
    icon: '🐼',
    color: '#00D2FF',
    score: 0,
  },
  {
    id: 'team-3',
    name: 'Drużyna Pierogów',
    icon: '🥟',
    color: '#9D4EDD',
    score: 0,
  },
];

// Baza 1000 unikalnych, jednowyrazowych polskich haseł (po 200 w każdej z 5 kategorii)
export const INITIAL_WORDS: WordItem[] = [
  {
    "id": "w-1",
    "word": "Shrek",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Shrek”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-2",
    "word": "Titanic",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Titanic”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-3",
    "word": "Matrix",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Matrix”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-4",
    "word": "Wiedźmin",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Wiedźmin”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-5",
    "word": "Ranczo",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Ranczo”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-6",
    "word": "Kiler",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Kiler”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-7",
    "word": "Seksmisja",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Seksmisja”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-8",
    "word": "Klan",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Klan”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-9",
    "word": "Zmierzch",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Zmierzch”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-10",
    "word": "Madagaskar",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Madagaskar”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-11",
    "word": "Gladiator",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Gladiator”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-12",
    "word": "Avatar",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Avatar”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-13",
    "word": "Incepcja",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Incepcja”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-14",
    "word": "Interstellar",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Interstellar”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-15",
    "word": "Joker",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Joker”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-16",
    "word": "Diuna",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Diuna”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-17",
    "word": "Hobbit",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Hobbit”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-18",
    "word": "Obcy",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Obcy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-19",
    "word": "Predator",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Predator”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-20",
    "word": "Terminator",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Terminator”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-21",
    "word": "Rocky",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Rocky”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-22",
    "word": "Rambo",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Rambo”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-23",
    "word": "Pitbull",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Pitbull”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-24",
    "word": "Belfer",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Belfer”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-25",
    "word": "Wataha",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Wataha”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-26",
    "word": "Kruk",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Kruk”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-27",
    "word": "Rojst",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Rojst”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-28",
    "word": "Znachor",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Znachor”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-29",
    "word": "Potop",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Potop”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-30",
    "word": "Krzyżacy",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Krzyżacy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-31",
    "word": "Faraon",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Faraon”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-32",
    "word": "Lalka",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Lalka”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-33",
    "word": "Rejs",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Rejs”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-34",
    "word": "Miś",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Miś”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-35",
    "word": "Alternatywy",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Alternatywy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-36",
    "word": "Czterdziestolatek",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Czterdziestolatek”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-37",
    "word": "Janosik",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Janosik”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-38",
    "word": "Stawka",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Stawka”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-39",
    "word": "Vabank",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Vabank”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-40",
    "word": "Wesele",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Wesele”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-41",
    "word": "Kler",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Kler”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-42",
    "word": "Wołyń",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Wołyń”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-43",
    "word": "Ida",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Ida”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-44",
    "word": "Pianista",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Pianista”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-45",
    "word": "Katyń",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Katyń”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-46",
    "word": "Bogowie",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Bogowie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-47",
    "word": "Najlepszy",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Najlepszy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-48",
    "word": "Proceder",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Proceder”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-49",
    "word": "Furioza",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Furioza”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-50",
    "word": "Testosteron",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Testosteron”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-51",
    "word": "Lejdis",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Lejdis”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-52",
    "word": "Teściowie",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Teściowie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-53",
    "word": "Chłopi",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Chłopi”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-54",
    "word": "Kanał",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Kanał”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-55",
    "word": "Kingsajz",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Kingsajz”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-56",
    "word": "Vinci",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Vinci”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-57",
    "word": "Kroll",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Kroll”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-58",
    "word": "Sara",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Sara”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-59",
    "word": "Tato",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Tato”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-60",
    "word": "Dług",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Dług”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-61",
    "word": "Symetria",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Symetria”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-62",
    "word": "Egzorcysta",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Egzorcysta”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-63",
    "word": "Plebania",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Plebania”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-64",
    "word": "Złotopolscy",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Złotopolscy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-65",
    "word": "Wspólna",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Wspólna”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-66",
    "word": "Milionerzy",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Milionerzy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-67",
    "word": "Familiada",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Familiada”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-68",
    "word": "Awantura",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Awantura”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-69",
    "word": "Idol",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Idol”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-70",
    "word": "Rolnik",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Rolnik”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-71",
    "word": "Sanatorium",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Sanatorium”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-72",
    "word": "BigBrother",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („BigBrother”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-73",
    "word": "Agent",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Agent”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-74",
    "word": "MasterChef",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („MasterChef”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-75",
    "word": "TopModel",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („TopModel”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-76",
    "word": "MamTalent",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („MamTalent”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-77",
    "word": "Kabaret",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Kabaret”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-78",
    "word": "Smerfy",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Smerfy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-79",
    "word": "Gumisie",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Gumisie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-80",
    "word": "Muminki",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Muminki”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-81",
    "word": "Reksio",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Reksio”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-82",
    "word": "Koziołek",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Koziołek”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-83",
    "word": "Pokemon",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Pokemon”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-84",
    "word": "Naruto",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Naruto”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-85",
    "word": "Akira",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Akira”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-86",
    "word": "Totoro",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Totoro”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-87",
    "word": "Zaplątani",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Zaplątani”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-88",
    "word": "Vaiana",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Vaiana”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-89",
    "word": "Coco",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Coco”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-90",
    "word": "Ratatuj",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Ratatuj”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-91",
    "word": "Auta",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Auta”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-92",
    "word": "Samoloty",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Samoloty”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-93",
    "word": "Iniemamocni",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Iniemamocni”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-94",
    "word": "Odlot",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Odlot”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-95",
    "word": "Potwory",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Potwory”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-96",
    "word": "Merida",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Merida”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-97",
    "word": "Zwierzogród",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Zwierzogród”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-98",
    "word": "Encanto",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Encanto”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-99",
    "word": "Luca",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Luca”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-100",
    "word": "Bambi",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Bambi”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-101",
    "word": "Dumbo",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Dumbo”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-102",
    "word": "Mulan",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Mulan”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-103",
    "word": "Pocahontas",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Pocahontas”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-104",
    "word": "Herkules",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Herkules”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-105",
    "word": "Aladyn",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Aladyn”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-106",
    "word": "Dzwonnik",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Dzwonnik”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-107",
    "word": "Anastazja",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Anastazja”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-108",
    "word": "Balto",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Balto”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-109",
    "word": "Flinstonowie",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Flinstonowie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-110",
    "word": "Jetsonowie",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Jetsonowie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-111",
    "word": "Simpsonowie",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Simpsonowie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-112",
    "word": "Futurama",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Futurama”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-113",
    "word": "Arcane",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Arcane”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-114",
    "word": "Cyberpunk",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Cyberpunk”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-115",
    "word": "Castlevania",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Castlevania”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-116",
    "word": "Wednesday",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Wednesday”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-117",
    "word": "Narcos",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Narcos”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-118",
    "word": "Czarnobyl",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Czarnobyl”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-119",
    "word": "Gambit",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Gambit”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-120",
    "word": "Sukcesja",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Sukcesja”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-121",
    "word": "Euforia",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Euforia”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-122",
    "word": "Wikingowie",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Wikingowie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-123",
    "word": "Rzym",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Rzym”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-124",
    "word": "Spartakus",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Spartakus”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-125",
    "word": "Pacyfik",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Pacyfik”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-126",
    "word": "Zagubieni",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Zagubieni”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-127",
    "word": "Skazany",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Skazany”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-128",
    "word": "Sopranos",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Sopranos”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-129",
    "word": "Dexter",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Dexter”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-130",
    "word": "Chirurdzy",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Chirurdzy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-131",
    "word": "Przyjaciele",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Przyjaciele”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-132",
    "word": "Biuro",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Biuro”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-133",
    "word": "Sherlock",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Sherlock”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-134",
    "word": "Luther",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Luther”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-135",
    "word": "Dark",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Dark”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-136",
    "word": "Lupin",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Lupin”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-137",
    "word": "Parasite",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Parasite”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-138",
    "word": "Oldboy",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Oldboy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-139",
    "word": "Siedem",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Siedem”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-140",
    "word": "Skazani",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Skazani”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-141",
    "word": "Pulp",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Pulp”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-142",
    "word": "Bękarty",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Bękarty”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-143",
    "word": "Django",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Django”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-144",
    "word": "Lśnienie",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Lśnienie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-145",
    "word": "Odyseja",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Odyseja”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-146",
    "word": "Coś",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Coś”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-147",
    "word": "Halloween",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Halloween”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-148",
    "word": "Krzyk",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Krzyk”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-149",
    "word": "Koszmar",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Koszmar”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-150",
    "word": "Piła",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Piła”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-151",
    "word": "Obecność",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Obecność”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-152",
    "word": "Naznaczony",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Naznaczony”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-153",
    "word": "Sinister",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Sinister”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-154",
    "word": "Midsommar",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Midsommar”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-155",
    "word": "Carrie",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Carrie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-156",
    "word": "Misery",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Misery”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-157",
    "word": "Mgła",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Mgła”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-158",
    "word": "Sicario",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Sicario”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-159",
    "word": "Whiplash",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Whiplash”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-160",
    "word": "Birdman",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Birdman”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-161",
    "word": "Zjawa",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Zjawa”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-162",
    "word": "Infiltracja",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Infiltracja”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-163",
    "word": "Aviator",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Aviator”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-164",
    "word": "Taksówkarz",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Taksówkarz”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-165",
    "word": "Kasyno",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Kasyno”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-166",
    "word": "Irlandczyk",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Irlandczyk”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-167",
    "word": "Milczenie",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Milczenie”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-168",
    "word": "Przylądek",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Przylądek”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-169",
    "word": "Nietykalni",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Nietykalni”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-170",
    "word": "Amelia",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Amelia”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-171",
    "word": "Leon",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Leon”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-172",
    "word": "Lucy",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Lucy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-173",
    "word": "Uprowadzona",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Uprowadzona”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-174",
    "word": "Transporter",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Transporter”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-175",
    "word": "Taxi",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Taxi”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-176",
    "word": "Nienawistna",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Nienawistna”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-177",
    "word": "Niania",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Niania”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-178",
    "word": "Kryminalni",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Kryminalni”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-179",
    "word": "Komisarz",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Komisarz”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-180",
    "word": "Barwy",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Barwy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-181",
    "word": "Szansa",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Szansa”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-182",
    "word": "Kuchenne",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Kuchenne”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-183",
    "word": "Taniec",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Taniec”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-184",
    "word": "Bolek",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Bolek”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-185",
    "word": "Lolek",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Lolek”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-186",
    "word": "Pszczółka",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Pszczółka”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-187",
    "word": "Garfield",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Garfield”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-188",
    "word": "Snoopy",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Snoopy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-189",
    "word": "Wolverine",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Wolverine”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-190",
    "word": "Deadpool",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Deadpool”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-191",
    "word": "Avengers",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Avengers”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-192",
    "word": "Godzilla",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Godzilla”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-193",
    "word": "KingKong",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („KingKong”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-194",
    "word": "Jumanji",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Jumanji”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-195",
    "word": "Gremliny",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Gremliny”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-196",
    "word": "Pogromcy",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Pogromcy”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-197",
    "word": "Powrót",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Powrót”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-198",
    "word": "Szczęki",
    "category": "Filmy i Seriale",
    "difficulty": "HARD",
    "pHint": "Produkcja ekranowa („Szczęki”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-199",
    "word": "Jurrasic",
    "category": "Filmy i Seriale",
    "difficulty": "EASY",
    "pHint": "Produkcja ekranowa („Jurrasic”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-200",
    "word": "Armageddon",
    "category": "Filmy i Seriale",
    "difficulty": "MEDIUM",
    "pHint": "Produkcja ekranowa („Armageddon”) – przedstaw postacie, przebieg akcji oraz klimat używając słów na P!"
  },
  {
    "id": "w-201",
    "word": "Lewandowski",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Lewandowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-202",
    "word": "Gessler",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Gessler”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-203",
    "word": "Papież",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Papież”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-204",
    "word": "Batman",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Batman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-205",
    "word": "Potter",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Potter”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-206",
    "word": "Małysz",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Małysz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-207",
    "word": "Świątek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Świątek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-208",
    "word": "Pudzianowski",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Pudzianowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-209",
    "word": "Martyniuk",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Martyniuk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-210",
    "word": "Rodowicz",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Rodowicz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-211",
    "word": "Ibisz",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Ibisz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-212",
    "word": "Sznuk",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Sznuk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-213",
    "word": "Urbański",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Urbański”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-214",
    "word": "Mikołaj",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Mikołaj”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-215",
    "word": "Spiderman",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Spiderman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-216",
    "word": "Puchatek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Puchatek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-217",
    "word": "Vader",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Vader”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-218",
    "word": "SpongeBob",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („SpongeBob”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-219",
    "word": "Kapturek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Kapturek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-220",
    "word": "Kopciuszek",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kopciuszek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-221",
    "word": "Pinokio",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Pinokio”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-222",
    "word": "Kopernik",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Kopernik”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-223",
    "word": "Chopin",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Chopin”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-224",
    "word": "Scooby",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Scooby”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-225",
    "word": "Makłowicz",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Makłowicz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-226",
    "word": "Mata",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Mata”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-227",
    "word": "Podsiadło",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Podsiadło”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-228",
    "word": "Sanah",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Sanah”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-229",
    "word": "Trump",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Trump”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-230",
    "word": "Musk",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Musk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-231",
    "word": "Dracula",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Dracula”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-232",
    "word": "Holmes",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Holmes”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-233",
    "word": "Tarzan",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Tarzan”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-234",
    "word": "Wałęsa",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Wałęsa”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-235",
    "word": "Piłsudski",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Piłsudski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-236",
    "word": "Kościuszko",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kościuszko”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-237",
    "word": "Sobieski",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Sobieski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-238",
    "word": "Jagiełło",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Jagiełło”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-239",
    "word": "Mieszko",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Mieszko”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-240",
    "word": "Batory",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Batory”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-241",
    "word": "Skłodowska",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Skłodowska”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-242",
    "word": "Mickiewicz",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Mickiewicz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-243",
    "word": "Słowacki",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Słowacki”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-244",
    "word": "Sienkiewicz",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Sienkiewicz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-245",
    "word": "Reymont",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Reymont”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-246",
    "word": "Miłosz",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Miłosz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-247",
    "word": "Szymborska",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Szymborska”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-248",
    "word": "Tokarczuk",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Tokarczuk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-249",
    "word": "Sapkowski",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Sapkowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-250",
    "word": "Lem",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Lem”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-251",
    "word": "Kubica",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kubica”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-252",
    "word": "Stoch",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Stoch”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-253",
    "word": "Żyła",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Żyła”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-254",
    "word": "Błachowicz",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Błachowicz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-255",
    "word": "Gołota",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Gołota”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-256",
    "word": "Adamek",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Adamek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-257",
    "word": "Szpilka",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Szpilka”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-258",
    "word": "Boniek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Boniek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-259",
    "word": "Szczęsny",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Szczęsny”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-260",
    "word": "Błaszczykowski",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Błaszczykowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-261",
    "word": "Piszczek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Piszczek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-262",
    "word": "Milik",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Milik”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-263",
    "word": "Zieliński",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Zieliński”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-264",
    "word": "Krychowiak",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Krychowiak”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-265",
    "word": "Gortat",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Gortat”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-266",
    "word": "Sochan",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Sochan”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-267",
    "word": "Kurek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Kurek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-268",
    "word": "Wlazły",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Wlazły”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-269",
    "word": "Kowalczyk",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kowalczyk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-270",
    "word": "Radwańska",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Radwańska”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-271",
    "word": "Hurkacz",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Hurkacz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-272",
    "word": "Włodarczyk",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Włodarczyk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-273",
    "word": "Fajdek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Fajdek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-274",
    "word": "Zmarzlik",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Zmarzlik”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-275",
    "word": "Gollob",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Gollob”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-276",
    "word": "Hołowczyc",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Hołowczyc”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-277",
    "word": "Kuzaj",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kuzaj”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-278",
    "word": "Pazura",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Pazura”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-279",
    "word": "Linda",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Linda”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-280",
    "word": "Grabowski",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Grabowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-281",
    "word": "Karolak",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Karolak”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-282",
    "word": "Szyc",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Szyc”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-283",
    "word": "Kot",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kot”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-284",
    "word": "Więckiewicz",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Więckiewicz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-285",
    "word": "Dorociński",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Dorociński”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-286",
    "word": "Lubaszenko",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Lubaszenko”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-287",
    "word": "Fronczewski",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Fronczewski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-288",
    "word": "Gajos",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Gajos”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-289",
    "word": "Stuhr",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Stuhr”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-290",
    "word": "Olbiński",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Olbiński”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-291",
    "word": "Kondrat",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Kondrat”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-292",
    "word": "Zakościelny",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Zakościelny”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-293",
    "word": "Roznerski",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Roznerski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-294",
    "word": "Kożuchowska",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Kożuchowska”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-295",
    "word": "Mucha",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Mucha”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-296",
    "word": "Cichopek",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Cichopek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-297",
    "word": "Foremniak",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Foremniak”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-298",
    "word": "Chylińska",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Chylińska”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-299",
    "word": "Kayah",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kayah”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-300",
    "word": "Steczkowska",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Steczkowska”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-301",
    "word": "Górniak",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Górniak”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-302",
    "word": "Kozidrak",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kozidrak”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-303",
    "word": "Krawczyk",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Krawczyk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-304",
    "word": "Wodecki",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Wodecki”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-305",
    "word": "Niemen",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Niemen”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-306",
    "word": "Grechuta",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Grechuta”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-307",
    "word": "Osiecka",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Osiecka”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-308",
    "word": "Santor",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Santor”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-309",
    "word": "Brodka",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Brodka”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-310",
    "word": "Zawiałow",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Zawiałow”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-311",
    "word": "Quebonafide",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Quebonafide”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-312",
    "word": "Taco",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Taco”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-313",
    "word": "Bedoes",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Bedoes”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-314",
    "word": "Peja",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Peja”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-315",
    "word": "OSTR",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („OSTR”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-316",
    "word": "Sokół",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Sokół”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-317",
    "word": "Kizo",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kizo”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-318",
    "word": "Skolim",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Skolim”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-319",
    "word": "Wiśniewski",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Wiśniewski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-320",
    "word": "Owsiak",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Owsiak”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-321",
    "word": "Wojewódzki",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Wojewódzki”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-322",
    "word": "Prokop",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Prokop”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-323",
    "word": "Wellman",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Wellman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-324",
    "word": "Hołownia",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Hołownia”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-325",
    "word": "Rozenek",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Rozenek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-326",
    "word": "Krupa",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Krupa”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-327",
    "word": "Rubiki",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Rubiki”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-328",
    "word": "Wieniawa",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Wieniawa”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-329",
    "word": "Friz",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Friz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-330",
    "word": "Wersow",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Wersow”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-331",
    "word": "Książulo",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Książulo”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-332",
    "word": "Budda",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Budda”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-333",
    "word": "Gimper",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Gimper”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-334",
    "word": "Wardęga",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Wardęga”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-335",
    "word": "Najman",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Najman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-336",
    "word": "Borek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Borek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-337",
    "word": "Stanowski",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Stanowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-338",
    "word": "Szpakowski",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Szpakowski”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-339",
    "word": "Babiarz",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Babiarz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-340",
    "word": "Superman",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Superman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-341",
    "word": "Ironman",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Ironman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-342",
    "word": "Thor",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Thor”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-343",
    "word": "Hulk",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Hulk”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-344",
    "word": "Thanos",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Thanos”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-345",
    "word": "Loki",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Loki”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-346",
    "word": "Aquaman",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Aquaman”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-347",
    "word": "Flash",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Flash”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-348",
    "word": "Zorro",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Zorro”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-349",
    "word": "RobinHood",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („RobinHood”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-350",
    "word": "Gandalf",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Gandalf”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-351",
    "word": "Frodo",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Frodo”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-352",
    "word": "Gollum",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Gollum”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-353",
    "word": "Aragorn",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Aragorn”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-354",
    "word": "Legolas",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Legolas”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-355",
    "word": "Geralt",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Geralt”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-356",
    "word": "Yennefer",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Yennefer”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-357",
    "word": "Jaskier",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Jaskier”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-358",
    "word": "Ciri",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Ciri”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-359",
    "word": "Voldemort",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Voldemort”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-360",
    "word": "Dumbledore",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Dumbledore”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-361",
    "word": "Snape",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Snape”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-362",
    "word": "Hermiona",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Hermiona”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-363",
    "word": "Hagrid",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Hagrid”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-364",
    "word": "Pikachu",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Pikachu”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-365",
    "word": "Mario",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Mario”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-366",
    "word": "Sonic",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Sonic”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-367",
    "word": "Kratos",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kratos”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-368",
    "word": "LaraCroft",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („LaraCroft”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-369",
    "word": "PacMan",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („PacMan”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-370",
    "word": "Zelda",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Zelda”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-371",
    "word": "Asteriks",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Asteriks”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-372",
    "word": "Obeliks",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Obeliks”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-373",
    "word": "Kajko",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kajko”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-374",
    "word": "Kokosz",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kokosz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-375",
    "word": "Tytus",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Tytus”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-376",
    "word": "Kleks",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kleks”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-377",
    "word": "Rumcajs",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Rumcajs”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-378",
    "word": "Gargamel",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Gargamel”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-379",
    "word": "Klakier",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Klakier”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-380",
    "word": "Kermit",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Kermit”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-381",
    "word": "Prosiaczek",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Prosiaczek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-382",
    "word": "Kłapouchy",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Kłapouchy”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-383",
    "word": "Tygrysek",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Tygrysek”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-384",
    "word": "Fiona",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Fiona”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-385",
    "word": "Osioł",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Osioł”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-386",
    "word": "Madonna",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Madonna”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-387",
    "word": "Shakira",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Shakira”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-388",
    "word": "Rihanna",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Rihanna”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-389",
    "word": "Beyonce",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Beyonce”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-390",
    "word": "Eminem",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Eminem”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-391",
    "word": "Elvis",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Elvis”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-392",
    "word": "Jackson",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Jackson”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-393",
    "word": "Mercury",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Mercury”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-394",
    "word": "Lennon",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Lennon”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-395",
    "word": "Messi",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Messi”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-396",
    "word": "Ronaldo",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Ronaldo”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-397",
    "word": "Mbappe",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Mbappe”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-398",
    "word": "Neymar",
    "category": "Postacie i Celebryci",
    "difficulty": "HARD",
    "pHint": "Popularna postać („Neymar”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-399",
    "word": "Królowa",
    "category": "Postacie i Celebryci",
    "difficulty": "EASY",
    "pHint": "Popularna postać („Królowa”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-400",
    "word": "Cesarz",
    "category": "Postacie i Celebryci",
    "difficulty": "MEDIUM",
    "pHint": "Popularna postać („Cesarz”) – przybliż profesję, popisowe cechy oraz pochodzenie słowami na P!"
  },
  {
    "id": "w-401",
    "word": "Pieczenie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Pieczenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-402",
    "word": "Grzybobranie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Grzybobranie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-403",
    "word": "Policjant",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Policjant”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-404",
    "word": "Strażak",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Strażak”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-405",
    "word": "Listonosz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Listonosz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-406",
    "word": "Fryzjer",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Fryzjer”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-407",
    "word": "Morsowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Morsowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-408",
    "word": "Grillowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Grillowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-409",
    "word": "Ratownik",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Ratownik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-410",
    "word": "Prasowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Prasowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-411",
    "word": "Dojenie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Dojenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-412",
    "word": "Oświadczyny",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Oświadczyny”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-413",
    "word": "Czkawka",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Czkawka”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-414",
    "word": "Lunatykowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Lunatykowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-415",
    "word": "Wróżbita",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Wróżbita”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-416",
    "word": "Zmywanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Zmywanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-417",
    "word": "Wędkowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Wędkowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-418",
    "word": "Chrapanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Chrapanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-419",
    "word": "Dentysta",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Dentysta”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-420",
    "word": "Kierowca",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Kierowca”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-421",
    "word": "Tłumacz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Tłumacz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-422",
    "word": "Sędzia",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Sędzia”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-423",
    "word": "Chirurg",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Chirurg”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-424",
    "word": "Pielęgniarka",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Pielęgniarka”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-425",
    "word": "Aptekarz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Aptekarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-426",
    "word": "Weterynarz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Weterynarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-427",
    "word": "Psycholog",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Psycholog”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-428",
    "word": "Psychiatra",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Psychiatra”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-429",
    "word": "Ksiądz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Ksiądz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-430",
    "word": "Zakonnica",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Zakonnica”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-431",
    "word": "Nauczyciel",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Nauczyciel”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-432",
    "word": "Profesor",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Profesor”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-433",
    "word": "Dyrektor",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Dyrektor”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-434",
    "word": "Woźny",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Woźny”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-435",
    "word": "Bibliotekarz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Bibliotekarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-436",
    "word": "Prawnik",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Prawnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-437",
    "word": "Adwokat",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Adwokat”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-438",
    "word": "Prokurator",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Prokurator”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-439",
    "word": "Komornik",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Komornik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-440",
    "word": "Notariusz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Notariusz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-441",
    "word": "Architekt",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Architekt”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-442",
    "word": "Inżynier",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Inżynier”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-443",
    "word": "Murarz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Murarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-444",
    "word": "Tynkarz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Tynkarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-445",
    "word": "Malarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Malarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-446",
    "word": "Hydraulik",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Hydraulik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-447",
    "word": "Elektryk",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Elektryk”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-448",
    "word": "Stolarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Stolarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-449",
    "word": "Ślusarz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Ślusarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-450",
    "word": "Spawacz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Spawacz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-451",
    "word": "Mechanik",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Mechanik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-452",
    "word": "Blacharz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Blacharz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-453",
    "word": "Lakiernik",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Lakiernik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-454",
    "word": "Wulkanizator",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Wulkanizator”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-455",
    "word": "Kurier",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kurier”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-456",
    "word": "Maszynista",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Maszynista”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-457",
    "word": "Konduktor",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Konduktor”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-458",
    "word": "Kanar",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kanar”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-459",
    "word": "Pilot",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Pilot”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-460",
    "word": "Stewardessa",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Stewardessa”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-461",
    "word": "Marynarz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Marynarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-462",
    "word": "Kapitan",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Kapitan”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-463",
    "word": "Rybak",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Rybak”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-464",
    "word": "Ogrodnik",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Ogrodnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-465",
    "word": "Leśniczy",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Leśniczy”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-466",
    "word": "Drwal",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Drwal”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-467",
    "word": "Myśliwy",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Myśliwy”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-468",
    "word": "Pszczelarz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Pszczelarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-469",
    "word": "Piekarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Piekarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-470",
    "word": "Cukiernik",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Cukiernik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-471",
    "word": "Rzeźnik",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Rzeźnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-472",
    "word": "Kucharz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Kucharz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-473",
    "word": "Kelner",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kelner”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-474",
    "word": "Barman",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Barman”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-475",
    "word": "Sommelier",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Sommelier”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-476",
    "word": "Sprzątaczka",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Sprzątaczka”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-477",
    "word": "Szatniarz",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Szatniarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-478",
    "word": "Ochroniarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Ochroniarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-479",
    "word": "Detektyw",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Detektyw”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-480",
    "word": "Szpieg",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Szpieg”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-481",
    "word": "Żołnierz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Żołnierz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-482",
    "word": "Snajper",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Snajper”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-483",
    "word": "Saper",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Saper”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-484",
    "word": "Celnik",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Celnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-485",
    "word": "Księgowy",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Księgowy”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-486",
    "word": "Bankier",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Bankier”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-487",
    "word": "Makler",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Makler”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-488",
    "word": "Ubezpieczyciel",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Ubezpieczyciel”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-489",
    "word": "Programista",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Programista”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-490",
    "word": "Informatyk",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Informatyk”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-491",
    "word": "Haker",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Haker”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-492",
    "word": "Grafik",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Grafik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-493",
    "word": "Fotograf",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Fotograf”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-494",
    "word": "Kamerzysta",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kamerzysta”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-495",
    "word": "Montażysta",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Montażysta”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-496",
    "word": "Dziennikarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Dziennikarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-497",
    "word": "Prezenter",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Prezenter”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-498",
    "word": "Aktor",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Aktor”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-499",
    "word": "Reżyser",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Reżyser”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-500",
    "word": "Kaskader",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kaskader”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-501",
    "word": "Sufler",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Sufler”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-502",
    "word": "Piosenkarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Piosenkarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-503",
    "word": "Muzyk",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Muzyk”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-504",
    "word": "Dyrygent",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Dyrygent”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-505",
    "word": "DJ",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („DJ”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-506",
    "word": "Tancerz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Tancerz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-507",
    "word": "Balerina",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Balerina”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-508",
    "word": "Iluzjonista",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Iluzjonista”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-509",
    "word": "Klaun",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Klaun”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-510",
    "word": "Akrobata",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Akrobata”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-511",
    "word": "Żongler",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Żongler”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-512",
    "word": "Krawiec",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Krawiec”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-513",
    "word": "Szewc",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Szewc”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-514",
    "word": "Zegarmistrz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Zegarmistrz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-515",
    "word": "Jubiler",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Jubiler”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-516",
    "word": "Złotnik",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Złotnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-517",
    "word": "Kominiarz",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Kominiarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-518",
    "word": "Grabarz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Grabarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-519",
    "word": "Górnik",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Górnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-520",
    "word": "Hutnik",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Hutnik”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-521",
    "word": "Geodeta",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Geodeta”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-522",
    "word": "Archeolog",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Archeolog”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-523",
    "word": "Astronom",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Astronom”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-524",
    "word": "Astronauta",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Astronauta”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-525",
    "word": "Nurek",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Nurek”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-526",
    "word": "Alpinista",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Alpinista”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-527",
    "word": "Bieganie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Bieganie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-528",
    "word": "Pływanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Pływanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-529",
    "word": "Nurkowanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Nurkowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-530",
    "word": "Żeglowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Żeglowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-531",
    "word": "Wiosłowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Wiosłowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-532",
    "word": "Surfowanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Surfowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-533",
    "word": "Narciarstwo",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Narciarstwo”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-534",
    "word": "Łyżwiarstwo",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Łyżwiarstwo”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-535",
    "word": "Saneczkarstwo",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Saneczkarstwo”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-536",
    "word": "Boksowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Boksowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-537",
    "word": "Zapasy",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Zapasy”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-538",
    "word": "Szermierka",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Szermierka”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-539",
    "word": "Łucznictwo",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Łucznictwo”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-540",
    "word": "Strzelectwo",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Strzelectwo”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-541",
    "word": "Kręgle",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Kręgle”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-542",
    "word": "Bilard",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Bilard”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-543",
    "word": "Szachy",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Szachy”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-544",
    "word": "Warcaby",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Warcaby”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-545",
    "word": "Gotowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Gotowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-546",
    "word": "Smażenie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Smażenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-547",
    "word": "Duszenie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Duszenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-548",
    "word": "Wędzenie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Wędzenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-549",
    "word": "Marynowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Marynowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-550",
    "word": "Kiszenie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Kiszenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-551",
    "word": "Obieranie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Obieranie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-552",
    "word": "Krojenie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Krojenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-553",
    "word": "Siekanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Siekanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-554",
    "word": "Tarcie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Tarcie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-555",
    "word": "Wyciskanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Wyciskanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-556",
    "word": "Mieszanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Mieszanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-557",
    "word": "Ubijanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Ubijanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-558",
    "word": "Wałkowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Wałkowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-559",
    "word": "Odkurzanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Odkurzanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-560",
    "word": "Zamiatanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Zamiatanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-561",
    "word": "Mopowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Mopowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-562",
    "word": "Pranie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Pranie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-563",
    "word": "Wirowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Wirowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-564",
    "word": "Suszenie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Suszenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-565",
    "word": "Szycie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Szycie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-566",
    "word": "Cerowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Cerowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-567",
    "word": "Haftowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Haftowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-568",
    "word": "Dzierganie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Dzierganie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-569",
    "word": "Majsterkowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Majsterkowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-570",
    "word": "Wiercenie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Wiercenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-571",
    "word": "Piłowanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Piłowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-572",
    "word": "Szlifowanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Szlifowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-573",
    "word": "Spawanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Spawanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-574",
    "word": "Lutowanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Lutowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-575",
    "word": "Klejenie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Klejenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-576",
    "word": "Malowanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Malowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-577",
    "word": "Tapetowanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Tapetowanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-578",
    "word": "Koszenie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Koszenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-579",
    "word": "Grabienie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Grabienie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-580",
    "word": "Podlewanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Podlewanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-581",
    "word": "Pielenie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Pielenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-582",
    "word": "Przesadzanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Przesadzanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-583",
    "word": "Kichanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Kichanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-584",
    "word": "Kaszlenie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kaszlenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-585",
    "word": "Ziewanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Ziewanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-586",
    "word": "Mruganie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Mruganie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-587",
    "word": "Żucie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Żucie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-588",
    "word": "Połykanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Połykanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-589",
    "word": "Plucie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Plucie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-590",
    "word": "Gwizdanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Gwizdanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-591",
    "word": "Szeptanie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Szeptanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-592",
    "word": "Krzyczenie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Krzyczenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-593",
    "word": "Śpiewanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Śpiewanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-594",
    "word": "Tańczenie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Tańczenie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-595",
    "word": "Skakanie",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Skakanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-596",
    "word": "Kucanie",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Kucanie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-597",
    "word": "Czołganie",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Czołganie”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-598",
    "word": "Drzemka",
    "category": "Czynności i Zawody",
    "difficulty": "HARD",
    "pHint": "Profesja albo praca („Drzemka”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-599",
    "word": "Spadochroniarz",
    "category": "Czynności i Zawody",
    "difficulty": "EASY",
    "pHint": "Profesja albo praca („Spadochroniarz”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-600",
    "word": "Kaskaderka",
    "category": "Czynności i Zawody",
    "difficulty": "MEDIUM",
    "pHint": "Profesja albo praca („Kaskaderka”) – pokaż przebieg, przyrządy oraz powinności słowami na P!"
  },
  {
    "id": "w-601",
    "word": "Mikrofalówka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Mikrofalówka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-602",
    "word": "Odkurzacz",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Odkurzacz”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-603",
    "word": "Gaśnica",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Gaśnica”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-604",
    "word": "Drapak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Drapak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-605",
    "word": "Suszarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Suszarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-606",
    "word": "Korkociąg",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Korkociąg”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-607",
    "word": "Reklamówka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Reklamówka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-608",
    "word": "Pilnik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Pilnik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-609",
    "word": "Budzik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Budzik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-610",
    "word": "Kajdanki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kajdanki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-611",
    "word": "Zmywarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Zmywarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-612",
    "word": "Alkomat",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Alkomat”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-613",
    "word": "Parawan",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Parawan”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-614",
    "word": "Tarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Tarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-615",
    "word": "Wałek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Wałek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-616",
    "word": "Smoczek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Smoczek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-617",
    "word": "Termofor",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Termofor”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-618",
    "word": "Kamizelka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Kamizelka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-619",
    "word": "Skarbonka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Skarbonka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-620",
    "word": "Pendrive",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Pendrive”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-621",
    "word": "Hulajnoga",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Hulajnoga”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-622",
    "word": "Paczkomat",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Paczkomat”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-623",
    "word": "Lodówka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Lodówka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-624",
    "word": "Zamrażarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Zamrażarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-625",
    "word": "Piekarnik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Piekarnik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-626",
    "word": "Pralka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Pralka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-627",
    "word": "Żelazko",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Żelazko”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-628",
    "word": "Czajnik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Czajnik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-629",
    "word": "Toster",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Toster”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-630",
    "word": "Gofrówkа",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Gofrówkа”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-631",
    "word": "Blender",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Blender”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-632",
    "word": "Mikser",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Mikser”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-633",
    "word": "Sokowirówka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Sokowirówka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-634",
    "word": "Frytkownica",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Frytkownica”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-635",
    "word": "Ekspres",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Ekspres”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-636",
    "word": "Patelnia",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Patelnia”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-637",
    "word": "Garnek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Garnek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-638",
    "word": "Rondel",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Rondel”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-639",
    "word": "Durszlak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Durszlak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-640",
    "word": "Sitko",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Sitko”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-641",
    "word": "Chochla",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Chochla”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-642",
    "word": "Łopatka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Łopatka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-643",
    "word": "Trzepaczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Trzepaczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-644",
    "word": "Tłuczek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Tłuczek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-645",
    "word": "Deska",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Deska”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-646",
    "word": "Nóż",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Nóż”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-647",
    "word": "Widelec",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Widelec”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-648",
    "word": "Łyżka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Łyżka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-649",
    "word": "Łyżeczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Łyżeczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-650",
    "word": "Talerz",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Talerz”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-651",
    "word": "Miska",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Miska”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-652",
    "word": "Kubek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kubek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-653",
    "word": "Filiżanka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Filiżanka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-654",
    "word": "Szklanka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Szklanka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-655",
    "word": "Kieliszek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kieliszek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-656",
    "word": "Kufel",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Kufel”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-657",
    "word": "Dzbanek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Dzbanek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-658",
    "word": "Termos",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Termos”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-659",
    "word": "Bidon",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Bidon”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-660",
    "word": "Słoik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Słoik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-661",
    "word": "Butelka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Butelka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-662",
    "word": "Puszka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Puszka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-663",
    "word": "Karton",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Karton”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-664",
    "word": "Otwieracz",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Otwieracz”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-665",
    "word": "Dziadek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Dziadek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-666",
    "word": "Solniczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Solniczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-667",
    "word": "Pieprzniczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Pieprzniczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-668",
    "word": "Cukiernica",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Cukiernica”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-669",
    "word": "Chlebak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Chlebak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-670",
    "word": "Maselniczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Maselniczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-671",
    "word": "Serwetka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Serwetka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-672",
    "word": "Obrus",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Obrus”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-673",
    "word": "Ścierka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Ścierka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-674",
    "word": "Gąbka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Gąbka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-675",
    "word": "Zmywak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Zmywak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-676",
    "word": "Miotła",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Miotła”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-677",
    "word": "Szufelka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Szufelka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-678",
    "word": "Mop",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Mop”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-679",
    "word": "Wiadro",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Wiadro”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-680",
    "word": "Miednica",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Miednica”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-681",
    "word": "Kosz",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Kosz”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-682",
    "word": "Śmietnik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Śmietnik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-683",
    "word": "Popielniczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Popielniczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-684",
    "word": "Wazon",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Wazon”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-685",
    "word": "Doniczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Doniczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-686",
    "word": "Konewka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Konewka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-687",
    "word": "Grabie",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Grabie”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-688",
    "word": "Łopata",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Łopata”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-689",
    "word": "Szpadel",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Szpadel”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-690",
    "word": "Motyka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Motyka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-691",
    "word": "Sekator",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Sekator”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-692",
    "word": "Kosiarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Kosiarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-693",
    "word": "Taczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Taczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-694",
    "word": "Wąż",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Wąż”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-695",
    "word": "Drabina",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Drabina”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-696",
    "word": "Młotek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Młotek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-697",
    "word": "Śrubokręt",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Śrubokręt”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-698",
    "word": "Klucz",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Klucz”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-699",
    "word": "Obcęgi",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Obcęgi”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-700",
    "word": "Kombinerki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kombinerki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-701",
    "word": "Siekiera",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Siekiera”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-702",
    "word": "Wiertarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Wiertarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-703",
    "word": "Wkrętarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Wkrętarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-704",
    "word": "Poziomica",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Poziomica”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-705",
    "word": "Miarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Miarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-706",
    "word": "Taśma",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Taśma”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-707",
    "word": "Kłódka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Kłódka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-708",
    "word": "Kluczyk",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Kluczyk”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-709",
    "word": "Latarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Latarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-710",
    "word": "Świeczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Świeczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-711",
    "word": "Zapałki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Zapałki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-712",
    "word": "Zapalniczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Zapalniczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-713",
    "word": "Bateria",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Bateria”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-714",
    "word": "Przedłużacz",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Przedłużacz”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-715",
    "word": "Żarówka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Żarówka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-716",
    "word": "Gniazdko",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Gniazdko”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-717",
    "word": "Wtyczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Wtyczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-718",
    "word": "Telewizor",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Telewizor”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-719",
    "word": "Radio",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Radio”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-720",
    "word": "Głośnik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Głośnik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-721",
    "word": "Słuchawki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Słuchawki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-722",
    "word": "Mikrofon",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Mikrofon”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-723",
    "word": "Aparat",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Aparat”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-724",
    "word": "Kamera",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kamera”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-725",
    "word": "Laptop",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Laptop”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-726",
    "word": "Komputer",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Komputer”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-727",
    "word": "Monitor",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Monitor”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-728",
    "word": "Klawiatura",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Klawiatura”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-729",
    "word": "Myszka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Myszka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-730",
    "word": "Drukarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Drukarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-731",
    "word": "Skaner",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Skaner”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-732",
    "word": "Router",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Router”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-733",
    "word": "Smartfon",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Smartfon”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-734",
    "word": "Tablet",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Tablet”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-735",
    "word": "Zegarek",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Zegarek”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-736",
    "word": "Kalkulator",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kalkulator”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-737",
    "word": "Ładowarka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Ładowarka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-738",
    "word": "Powerbank",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Powerbank”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-739",
    "word": "Kanapa",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kanapa”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-740",
    "word": "Fotel",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Fotel”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-741",
    "word": "Krzesło",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Krzesło”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-742",
    "word": "Taboret",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Taboret”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-743",
    "word": "Stół",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Stół”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-744",
    "word": "Stolik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Stolik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-745",
    "word": "Biurko",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Biurko”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-746",
    "word": "Szafa",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Szafa”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-747",
    "word": "Komoda",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Komoda”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-748",
    "word": "Regał",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Regał”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-749",
    "word": "Półka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Półka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-750",
    "word": "Łóżko",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Łóżko”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-751",
    "word": "Materac",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Materac”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-752",
    "word": "Poduszka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Poduszka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-753",
    "word": "Kołdra",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Kołdra”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-754",
    "word": "Koc",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Koc”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-755",
    "word": "Prześcieradło",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Prześcieradło”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-756",
    "word": "Dywan",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Dywan”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-757",
    "word": "Wycieraczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Wycieraczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-758",
    "word": "Zasłona",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Zasłona”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-759",
    "word": "Firanka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Firanka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-760",
    "word": "Roleta",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Roleta”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-761",
    "word": "Żaluzja",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Żaluzja”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-762",
    "word": "Lustro",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Lustro”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-763",
    "word": "Żyrandol",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Żyrandol”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-764",
    "word": "Lampka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Lampka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-765",
    "word": "Wieszak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Wieszak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-766",
    "word": "Parasol",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Parasol”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-767",
    "word": "Walizka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Walizka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-768",
    "word": "Plecak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Plecak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-769",
    "word": "Torebka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Torebka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-770",
    "word": "Portfel",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Portfel”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-771",
    "word": "Okulary",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Okulary”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-772",
    "word": "Lornetka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Lornetka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-773",
    "word": "Lupa",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Lupa”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-774",
    "word": "Kompas",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Kompas”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-775",
    "word": "Termometr",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Termometr”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-776",
    "word": "Waga",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Waga”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-777",
    "word": "Nożyczki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Nożyczki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-778",
    "word": "Pęseta",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Pęseta”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-779",
    "word": "Grzebień",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Grzebień”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-780",
    "word": "Szczotka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Szczotka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-781",
    "word": "Szczoteczka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Szczoteczka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-782",
    "word": "Maszynka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Maszynka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-783",
    "word": "Ręcznik",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Ręcznik”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-784",
    "word": "Szlafrok",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Szlafrok”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-785",
    "word": "Kapcie",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Kapcie”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-786",
    "word": "Kalosze",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Kalosze”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-787",
    "word": "Kask",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Kask”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-788",
    "word": "Rower",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Rower”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-789",
    "word": "Deskorolka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Deskorolka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-790",
    "word": "Wrotki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Wrotki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-791",
    "word": "Rolki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Rolki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-792",
    "word": "Narty",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Narty”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-793",
    "word": "Sanki",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Sanki”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-794",
    "word": "Kajak",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Kajak”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-795",
    "word": "Ponton",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Ponton”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-796",
    "word": "Namiot",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Namiot”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-797",
    "word": "Śpiwór",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Śpiwór”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-798",
    "word": "Karuzela",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "HARD",
    "pHint": "Przedmiot codzienny („Karuzela”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-799",
    "word": "Huśtawka",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "EASY",
    "pHint": "Przedmiot codzienny („Huśtawka”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-800",
    "word": "Zjeżdżalnia",
    "category": "Przedmioty i Rzeczy",
    "difficulty": "MEDIUM",
    "pHint": "Przedmiot codzienny („Zjeżdżalnia”) – przedstaw przeznaczenie, kształt oraz położenie słowami na P!"
  },
  {
    "id": "w-801",
    "word": "Kac",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Kac”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-802",
    "word": "Inflacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Inflacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-803",
    "word": "Randka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Randka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-804",
    "word": "Awaria",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Awaria”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-805",
    "word": "Poniedziałek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Poniedziałek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-806",
    "word": "Kredyt",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kredyt”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-807",
    "word": "Zwolnienie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Zwolnienie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-808",
    "word": "Przyjaźń",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Przyjaźń”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-809",
    "word": "Kryzys",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kryzys”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-810",
    "word": "Spisek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Spisek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-811",
    "word": "Kłamstwo",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Kłamstwo”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-812",
    "word": "Zazdrość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Zazdrość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-813",
    "word": "Prokrastynacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Prokrastynacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-814",
    "word": "Moralniak",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Moralniak”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-815",
    "word": "Plotka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Plotka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-816",
    "word": "Podatek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Podatek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-817",
    "word": "Zakwasy",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Zakwasy”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-818",
    "word": "Miłość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Miłość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-819",
    "word": "Przecena",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Przecena”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-820",
    "word": "Postanowienie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Postanowienie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-821",
    "word": "Kolejka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kolejka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-822",
    "word": "Rekrutacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Rekrutacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-823",
    "word": "Mandat",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Mandat”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-824",
    "word": "Kawalerski",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kawalerski”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-825",
    "word": "Panieński",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Panieński”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-826",
    "word": "Inteligencja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Inteligencja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-827",
    "word": "Nostalgia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Nostalgia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-828",
    "word": "Melancholia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Melancholia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-829",
    "word": "Depresja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Depresja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-830",
    "word": "Bezsenność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Bezsenność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-831",
    "word": "Marzenie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Marzenie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-832",
    "word": "Wyobraźnia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Wyobraźnia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-833",
    "word": "Intuicja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Intuicja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-834",
    "word": "Sumienie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Sumienie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-835",
    "word": "Honor",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Honor”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-836",
    "word": "Duma",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Duma”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-837",
    "word": "Pokora",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Pokora”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-838",
    "word": "Wstyd",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Wstyd”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-839",
    "word": "Poczucie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Poczucie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-840",
    "word": "Wina",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Wina”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-841",
    "word": "Zemsta",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Zemsta”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-842",
    "word": "Przebaczenie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Przebaczenie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-843",
    "word": "Tęsknota",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Tęsknota”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-844",
    "word": "Samotność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Samotność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-845",
    "word": "Wolność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Wolność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-846",
    "word": "Sprawiedliwość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Sprawiedliwość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-847",
    "word": "Równość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Równość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-848",
    "word": "Demokracja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Demokracja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-849",
    "word": "Dyktatura",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Dyktatura”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-850",
    "word": "Anarchia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Anarchia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-851",
    "word": "Rewolucja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Rewolucja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-852",
    "word": "Strajk",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Strajk”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-853",
    "word": "Protest",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Protest”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-854",
    "word": "Wybory",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Wybory”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-855",
    "word": "Kampania",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Kampania”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-856",
    "word": "Propaganda",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Propaganda”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-857",
    "word": "Cenzura",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Cenzura”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-858",
    "word": "Korupcja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Korupcja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-859",
    "word": "Łapówka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Łapówka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-860",
    "word": "Szantaż",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Szantaż”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-861",
    "word": "Przemyt",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Przemyt”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-862",
    "word": "Zdrada",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Zdrada”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-863",
    "word": "Rozwód",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Rozwód”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-864",
    "word": "Alimenty",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Alimenty”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-865",
    "word": "Spadek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Spadek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-866",
    "word": "Testament",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Testament”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-867",
    "word": "Hipoteka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Hipoteka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-868",
    "word": "Bankructwo",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Bankructwo”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-869",
    "word": "Hazard",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Hazard”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-870",
    "word": "Loteria",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Loteria”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-871",
    "word": "Fortuna",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Fortuna”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-872",
    "word": "Bogactwo",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Bogactwo”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-873",
    "word": "Bieda",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Bieda”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-874",
    "word": "Bezrobocie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Bezrobocie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-875",
    "word": "Emerytura",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Emerytura”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-876",
    "word": "Renta",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Renta”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-877",
    "word": "Stypendium",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Stypendium”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-878",
    "word": "Urlop",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Urlop”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-879",
    "word": "Wakacje",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Wakacje”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-880",
    "word": "Ferie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Ferie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-881",
    "word": "Sylwester",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Sylwester”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-882",
    "word": "Karnawał",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Karnawał”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-883",
    "word": "Wielkanoc",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Wielkanoc”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-884",
    "word": "Wigilia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Wigilia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-885",
    "word": "Urodziny",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Urodziny”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-886",
    "word": "Imieniny",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Imieniny”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-887",
    "word": "Rocznica",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Rocznica”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-888",
    "word": "Jubileusz",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Jubileusz”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-889",
    "word": "Pogrzeb",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Pogrzeb”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-890",
    "word": "Żałoba",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Żałoba”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-891",
    "word": "Chrzciny",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Chrzciny”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-892",
    "word": "Komunia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Komunia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-893",
    "word": "Studniówka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Studniówka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-894",
    "word": "Matura",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Matura”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-895",
    "word": "Sesja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Sesja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-896",
    "word": "Dyplom",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Dyplom”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-897",
    "word": "Magisterka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Magisterka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-898",
    "word": "Doktorat",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Doktorat”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-899",
    "word": "Wagarowanie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Wagarowanie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-900",
    "word": "Ściąga",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Ściąga”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-901",
    "word": "Poprawka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Poprawka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-902",
    "word": "Zaliczenie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Zaliczenie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-903",
    "word": "Stres",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Stres”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-904",
    "word": "Panika",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Panika”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-905",
    "word": "Fobia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Fobia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-906",
    "word": "Alergia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Alergia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-907",
    "word": "Migrena",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Migrena”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-908",
    "word": "Przeziębienie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Przeziębienie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-909",
    "word": "Gorączka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Gorączka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-910",
    "word": "Dreszcze",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Dreszcze”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-911",
    "word": "Katar",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Katar”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-912",
    "word": "Zgaga",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Zgaga”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-913",
    "word": "Niestrawność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Niestrawność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-914",
    "word": "Dieta",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Dieta”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-915",
    "word": "Odchudzanie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Odchudzanie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-916",
    "word": "Głodówka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Głodówka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-917",
    "word": "Wegetarianizm",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Wegetarianizm”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-918",
    "word": "Weganizm",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Weganizm”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-919",
    "word": "Metabolizm",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Metabolizm”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-920",
    "word": "Kaloria",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kaloria”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-921",
    "word": "Cholesterol",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Cholesterol”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-922",
    "word": "Witamina",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Witamina”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-923",
    "word": "Odporność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Odporność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-924",
    "word": "Szczepionka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Szczepionka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-925",
    "word": "Epidemia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Epidemia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-926",
    "word": "Kwarantanna",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kwarantanna”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-927",
    "word": "Izolacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Izolacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-928",
    "word": "Rehabilitacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Rehabilitacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-929",
    "word": "Grawitacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Grawitacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-930",
    "word": "Ewolucja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Ewolucja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-931",
    "word": "Fotosynteza",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Fotosynteza”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-932",
    "word": "Klimat",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Klimat”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-933",
    "word": "Ekologia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Ekologia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-934",
    "word": "Recykling",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Recykling”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-935",
    "word": "Smog",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Smog”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-936",
    "word": "Susza",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Susza”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-937",
    "word": "Powódź",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Powódź”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-938",
    "word": "Huragan",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Huragan”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-939",
    "word": "Tornado",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Tornado”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-940",
    "word": "Trzęsienie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Trzęsienie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-941",
    "word": "Zaćmienie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Zaćmienie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-942",
    "word": "Zorza",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Zorza”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-943",
    "word": "Tęcza",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Tęcza”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-944",
    "word": "Burza",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Burza”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-945",
    "word": "Błyskawica",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Błyskawica”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-946",
    "word": "Grzmot",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Grzmot”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-947",
    "word": "Gradobicie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Gradobicie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-948",
    "word": "Gołoledź",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Gołoledź”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-949",
    "word": "Zamieć",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Zamieć”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-950",
    "word": "Odwilż",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Odwilż”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-951",
    "word": "Upał",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Upał”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-952",
    "word": "Duchota",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Duchota”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-953",
    "word": "Przeciąg",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Przeciąg”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-954",
    "word": "Echo",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Echo”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-955",
    "word": "Cisza",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Cisza”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-956",
    "word": "Hałas",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Hałas”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-957",
    "word": "Chaos",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Chaos”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-958",
    "word": "Porządek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Porządek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-959",
    "word": "Harmonia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Harmonia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-960",
    "word": "Równowaga",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Równowaga”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-961",
    "word": "Przypadek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Przypadek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-962",
    "word": "Przeznaczenie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Przeznaczenie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-963",
    "word": "Los",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Los”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-964",
    "word": "Karma",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Karma”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-965",
    "word": "Reinkarnacja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Reinkarnacja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-966",
    "word": "Nieśmiertelność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Nieśmiertelność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-967",
    "word": "Wieczność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Wieczność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-968",
    "word": "Przeszłość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Przeszłość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-969",
    "word": "Przyszłość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Przyszłość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-970",
    "word": "Teraźniejszość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Teraźniejszość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-971",
    "word": "Sekunda",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Sekunda”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-972",
    "word": "Minuta",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Minuta”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-973",
    "word": "Godzina",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Godzina”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-974",
    "word": "Wieczór",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Wieczór”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-975",
    "word": "Północ",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Północ”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-976",
    "word": "Świt",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Świt”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-977",
    "word": "Południe",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Południe”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-978",
    "word": "Sarkazm",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Sarkazm”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-979",
    "word": "Ironia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Ironia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-980",
    "word": "Metafora",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Metafora”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-981",
    "word": "Paradoks",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Paradoks”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-982",
    "word": "Absurd",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Absurd”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-983",
    "word": "Nonsens",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Nonsens”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-984",
    "word": "Zagadka",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Zagadka”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-985",
    "word": "Tajemnica",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Tajemnica”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-986",
    "word": "Sekret",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Sekret”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-987",
    "word": "Obietnica",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Obietnica”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-988",
    "word": "Przysięga",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Przysięga”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-989",
    "word": "Kompromis",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Kompromis”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-990",
    "word": "Negocjacje",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Negocjacje”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-991",
    "word": "Kłótnia",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Kłótnia”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-992",
    "word": "Pojednanie",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Pojednanie”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-993",
    "word": "Gościnność",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Gościnność”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-994",
    "word": "Tradycja",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Tradycja”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-995",
    "word": "Przesąd",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Przesąd”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-996",
    "word": "Pech",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Pech”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-997",
    "word": "Szczęście",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Szczęście”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-998",
    "word": "Radość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "HARD",
    "pHint": "Pojęcie („Radość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-999",
    "word": "Smutek",
    "category": "Abstrakcje i Trudne",
    "difficulty": "EASY",
    "pHint": "Pojęcie („Smutek”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  },
  {
    "id": "w-1000",
    "word": "Złość",
    "category": "Abstrakcje i Trudne",
    "difficulty": "MEDIUM",
    "pHint": "Pojęcie („Złość”) – przywołaj powody, przeżycia oraz przykłady używając wyłącznie słów na P!"
  }
];
