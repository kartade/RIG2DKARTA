<p align="center"><img src="../assets/branding/Logo%20RIG2DKARTA%20d%E2%80%99animation%202D.png" alt="RIG2DKARTA logo" width="760"></p>

[Français](../README.md) · [Español](README.es.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# RIG2DKARTA — 2D Rigging Studio

> An open-source browser-based editor for rigging and animating layered 2D characters.

![Status](https://img.shields.io/badge/status-early%20prototype-orange) ![React](https://img.shields.io/badge/React-19-149eca) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PixiJS](https://img.shields.io/badge/PixiJS-8-purple)

## Overview

RIG2DKARTA is a **local-first** 2D editor. Its goal is to let artists and animators import transparent PNG layers, assemble a character, define joints and animate it using a timeline. Planned capabilities include skeletal rigging, mesh deformation, facial expressions and GIF/video export. **Not all of these features are implemented yet.**

## Current status — prototype 0.1

| Feature | Status |
| --- | --- |
| React interface and PixiJS canvas | Initial implementation; needs testing |
| Multiple PNG imports | Initial implementation |
| Layer selection and dragging | Initial implementation |
| Layer visibility and ordering | Initial implementation |
| Position, rotation, scale and pivot | Initial implementation |
| JSON project save/load with embedded images | Initial implementation |
| Bone hierarchy and joints | Planned |
| Timeline and keyframes | Planned |
| GIF and PNG sequence export | Planned |
| Mesh deformation | Future |
| AI-assisted rigging | Future |

> **Development notice:** The repository is experimental. A production build has succeeded on Vercel, but complete browser interaction testing has not yet been confirmed.

## Installation

### Requirements

- Recent Node.js (LTS recommended)
- npm
- Modern WebGL-capable browser

### Run locally

```bash
git clone https://github.com/kartade/RIG2DKARTA.git
cd RIG2DKARTA
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Using the prototype

1. Choose **Importer PNG** to select transparent PNG layers.
2. Select a layer in the list or on the canvas.
3. Drag it or edit coordinates in **Propriétés**.
4. Adjust rotation, scale and pivot coordinates.
5. Reorder or hide layers.
6. Choose **Enregistrer** to download `rig2d-project.json`.
7. Use **Ouvrir projet** to load the saved file.

The current JSON embeds image data and can become large. A ZIP project format with separate assets is under consideration. UI button labels are currently in French.

## Architecture

```text
RIG2DKARTA/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    └── style.css
```

**Current stack:** React, TypeScript, Vite and PixiJS. Zustand is a dependency but is not yet used.

**Target architecture:**

- **Editor UI:** panels, manipulation tools, inspector and timeline.
- **Rigging Core:** pivots, bones, hierarchies and local/global transforms.
- **Animation Engine:** keyframes, interpolation, looping and deterministic playback.
- **Renderer:** PixiJS rendering and interaction.
- **Project I/O:** portable project import/export.
- **Exporters:** PNG sequences, GIF and later video.

This separation is a future refactoring goal, not the current code structure.

## Roadmap

### Phase 1 — Layer editor
- [x] Initialize repository and interface
- [x] Add PNG import and transform properties
- [x] Add initial JSON project format
- [x] Confirm production compilation on Vercel
- [ ] Validate browser interactions
- [ ] Fix interactions and add undo/redo
- [ ] Add zoom, pan and visual guides

### Phase 2 — Skeletal rigging
- [ ] Create and edit bones
- [ ] Add parent-child relationships
- [ ] Display pivots and joints
- [ ] Separate rest pose from animated pose

### Phase 3 — Animation
- [ ] Multitrack timeline
- [ ] Keyframes and interpolation
- [ ] Playback, pause, looping and FPS
- [ ] Reusable animations

### Phase 4 — Export and reliability
- [ ] Portable project format
- [ ] PNG and PNG sequence export
- [ ] Transparent GIF export
- [ ] Automated tests and documented examples

### Future work
- Mesh deformation
- Inverse kinematics (IK)
- Facial expressions and lip sync
- Assisted image segmentation and rigging
- Video export
- Long-term research: automatic rigging from a single illustration, with manual correction

## Project principles

- **Local-first:** no account or server required to edit.
- **General-purpose:** no mandatory character format or art style.
- **Non-destructive:** preserve source images and editable transforms.
- **Portable:** prefer documented, exportable formats.
- **Extensible:** separate the animation engine from the UI.

## Validation example

The chibi character **Néa** is the first test case: import PNG parts, assemble a rest pose and create an articulated dance. A second character with different proportions will test generality.

## Contributing

Bug reports, usability feedback and architectural proposals are welcome via GitHub issues. Open an issue before proposing a major change.

## License

RIG2DKARTA is free and open-source software under the [GNU Affero General Public License v3.0 (AGPL-3.0-only)](../LICENSE). Commercial use, modification and redistribution are allowed, subject to the license obligations, including applicable source-sharing requirements for distributed or network-accessible modified versions.

Artwork created with RIG2DKARTA is **not automatically licensed under the software's AGPL**; rights depend on the artwork and its assets. Read [LICENSE](../LICENSE) for the full terms.

---

Built with one goal: **make 2D rigging more accessible in the browser.**