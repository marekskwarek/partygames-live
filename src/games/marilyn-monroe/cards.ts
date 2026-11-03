export interface MarilynCard {
  id: string;
  name: string;
  category: string;
  forbidden: [string, string, string]; // dokładnie 3 zakazane słowa / frazy kluczowe
}

export const MARILYN_CARDS: MarilynCard[] = [
  {
    id: "mm_01",
    name: "Donald Trump",
    category: "Polityka",
    forbidden: ["Prezydent", "USA", "Włosy / Fryzura"]
  },
  {
    id: "mm_02",
    name: "Marilyn Monroe",
    category: "Kino / Ikony",
    forbidden: ["Blondynka", "Sukienka", "Kennedy"]
  },
  {
    id: "mm_03",
    name: "Robert Lewandowski",
    category: "Sport",
    forbidden: ["Piłka / Piłkarz", "Barcelona", "Bramka / Gol"]
  },
  {
    id: "mm_04",
    name: "Magda Gessler",
    category: "Telewizja",
    forbidden: ["Kuchenne Rewolucje", "Restauracja", "Rzucać / Talerze"]
  },
  {
    id: "mm_05",
    name: "Harry Potter",
    category: "Fikcja",
    forbidden: ["Magia / Czarodziej", "Blizna", "Hogwart"]
  },
  {
    id: "mm_06",
    name: "Mikołaj Kopernik",
    category: "Historia / Nauka",
    forbidden: ["Słońce", "Ziemia", "Toruń"]
  },
  {
    id: "mm_07",
    name: "Shrek",
    category: "Animacja",
    forbidden: ["Ogr", "Bagno", "Osioł"]
  },
  {
    id: "mm_08",
    name: "Robert Makłowicz",
    category: "Internet / TV",
    forbidden: ["Gotowanie", "Podróże", "Pies / Koper"]
  },
  {
    id: "mm_09",
    name: "Batman",
    category: "Fikcja",
    forbidden: ["Nietoperz", "Gotham", "Joker"]
  },
  {
    id: "mm_10",
    name: "Adam Małysz",
    category: "Sport",
    forbidden: ["Skoki / Narty", "Wąsy", "Bułka z bananem"]
  },
  {
    id: "mm_11",
    name: "Papież Jan Paweł II",
    category: "Historia / Religia",
    forbidden: ["Watykan", "Kremówki", "Polska / Karol"]
  },
  {
    id: "mm_12",
    name: "Elon Musk",
    category: "Technologia / Biznes",
    forbidden: ["Tesla", "Twitter / X", "Rakieta / Mars"]
  },
  {
    id: "mm_13",
    name: "Krzysztof Ibisz",
    category: "Telewizja",
    forbidden: ["Polsat", "Młody / Wiecznie", "Prezenter"]
  },
  {
    id: "mm_14",
    name: "Mariusz Pudzianowski",
    category: "Sport",
    forbidden: ["Strongman / Siłacz", "Polska Górą", "Klatka / KSW"]
  },
  {
    id: "mm_15",
    name: "Iga Świątek",
    category: "Sport",
    forbidden: ["Tenis / Rakieta", "Paryż / Roland Garros", "Czapka"]
  },
  {
    id: "mm_16",
    name: "Zenek Martyniuk",
    category: "Muzyka",
    forbidden: ["Disco Polo", "Zielone / Oczy", "Akcent"]
  },
  {
    id: "mm_17",
    name: "Albert Einstein",
    category: "Historia / Nauka",
    forbidden: ["Względność / E=mc2", "Fizyk", "Język"]
  },
  {
    id: "mm_18",
    name: "Michael Jackson",
    category: "Muzyka",
    forbidden: ["Król Popu", "Moonwalk", "Rękawiczka"]
  },
  {
    id: "mm_19",
    name: "Maryla Rodowicz",
    category: "Muzyka",
    forbidden: ["Sylwester", "Małgośka", "Gitara"]
  },
  {
    id: "mm_20",
    name: "Kubuś Puchatek",
    category: "Animacja",
    forbidden: ["Miód", "Miś", "Prosiaczek"]
  },
  {
    id: "mm_21",
    name: "Leonardo DiCaprio",
    category: "Kino",
    forbidden: ["Titanic", "Oscar", "Statek"]
  },
  {
    id: "mm_22",
    name: "Fryderyk Chopin",
    category: "Historia / Muzyka",
    forbidden: ["Fortepian / Pianino", "Polonez", "Żelazowa Wola"]
  },
  {
    id: "mm_23",
    name: "Spider-Man",
    category: "Fikcja",
    forbidden: ["Pająk / Sieć", "Peter Parker", "Wujek Ben"]
  },
  {
    id: "mm_24",
    name: "Darth Vader",
    category: "Kino / Sci-Fi",
    forbidden: ["Gwiezdne Wojny", "Ojciec", "Maska / Oddech"]
  },
  {
    id: "mm_25",
    name: "Lech Wałęsa",
    category: "Polityka / Historia",
    forbidden: ["Solidarność", "Wąsy", "Nobel"]
  },
  {
    id: "mm_26",
    name: "Maria Skłodowska-Curie",
    category: "Historia / Nauka",
    forbidden: ["Promieniotwórczość", "Rad / Polon", "Nobel"]
  },
  {
    id: "mm_27",
    name: "Sanah",
    category: "Muzyka",
    forbidden: ["Szampan", "Skrzypce", "Poezja"]
  },
  {
    id: "mm_28",
    name: "Dawid Podsiadło",
    category: "Muzyka",
    forbidden: ["Małomiasteczkowy", "Stadion", "Wąs"]
  },
  {
    id: "mm_29",
    name: "Krzysztof Stanowski",
    category: "Internet / Media",
    forbidden: ["Kanał Zero", "Dziennikarz", "Weszło"]
  },
  {
    id: "mm_30",
    name: "Friz (Karol Wiśniewski)",
    category: "Internet",
    forbidden: ["Ekipa", "Lody", "YouTube"]
  },
  {
    id: "mm_31",
    name: "Władimir Putin",
    category: "Polityka",
    forbidden: ["Rosja", "Kreml", "Wojna"]
  },
  {
    id: "mm_32",
    name: "Barack Obama",
    category: "Polityka",
    forbidden: ["Prezydent", "USA / Ameryka", "Yes We Can"]
  },
  {
    id: "mm_33",
    name: "Lionel Messi",
    category: "Sport",
    forbidden: ["Argentyna", "Złota Piłka", "Barcelona / Miami"]
  },
  {
    id: "mm_34",
    name: "Cristiano Ronaldo",
    category: "Sport",
    forbidden: ["CR7", "Portugalia", "Siuuu"]
  },
  {
    id: "mm_35",
    name: "Królowa Elżbieta II",
    category: "Historia / Monarchia",
    forbidden: ["Wielka Brytania", "Korona", "Corgi"]
  },
  {
    id: "mm_36",
    name: "Juliusz Cezar",
    category: "Historia",
    forbidden: ["Rzym", "Brutus", "Iry"]
  },
  {
    id: "mm_37",
    name: "Napoleon Bonaparte",
    category: "Historia",
    forbidden: ["Francja", "Wyspa / Elba", "Niski"]
  },
  {
    id: "mm_38",
    name: "Kleopatra",
    category: "Historia",
    forbidden: ["Egipt", "Piramidy", "Wąż"]
  },
  {
    id: "mm_39",
    name: "Sherlock Holmes",
    category: "Fikcja",
    forbidden: ["Detektyw", "Watson", "Fajka / Lupa"]
  },
  {
    id: "mm_40",
    name: "James Bond",
    category: "Fikcja / Kino",
    forbidden: ["007", "Agent", "Martini"]
  },
  {
    id: "mm_41",
    name: "Geralt z Rivii",
    category: "Fikcja / Gry",
    forbidden: ["Wiedźmin", "Miecz", "Potwory"]
  },
  {
    id: "mm_42",
    name: "Super Mario",
    category: "Gry / Animacja",
    forbidden: ["Hydraulik", "Wąsaty", "Księżniczka / Grzyb"]
  },
  {
    id: "mm_43",
    name: "Pikachu",
    category: "Gry / Animacja",
    forbidden: ["Pokemon", "Żółty", "Piorun / Prąd"]
  },
  {
    id: "mm_44",
    name: "SpongeBob Kanciastoporty",
    category: "Animacja",
    forbidden: ["Gąbka", "Podwodny / Krab", "Patryk"]
  },
  {
    id: "mm_45",
    name: "Arnold Schwarzenegger",
    category: "Kino",
    forbidden: ["Terminator", "Kulturysta", "Gubernator"]
  },
  {
    id: "mm_46",
    name: "Sylvester Stallone",
    category: "Kino",
    forbidden: ["Rocky", "Rambo", "Boks"]
  },
  {
    id: "mm_47",
    name: "Cezary Pazura",
    category: "Kino / Aktor",
    forbidden: ["Kiler", "13 Posterunek", "Aktor"]
  },
  {
    id: "mm_48",
    name: "Bogusław Linda",
    category: "Kino / Aktor",
    forbidden: ["Psy", "Franz Maurer", "Co ty wiesz"]
  },
  {
    id: "mm_49",
    name: "Kuba Wojewódzki",
    category: "Telewizja",
    forbidden: ["TVN", "Kanapa", "Wodzianka"]
  },
  {
    id: "mm_50",
    name: "Tadeusz Sznuk",
    category: "Telewizja",
    forbidden: ["Jeden z dziesięciu", "Pytanie", "Prezenter"]
  },
  {
    id: "mm_51",
    name: "Hubert Urbański",
    category: "Telewizja",
    forbidden: ["Milionerzy", "Pytanie", "Koło ratunkowe"]
  },
  {
    id: "mm_52",
    name: "Andrzej Gołota",
    category: "Sport",
    forbidden: ["Boks", "Ucieczka / Ring", "Waga ciężka"]
  },
  {
    id: "mm_53",
    name: "Kamil Stoch",
    category: "Sport",
    forbidden: ["Skoki / Narty", "Złoto / Zakopane", "Małysz"]
  },
  {
    id: "mm_54",
    name: "Robert Kubica",
    category: "Sport",
    forbidden: ["Formuła 1 / Bolid", "Wypadek / Ręka", "Wyścigi"]
  },
  {
    id: "mm_55",
    name: "Wojciech Szczęsny",
    category: "Sport",
    forbidden: ["Bramkarz", "Barcelona / Juventus", "Karny"]
  },
  {
    id: "mm_56",
    name: "Marcin Najman",
    category: "Sport / Internet",
    forbidden: ["Walka / MMA", "Niebieska kurtka", "Klepnąć"]
  },
  {
    id: "mm_57",
    name: "Bill Gates",
    category: "Technologia / Biznes",
    forbidden: ["Microsoft", "Windows", "Miliarder"]
  },
  {
    id: "mm_58",
    name: "Steve Jobs",
    category: "Technologia / Biznes",
    forbidden: ["Apple", "iPhone", "Golf / Jabłko"]
  },
  {
    id: "mm_59",
    name: "Mark Zuckerberg",
    category: "Technologia / Biznes",
    forbidden: ["Facebook / Meta", "Instagram", "Social Media"]
  },
  {
    id: "mm_60",
    name: "Taylor Swift",
    category: "Muzyka",
    forbidden: ["Piosenkarka", "Koncerty / Eras", "Ameryka"]
  },
  {
    id: "mm_61",
    name: "Freddie Mercury",
    category: "Muzyka",
    forbidden: ["Queen", "Wąsy", "Bohemian Rhapsody"]
  },
  {
    id: "mm_62",
    name: "Elvis Presley",
    category: "Muzyka",
    forbidden: ["Król Rocka", "Baki", "Las Vegas"]
  },
  {
    id: "mm_63",
    name: "Eminem",
    category: "Muzyka",
    forbidden: ["Raper", "8 Mila", "Slim Shady"]
  },
  {
    id: "mm_64",
    name: "Madonna",
    category: "Muzyka",
    forbidden: ["Królowa Popu", "Like a Virgin", "Lata 80"]
  },
  {
    id: "mm_65",
    name: "Johnny Depp",
    category: "Kino",
    forbidden: ["Piraci z Karaibów", "Jack Sparrow", "Proces"]
  },
  {
    id: "mm_66",
    name: "Keanu Reeves",
    category: "Kino",
    forbidden: ["Matrix / Neo", "John Wick", "Pies"]
  },
  {
    id: "mm_67",
    name: "Tom Cruise",
    category: "Kino",
    forbidden: ["Mission Impossible", "Top Gun", "Kaskader"]
  },
  {
    id: "mm_68",
    name: "Brad Pitt",
    category: "Kino",
    forbidden: ["Angelina Jolie", "Fight Club", "Przystojny"]
  },
  {
    id: "mm_69",
    name: "Angelina Jolie",
    category: "Kino",
    forbidden: ["Lara Croft", "Usta", "Brad Pitt"]
  },
  {
    id: "mm_70",
    name: "Gandalf",
    category: "Fikcja",
    forbidden: ["Władca Pierścieni", "Czarodziej", "Broda / Laska"]
  },
  {
    id: "mm_71",
    name: "Frodo Baggins",
    category: "Fikcja",
    forbidden: ["Hobbit", "Pierścień", "Mordor"]
  },
  {
    id: "mm_72",
    name: "Gollum",
    category: "Fikcja",
    forbidden: ["Mój Skarb", "Jaskinia", "Rybka"]
  },
  {
    id: "mm_73",
    name: "Czerwony Kapturek",
    category: "Baśnie",
    forbidden: ["Wilk", "Babcia", "Koszyk"]
  },
  {
    id: "mm_74",
    name: "Kopciuszek",
    category: "Baśnie",
    forbidden: ["Pantofelek", "Północ", "Dynie / Bal"]
  },
  {
    id: "mm_75",
    name: "Pinokio",
    category: "Baśnie",
    forbidden: ["Nos", "Drewno", "Kłamać"]
  },
  {
    id: "mm_76",
    name: "Święty Mikołaj",
    category: "Ikony",
    forbidden: ["Prezenty", "Renifery", "Komin / Broda"]
  },
  {
    id: "mm_77",
    name: "Dracula",
    category: "Fikcja",
    forbidden: ["Wampir", "Krew", "Czosnek / Zęby"]
  },
  {
    id: "mm_78",
    name: "Joker",
    category: "Fikcja / Kino",
    forbidden: ["Batman", "Makijaż / Uśmiech", "Klaun"]
  },
  {
    id: "mm_79",
    name: "Iron Man",
    category: "Fikcja / Marvel",
    forbidden: ["Zbroja", "Tony Stark", "Serce / Reaktory"]
  },
  {
    id: "mm_80",
    name: "Hulk",
    category: "Fikcja / Marvel",
    forbidden: ["Zielony", "Złość / Gniew", "Wielki"]
  },
  {
    id: "mm_81",
    name: "Myszka Miki",
    category: "Animacja",
    forbidden: ["Uszy", "Disney", "Kaczor Donald"]
  },
  {
    id: "mm_82",
    name: "Kaczor Donald",
    category: "Animacja",
    forbidden: ["Kaczka", "Dziób", "Marynarz / Gniew"]
  },
  {
    id: "mm_83",
    name: "Reksio",
    category: "Animacja",
    forbidden: ["Pies", "Buda", "Łata"]
  },
  {
    id: "mm_84",
    name: "Koziołek Matołek",
    category: "Animacja / Komiks",
    forbidden: ["Pacanów", "Koza", "Kopyta"]
  },
  {
    id: "mm_85",
    name: "Bolek i Lolek",
    category: "Animacja",
    forbidden: ["Bracia", "Kreskówka", "Wakacje"]
  },
  {
    id: "mm_86",
    name: "Asteriks",
    category: "Komiks / Animacja",
    forbidden: ["Obeliks", "Galowie", "Napój magiczny"]
  },
  {
    id: "mm_87",
    name: "Obeliks",
    category: "Komiks / Animacja",
    forbidden: ["Menhir", "Dzik", "Kociołek"]
  },
  {
    id: "mm_88",
    name: "Winston Churchill",
    category: "Historia / Polityka",
    forbidden: ["Anglia / Wielka Brytania", "Cygara", "Wojna"]
  },
  {
    id: "mm_89",
    name: "Vincent van Gogh",
    category: "Sztuka",
    forbidden: ["Malarz", "Ucho", "Słoneczniki"]
  },
  {
    id: "mm_90",
    name: "Pablo Picasso",
    category: "Sztuka",
    forbidden: ["Malarz", "Kubizm", "Obraz"]
  }
];
