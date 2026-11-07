# RIG2D — 2D Rigging Studio

> Éditeur web de rigging 2D généraliste, conçu pour transformer des illustrations découpées en personnages articulés et animables.

![Status](https://img.shields.io/badge/status-early%20prototype-orange)
![React](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PixiJS](https://img.shields.io/badge/PixiJS-8-purple)

## Présentation

**RIG2D** est un projet d'éditeur 2D **local-first**, accessible dans un navigateur. Il vise à permettre aux illustrateurs, créateurs de mascottes et animateurs d'importer des calques PNG, d'assembler un personnage, de définir des articulations, puis de créer des animations sur une timeline.

À terme, le projet vise un rigging squelettique, des déformations de maillage, des expressions faciales et des exports GIF ou vidéo. **Ces fonctions ne sont pas encore toutes implémentées.**

## État actuel — prototype 0.1

| Fonctionnalité | État |
| --- | --- |
| Interface React et canvas PixiJS | Implémentation initiale, à tester |
| Import de plusieurs PNG | Implémentation initiale |
| Sélection et déplacement des calques | Implémentation initiale |
| Affichage, masquage et ordre des calques | Implémentation initiale |
| Position, rotation, échelle, pivot | Implémentation initiale |
| Sauvegarde / ouverture JSON avec images intégrées | Implémentation initiale |
| Hiérarchie osseuse et articulations | Prévu |
| Timeline et keyframes | Prévu |
| Export GIF et séquence PNG | Prévu |
| Déformations de maillage | Évolution future |
| Rigging assisté par IA | Évolution future |

> **Attention :** ce dépôt est en phase de développement. Le code initial n'a pas encore fait l'objet d'une validation complète par compilation et tests fonctionnels. Certaines interactions peuvent nécessiter des corrections.

## Installation

### Prérequis

- Node.js récent (version LTS recommandée)
- npm
- Navigateur moderne compatible WebGL

### Démarrage

```bash
git clone https://github.com/kartade/RIG2D.git
cd RIG2D
npm install
npm run dev
```

Ouvrez l'URL locale affichée par Vite (habituellement `http://localhost:5173`).

### Compilation de production

```bash
npm run build
npm run preview
```

## Utilisation du prototype

1. Cliquez sur **Importer PNG** et sélectionnez plusieurs calques transparents.
2. Sélectionnez un calque dans la liste ou directement sur le canvas.
3. Déplacez-le à la souris ou modifiez ses coordonnées dans le panneau **Propriétés**.
4. Ajustez la rotation, l'échelle et les coordonnées du pivot.
5. Réordonnez ou masquez les calques selon les besoins.
6. Cliquez sur **Enregistrer** pour exporter un fichier `rig2d-project.json`.
7. Utilisez **Ouvrir projet** pour réimporter ce fichier.

Les images sont actuellement encodées dans le JSON : les fichiers peuvent donc devenir volumineux. Un format de projet ZIP avec manifeste et ressources séparées est envisagé.

## Architecture

```text
RIG2D/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    └── style.css
```

**Stack actuelle :** React, TypeScript, Vite, PixiJS. Zustand figure dans les dépendances mais n'est pas encore exploité dans l'éditeur initial.

**Architecture cible :**

- **Editor UI** — panneaux, outils de manipulation, inspecteur, timeline.
- **Rigging Core** — pivots, os, hiérarchies et transformations locales/globales.
- **Animation Engine** — keyframes, interpolation, boucles et lecture déterministe.
- **Renderer** — affichage et interactions PixiJS.
- **Project I/O** — import/export de projets portables.
- **Exporters** — séquences PNG, GIF, puis vidéo.

Cette séparation est un objectif de refactorisation, pas l'organisation actuelle du code.

## Roadmap

### Phase 1 — Éditeur de calques
- [x] Initialiser le dépôt et l'interface
- [x] Ajouter l'import PNG et les propriétés de transformation
- [x] Ajouter un format JSON initial
- [ ] Valider la compilation et le rendu navigateur
- [ ] Corriger les interactions et ajouter Undo/Redo
- [ ] Ajouter zoom, panoramique et guides visuels

### Phase 2 — Rigging squelettique
- [ ] Créer et éditer des os
- [ ] Définir des relations parent-enfant
- [ ] Visualiser les pivots et les articulations
- [ ] Conserver une pose de repos distincte de la pose animée

### Phase 3 — Animation
- [ ] Timeline multipiste
- [ ] Images clés et interpolation
- [ ] Lecture, pause, boucle et réglage FPS
- [ ] Animations réutilisables

### Phase 4 — Export et fiabilisation
- [ ] Format de projet portable
- [ ] Export PNG et séquence PNG
- [ ] Export GIF transparent
- [ ] Tests automatisés et exemples documentés

### Évolutions ultérieures
- Déformation de maillage
- Cinématique inverse (IK)
- Expressions faciales et synchronisation labiale
- Assistance au découpage et au rigging
- Exports vidéo

## Principes du projet

- **Local-first :** pas de compte ni de serveur requis pour éditer un personnage.
- **Généraliste :** aucun format de personnage ou style graphique imposé.
- **Non destructif :** préserver les images sources et les transformations modifiables.
- **Portable :** favoriser des formats documentés et exportables.
- **Extensible :** dissocier le moteur d'animation de l'interface.

## Exemple de validation

Le personnage chibi **Néa** sert de premier cas d'essai : importer ses éléments PNG, reconstruire sa pose de repos, puis créer une danse articulée. Un second personnage de morphologie différente servira à vérifier que RIG2D reste généraliste.

## Contribution

Le projet est encore jeune. Les retours sur l'ergonomie, les bugs et les propositions d'architecture sont bienvenus via les issues GitHub.

Avant de proposer une modification importante, ouvrez une issue décrivant le besoin et le comportement attendu.

## Licence

**RIG2D est un logiciel libre et open source sous licence [GNU Affero General Public License v3.0 (AGPL-3.0-only)](LICENSE).**

Cette licence autorise l'utilisation, la modification, la redistribution et l'exploitation commerciale de RIG2D. Elle impose notamment de conserver les mentions de licence et de fournir le code source correspondant dans les situations prévues par l'AGPL, y compris pour certaines versions modifiées utilisées via un réseau.

Les œuvres créées avec RIG2D ne sont pas automatiquement soumises à l'AGPL du logiciel : leurs droits dépendent de leurs propres contenus et licences.

Pour les conditions juridiques complètes, consultez le fichier [LICENSE](LICENSE).

---

Développé progressivement autour d'une ambition : **rendre le rigging 2D plus accessible, directement dans le navigateur.**
