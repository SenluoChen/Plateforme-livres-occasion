export type Avis = {
  nom: string;
  note: number;
  commentaire: string;
  date: string;
};

export type Livre = {
  id: number;
  titre: string;
  categorie: string;
  image: string;
  prix: number;
  condition: "Neuf" | "Occasion";
  langue: string;
  stock: number;
  description: string;
  avis: Avis[];
};

// ==== 工具：生成隨機評論 ====
const nomsClients = [
  "Claire", "Marc", "Julie", "Thomas", "Sophie", "Léo", "Pierre", "Anna", "Paul", "Emma",
  "Lucas", "Nina", "Camille", "David", "Elise", "Olivier", "Maxime", "Sarah", "Antoine"
];

const commentaires = [
  "Un vrai coup de cœur, je recommande vivement.",
  "Très intéressant, mais quelques longueurs.",
  "Magnifique, j'ai adoré du début à la fin.",
  "Lecture agréable et enrichissante.",
  "Intrigue prenante, difficile à lâcher.",
  "Beau style d'écriture et personnages attachants.",
  "Un peu complexe mais passionnant.",
  "Parfait pour les amateurs du genre."
];

function genererAvisAleatoire(): Avis[] {
  const nombreAvis = Math.floor(Math.random() * 5) + 1; // 1~5 avis
  return Array.from({ length: nombreAvis }, () => ({
    nom: nomsClients[Math.floor(Math.random() * nomsClients.length)],
    note: Math.floor(Math.random() * 2) + 4, // 4 ou 5 étoiles
    commentaire: commentaires[Math.floor(Math.random() * commentaires.length)],
    date: new Date(
      2025,
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 28) + 1
    ).toISOString().split("T")[0]
  }));
}

// ==== 書籍資料 ====
export const livres: Livre[] = [
  {
    id: 1,
    titre: "Les Misérables",
    categorie: "Roman",
    image: "/Image/les-miserables.jpg.jpg",
    prix: 12,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "Après avoir purgé dix-neuf années de bagne...",
    avis: genererAvisAleatoire()
  },
  {
    id: 2,
    titre: "Harry Potter et la Coupe de Feu",
    categorie: "Fantasy",
    image: "/Image/harry-potter-goblet.jpg.jpg",
    prix: 25,
    condition: "Neuf",
    langue: "Français",
    stock: 5,
    description: "Lors de sa quatrième année à Poudlard...",
    avis: genererAvisAleatoire()
  },
  {
    id: 3,
    titre: "Le Petit Prince",
    categorie: "Enfants",
    image: "/Image/le-petit-prince.jpg",
    prix: 8,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Un aviateur échoué dans le désert du Sahara...",
    avis: genererAvisAleatoire()
  },
  {
    id: 4,
    titre: "Introduction to Quantum Physics",
    categorie: "Science",
    image: "/Image/quantum-physics.jpg",
    prix: 15,
    condition: "Occasion",
    langue: "Anglais",
    stock: 4,
    description: "Cet ouvrage pédagogique introduit les concepts fondamentaux...",
    avis: genererAvisAleatoire()
  },
  {
    id: 5,
    titre: "La Peste",
    categorie: "Roman",
    image: "/Image/la-peste.jpg",
    prix: 18,
    condition: "Occasion",
    langue: "Français",
    stock: 1,
    description: "Dans la ville d’Oran, une épidémie de peste se déclare...",
    avis: genererAvisAleatoire()
  },
  {
    id: 6,
    titre: "L'Étranger",
    categorie: "Roman",
    image: "/Image/letranger.jpg",
    prix: 10,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Meursault, un employé d’Alger, mène une vie détachée...",
    avis: genererAvisAleatoire()
  },
  {
    id: 7,
    titre: "Sapiens : Une brève histoire de l’humanité",
    categorie: "Histoire",
    image: "/Image/sapiens.jpg",
    prix: 20,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "Yuval Noah Harari retrace l’histoire de l’humanité...",
    avis: genererAvisAleatoire()
  },
  {
    id: 8,
    titre: "Cosmos",
    categorie: "Science",
    image: "/Image/cosmos.jpg",
    prix: 22,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Carl Sagan entraîne le lecteur dans un voyage à travers l’univers...",
    avis: genererAvisAleatoire()
  },
  {
    id: 9,
    titre: "Da Vinci Code",
    categorie: "Thriller",
    image: "/Image/da-vinci-code.jpg",
    prix: 14,
    condition: "Occasion",
    langue: "Français",
    stock: 5,
    description: "Lorsque le conservateur du Louvre est assassiné...",
    avis: genererAvisAleatoire()
  },
  {
    id: 10,
    titre: "L’art de la guerre",
    categorie: "Stratégie",
    image: "/Image/art-de-la-guerre.jpg",
    prix: 9,
    condition: "Occasion",
    langue: "Français",
    stock: 4,
    description: "Ce traité militaire attribué à Sun Tzu...",
    avis: genererAvisAleatoire()
  },
  {
    id: 11,
    titre: "Notre-Dame de Paris",
    categorie: "Roman",
    image: "/Image/notre-dame-de-paris.jpg",
    prix: 13,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Dans le Paris médiéval, Quasimodo, le sonneur bossu...",
    avis: genererAvisAleatoire()
  },
  {
    id: 12,
    titre: "Le Comte de Monte-Cristo",
    categorie: "Aventure",
    image: "/Image/monte-cristo.jpg",
    prix: 16,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "Victime d’un complot, Edmond Dantès est emprisonné...",
    avis: genererAvisAleatoire()
  },
  {
    id: 13,
    titre: "Le Seigneur des Anneaux : La Communauté de l’Anneau",
    categorie: "Fantasy",
    image: "/Image/seigneur-des-anneaux.jpg",
    prix: 24,
    condition: "Neuf",
    langue: "Français",
    stock: 4,
    description: "Frodon Sacquet hérite d’un anneau magique forgé par Sauron...",
    avis: genererAvisAleatoire()
  },
  {
    id: 14,
    titre: "Voyage au centre de la Terre",
    categorie: "Aventure",
    image: "/Image/voyage-centre-terre.jpg",
    prix: 11,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Le professeur Lidenbrock découvre un manuscrit ancien...",
    avis: genererAvisAleatoire()
  },



  {
    id: 15,
    titre: "1984",
    categorie: "Roman",
    image: "/Image/1984.jpg",
    prix: 14,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "George Orwell dépeint un monde dystopique sous surveillance constante...",
    avis: genererAvisAleatoire()
  },
  {
    id: 16,
    titre: "Fahrenheit 451",
    categorie: "Science-fiction",
    image: "/Image/fahrenheit-451.jpg",
    prix: 12,
    condition: "Neuf",
    langue: "Français",
    stock: 2,
    description: "Dans un futur où les livres sont interdits, un pompier remet en question sa mission...",
    avis: genererAvisAleatoire()
  },
  {
    id: 17,
    titre: "Crime et Châtiment",
    categorie: "Roman",
    image: "/Image/crime-et-chatiment.jpg",
    prix: 16,
    condition: "Occasion",
    langue: "Français",
    stock: 4,
    description: "Fiodor Dostoïevski explore la psychologie d’un jeune homme tourmenté...",
    avis: genererAvisAleatoire()
  },
  {
    id: 18,
    titre: "Guerre et Paix",
    categorie: "Roman",
    image: "/Image/guerre-et-paix.jpg",
    prix: 20,
    condition: "Neuf",
    langue: "Français",
    stock: 3,
    description: "Tolstoï mêle destins individuels et bouleversements historiques de la Russie napoléonienne...",
    avis: genererAvisAleatoire()
  },
  {
    id: 19,
    titre: "Moby Dick",
    categorie: "Aventure",
    image: "/Image/moby-dick.jpg",
    prix: 15,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Herman Melville raconte la quête obsessionnelle du capitaine Achab contre le grand cachalot blanc...",
    avis: genererAvisAleatoire()
  },
  {
    id: 20,
    titre: "Les Fleurs du mal",
    categorie: "Poésie",
    image: "/Image/fleurs-du-mal.jpg",
    prix: 9,
    condition: "Neuf",
    langue: "Français",
    stock: 5,
    description: "Charles Baudelaire explore la beauté, la mélancolie et la décadence à travers ses poèmes...",
    avis: genererAvisAleatoire()
  },
  {
    id: 21,
    titre: "L’Odyssée",
    categorie: "Classique",
    image: "/Image/odyssee.jpg",
    prix: 13,
    condition: "Neuf",
    langue: "Français",
    stock: 4,
    description: "Homère raconte le voyage semé d’embûches d’Ulysse pour retrouver Ithaque...",
    avis: genererAvisAleatoire()
  },
  {
    id: 22,
    titre: "L’Iliade",
    categorie: "Classique",
    image: "/Image/iliade.jpg",
    prix: 13,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "Homère narre les derniers jours de la guerre de Troie, marqués par la colère d’Achille...",
    avis: genererAvisAleatoire()
  },
  {
    id: 23,
    titre: "Le Nom de la Rose",
    categorie: "Thriller",
    image: "/Image/nom-de-la-rose.jpg",
    prix: 17,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Umberto Eco mêle enquête policière et réflexion philosophique dans une abbaye médiévale...",
    avis: genererAvisAleatoire()
  },
  {
    id: 24,
    titre: "Shining",
    categorie: "Horreur",
    image: "/Image/shining.jpg",
    prix: 14,
    condition: "Neuf",
    langue: "Français",
    stock: 3,
    description: "Stephen King plonge dans l’angoisse d’un hôtel isolé où un écrivain sombre dans la folie...",
    avis: genererAvisAleatoire()
  },
  {
    id: 25,
    titre: "Dracula",
    categorie: "Horreur",
    image: "/Image/dracula.jpg",
    prix: 12,
    condition: "Occasion",
    langue: "Français",
    stock: 4,
    description: "Bram Stoker raconte l’histoire du comte vampire et de ceux qui tentent de le vaincre...",
    avis: genererAvisAleatoire()
  },
  {
    id: 26,
    titre: "Frankenstein",
    categorie: "Science-fiction",
    image: "/Image/frankenstein.jpg",
    prix: 11,
    condition: "Neuf",
    langue: "Français",
    stock: 5,
    description: "Mary Shelley explore les limites de la science et les conséquences de la création de la vie...",
    avis: genererAvisAleatoire()
  },
  {
    id: 27,
    titre: "Le Vieil Homme et la Mer",
    categorie: "Roman",
    image: "/Image/vieil-homme-et-la-mer.jpg",
    prix: 10,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "Ernest Hemingway raconte le combat d’un vieux pêcheur contre un énorme marlin...",
    avis: genererAvisAleatoire()
  },
  {
    id: 28,
    titre: "Les Trois Mousquetaires",
    categorie: "Aventure",
    image: "/Image/trois-mousquetaires.jpg",
    prix: 14,
    condition: "Occasion",
    langue: "Français",
    stock: 2,
    description: "Alexandre Dumas relate les exploits de d’Artagnan et de ses amis mousquetaires...",
    avis: genererAvisAleatoire()
  },
  {
    id: 29,
    titre: "Don Quichotte",
    categorie: "Roman",
    image: "/Image/don-quichotte.jpg",
    prix: 18,
    condition: "Occasion",
    langue: "Français",
    stock: 3,
    description: "Miguel de Cervantès raconte les aventures absurdes d’un chevalier idéaliste et de son fidèle écuyer...",
    avis: genererAvisAleatoire()
  },
  {
    id: 30,
    titre: "L’Alchimiste",
    categorie: "Roman",
    image: "/Image/alchimiste.jpg",
    prix: 12,
    condition: "Occasion",
    langue: "Français",
    stock: 4,
    description: "Paulo Coelho raconte le voyage initiatique d’un jeune berger à la recherche de son trésor personnel...",
    avis: genererAvisAleatoire()
  }




];
