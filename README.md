# Horaire IFAPME — PWA

PWA mobile-first pour l'horaire 2026–2027 de la classe **FCE - L15 1A - Décorateur d'intérieur**, au Centre IFAPME Namur-Brabant wallon - Wavre.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- React
- Service Worker natif pour le cache/offline
- Données structurées dans `data/schedule.json`
- Script d'import PDF dans `scripts/import-schedule.mjs`

## Fonctionnalités

- Accueil avec cours du jour et prochain cours
- Regroupement automatique des périodes du PDF en blocs lisibles (`08:30 — 12:10`, `13:00 — 16:30`)
- Calendrier mensuel, sans vue semaine
- Détail d'un jour
- Recherche par matière, code ou formateur
- Détails repliables
- PWA installable avec manifest et service worker
- Cache des ressources consultées pour une utilisation hors connexion
- Rappels 15 minutes avant un cours lorsque les notifications sont autorisées et que le navigateur peut exécuter la planification

## Installation

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Déploiement Vercel

Pousser le dossier sur GitHub puis importer le dépôt dans Vercel. Aucun serveur ou base de données n'est nécessaire.

## Mise à jour du PDF

Le PDF placé dans `source/horaire_classe.pdf` sert de référence. Pour une nouvelle édition :

```bash
npm run import:schedule -- ./source/horaire_classe.pdf
```

Le script produit `data/schedule.json`. L'interface ne contient pas les données de cours en dur.

## Notifications

Les notifications web ont des limitations propres aux navigateurs et systèmes. Cette version demande la permission et programme le prochain rappel côté navigateur. Elle ne garantit pas un réveil en arrière-plan sur tous les appareils, en particulier sur certaines configurations iOS. Une solution Web Push complète nécessiterait ensuite un service de push et un stockage des abonnements.

## Données de la version fournie

Les données initiales ont été structurées à partir du PDF fourni avec l'application. Le PDF indique notamment 32 journées de cours, du 18 septembre 2026 au 28 mai 2027, et 11 matières.
