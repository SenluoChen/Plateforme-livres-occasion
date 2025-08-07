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
};

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
    description: "Après avoir purgé dix-neuf années de bagne pour avoir volé un morceau de pain, Jean Valjean est relâché mais rejeté par la société. L’évêque Myriel lui offre un acte de bonté qui change sa vie. Traqué par l’impitoyable inspecteur Javert, symbole de la justice rigide, Valjean refait sa vie sous une nouvelle identité, aide les plus démunis et trouve l’amour d’une famille. Ce chef-d’œuvre de Victor Hugo explore la misère, la rédemption, la justice sociale et la puissance de l’amour face à l’adversité."
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
    description: "Lors de sa quatrième année à Poudlard, Harry est mystérieusement inscrit au Tournoi des Trois Sorciers, une compétition magique mortelle. Entre dragons, épreuves sous-marines et labyrinthes ensorcelés, il doit affronter ses peurs et se dépasser. Mais la finale vire au drame : Voldemort revient à la vie et Cédric Diggory est tué. Ce tome marque un tournant sombre dans la saga, mêlant suspense, amitié, loyauté et la découverte brutale de la noirceur du monde magique."
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
    description: "Un aviateur échoué dans le désert du Sahara rencontre un petit garçon venu de l’astéroïde B-612. En racontant ses voyages, le Petit Prince décrit ses rencontres avec un roi, un vaniteux, un buveur, un businessman et un allumeur de réverbères, chacun représentant un travers du monde adulte. À travers son amour pour une rose unique, il livre une réflexion poétique sur l’amitié, l’amour, la solitude et l’importance de voir avec le cœur. Un conte intemporel d’Antoine de Saint-Exupéry."
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
    description: "Cet ouvrage pédagogique introduit les concepts fondamentaux de la physique quantique : dualité onde-corpuscule, superposition des états, principe d’incertitude et rôle de l’observateur. À travers des explications claires et illustrées, il rend accessibles les idées clés de cette science fascinante qui régit le monde subatomique. Idéal pour les étudiants et les passionnés de sciences qui souhaitent comprendre l’essence de la mécanique quantique."
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
    description: "Dans la ville d’Oran, une épidémie de peste se déclare, isolant ses habitants du reste du monde. À travers le regard du docteur Rieux et d’autres personnages, Albert Camus explore la peur, la solidarité, l’absurdité de la condition humaine et la résistance face à l’inévitable. Ce roman allégorique, écrit en 1947, résonne comme une réflexion sur la guerre, la souffrance et la dignité humaine."
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
    description: "Meursault, un employé d’Alger, mène une vie détachée et indifférente. Le décès de sa mère ne suscite chez lui aucune émotion apparente. Plus tard, il commet un meurtre absurde sur une plage. Son procès met en lumière son refus des conventions sociales. À travers ce personnage, Albert Camus illustre la philosophie de l’absurde et questionne le sens de la vie."
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
    description: "Yuval Noah Harari retrace l’histoire de l’humanité, depuis l’émergence de l’Homo sapiens en Afrique jusqu’aux révolutions agricole, industrielle et numérique. L’ouvrage analyse comment nos mythes, religions et systèmes politiques ont façonné nos sociétés, et s’interroge sur l’avenir de notre espèce face aux avancées technologiques et à l’intelligence artificielle."
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
    description: "Carl Sagan entraîne le lecteur dans un voyage à travers l’univers, mêlant astronomie, biologie, histoire et philosophie. De la naissance des étoiles à l’évolution de la vie sur Terre, il célèbre la curiosité humaine et plaide pour une meilleure compréhension scientifique afin de protéger notre planète et notre avenir."
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
    description: "Lorsque le conservateur du Louvre est assassiné, Robert Langdon, professeur en symbologie, se retrouve entraîné dans une enquête qui révèle des secrets cachés depuis des siècles. Entre codes mystérieux, œuvres d’art et sociétés secrètes, ce thriller de Dan Brown mêle art, religion et suspense dans une chasse au trésor à travers l’Europe."
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
    description: "Ce traité militaire attribué à Sun Tzu, stratège chinois du VIe siècle av. J.-C., expose des principes intemporels sur la guerre, la stratégie et le leadership. Au-delà du champ de bataille, ses enseignements s’appliquent à la gestion, à la négociation et au développement personnel."
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
    description: "Dans le Paris médiéval, Quasimodo, le sonneur bossu de Notre-Dame, aime en secret la belle bohémienne Esmeralda. Autour d’eux gravitent le prêtre Frollo, déchiré par sa passion, et le capitaine Phoebus. Victor Hugo signe un drame romantique qui dénonce l’injustice sociale et célèbre la majesté de l’architecture gothique."
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
    description: "Victime d’un complot, Edmond Dantès est emprisonné au château d’If. Après quatorze ans de captivité, il s’évade, découvre un fabuleux trésor et devient le mystérieux Comte de Monte-Cristo. Animé par la vengeance, il ourdit un plan pour punir ses ennemis, mais se confronte aux limites de la justice et du pardon."
  },
  {
    id: 13,
    titre: "Le Seigneur des Anneaux : La Communauté de l’Anneau",
    categorie: "Fantasy",
    image: "/Image/seigneur-des-anneaux.jpg",
    prix: 24,
    condition: "Occasion",
    langue: "Français",
    stock: 4,
    description: "Frodon Sacquet hérite d’un anneau magique forgé par Sauron, le Seigneur des Ténèbres. Pour empêcher son retour, il entreprend un périlleux voyage vers la montagne du Destin, accompagné de la Communauté de l’Anneau. Ce premier tome de l’épopée de J.R.R. Tolkien mêle aventure, amitié et lutte épique entre le bien et le mal."
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
    description: "Le professeur Lidenbrock découvre un manuscrit ancien révélant un passage vers le centre de la Terre. Accompagné de son neveu Axel et du guide Hans, il s’aventure dans un voyage souterrain extraordinaire, rencontrant mers intérieures, créatures préhistoriques et paysages fantastiques dans ce roman d’aventure de Jules Verne."
  }
];
