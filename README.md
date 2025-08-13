# ReLivre – Plateforme d’achat intégrant une recherche LLM

## Présentation
ReLivre est une plateforme e-commerce moderne dédiée à l’achat de livres d’occasion.  
Elle intègre une barre de recherche avancée propulsée par un LLM (Large Language Model), capable de comprendre des requêtes en langage naturel pour proposer les résultats les plus pertinents.

**Statut actuel** : Ce projet est un **MVP** destiné à tester l’intérêt des utilisateurs et à recueillir des retours réels sur l’utilisation d’une recherche assistée par LLM.  
L’objectif est de valider l’expérience, observer les comportements de recherche et identifier les points d’amélioration avant la version complète.

## Objectifs du MVP
- Évaluer la pertinence des résultats fournis par la recherche LLM.
- Observer la manière dont les utilisateurs formulent leurs requêtes.
- Recueillir des feedbacks pour orienter la prochaine phase de développement.

## Fonctionnalités
- Recherche intelligente via LLM.
- Catalogue filtrable par catégories, prix et état.
- Panier interactif avec gestion complète des commandes.
- Interface responsive (mobile et desktop).

## Technologies
- **Front-end** : React, TypeScript, Material UI
- **Gestion d’état** : React Context API
- **Recherche LLM** : OpenAI API


## Installation

1. Cloner le dépôt
bash
git clone https://github.com/<utilisateur>/<nom-du-repo>.git
cd <nom-du-repo>

2. Installer les dépendances
bash
npm install

3. Configurer les variables d’environnement
Créer un fichier .env à partir du modèle .env.example :

env
VITE_API_BASE=https://api.exemple.com
VITE_OPENAI_KEY=ta_clef_api

4. Lancer le projet en développement
bash
npm run dev

5. Construire la version de production
bash
npm run build

6. Prévisualiser la production
bash
npm run preview

📂 Structure du projet
src/
├── components/ # Composants réutilisables
├── contexts/ # State management (Context API)
├── data/ # Données statiques ou mock
├── pages/ # Pages principales
├── styles/ # Styles globaux
├── utils/ # Fonctions utilitaires
└── App.tsx # Point d’entrée

## 📬 Contact

For questions, suggestions, or collaboration opportunities, feel free to reach out:

Email:ray 191714@gmail.com
