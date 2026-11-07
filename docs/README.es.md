<p align="center"><img src="../assets/branding/Logo%20RIG2DKARTA%20d%E2%80%99animation%202D.png" alt="RIG2DKARTA logo" width="760"></p>

[Français](../README.md) · [Español](README.es.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# RIG2DKARTA — Estudio de rigging y animación 2D

> Editor web de código abierto para articular y animar personajes 2D compuestos por capas.

![Estado](https://img.shields.io/badge/estado-prototipo%20inicial-orange) ![React](https://img.shields.io/badge/React-19-149eca) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PixiJS](https://img.shields.io/badge/PixiJS-8-purple)

## Presentación

RIG2DKARTA es un editor 2D **local-first** que funciona en el navegador. Su objetivo es permitir importar capas PNG transparentes, montar personajes, definir articulaciones y animarlos en una línea de tiempo. En el futuro incorporará esqueletos, deformación de mallas, expresiones faciales y exportación GIF o vídeo. **Estas funciones todavía no están todas implementadas.**

## Estado actual — prototipo 0.1

| Función | Estado |
| --- | --- |
| Interfaz React y lienzo PixiJS | Implementación inicial; pendiente de pruebas |
| Importación de varios PNG | Implementación inicial |
| Selección y desplazamiento de capas | Implementación inicial |
| Visibilidad y orden de capas | Implementación inicial |
| Posición, rotación, escala y pivote | Implementación inicial |
| Guardar y abrir JSON con imágenes integradas | Implementación inicial |
| Jerarquía de huesos y articulaciones | Previsto |
| Línea de tiempo y fotogramas clave | Previsto |
| Exportación GIF y secuencia PNG | Previsto |
| Deformación de mallas | Futuro |
| Rigging asistido por IA | Futuro |

> **Aviso:** proyecto experimental. La compilación de producción se ha completado en Vercel, pero todavía no se han validado todas las interacciones del navegador.

## Instalación

### Requisitos
- Node.js reciente (se recomienda LTS)
- npm
- Navegador moderno compatible con WebGL

### Inicio
```bash
git clone https://github.com/kartade/RIG2DKARTA.git
cd RIG2DKARTA
npm install
npm run dev
```

Abra la dirección local indicada por Vite (normalmente `http://localhost:5173`).

### Compilación de producción
```bash
npm run build
npm run preview
```

## Uso del prototipo

1. Pulse **Importer PNG** y seleccione capas transparentes.
2. Seleccione una capa en la lista o en el lienzo.
3. Arrástrela o modifique sus coordenadas en **Propriétés**.
4. Ajuste la rotación, la escala y el pivote.
5. Cambie el orden o la visibilidad de las capas.
6. Pulse **Enregistrer** para guardar `rig2d-project.json`.
7. Use **Ouvrir projet** para abrirlo.

Los botones de la interfaz siguen en francés. Actualmente el JSON contiene las imágenes incrustadas y puede ocupar mucho espacio; se contempla un formato ZIP con recursos separados.

## Arquitectura

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

**Tecnologías actuales:** React, TypeScript, Vite y PixiJS. Zustand está instalado, pero todavía no se utiliza.

**Arquitectura prevista:**
- **Editor UI:** paneles, herramientas, inspector y línea de tiempo.
- **Rigging Core:** pivotes, huesos, jerarquías y transformaciones.
- **Animation Engine:** fotogramas clave, interpolación, bucles y reproducción determinista.
- **Renderer:** renderizado e interacción con PixiJS.
- **Project I/O:** importación y exportación de proyectos portátiles.
- **Exporters:** secuencias PNG, GIF y posteriormente vídeo.

Esta separación es un objetivo de refactorización, no la estructura actual del código.

## Hoja de ruta

### Fase 1 — Editor de capas
- [x] Crear el repositorio y la interfaz
- [x] Añadir importación PNG y transformaciones
- [x] Añadir un formato JSON inicial
- [x] Compilar la versión de producción en Vercel
- [ ] Verificar las interacciones del navegador
- [ ] Corregir interacciones y añadir deshacer/rehacer
- [ ] Añadir zoom, desplazamiento y guías

### Fase 2 — Rigging esquelético
- [ ] Crear y editar huesos
- [ ] Definir relaciones padre-hijo
- [ ] Visualizar pivotes y articulaciones
- [ ] Separar la pose de reposo de la animada

### Fase 3 — Animación
- [ ] Línea de tiempo multipista
- [ ] Fotogramas clave e interpolación
- [ ] Reproducción, pausa, bucle y FPS
- [ ] Animaciones reutilizables

### Fase 4 — Exportación y estabilidad
- [ ] Formato de proyecto portátil
- [ ] Exportación PNG y secuencias PNG
- [ ] Exportación GIF transparente
- [ ] Pruebas automatizadas y ejemplos

### Evoluciones futuras
- Deformación de mallas
- Cinemática inversa (IK)
- Expresiones faciales y sincronización labial
- Asistencia al recorte y al rigging
- Exportación de vídeo
- Investigación de rigging automático a partir de una sola ilustración

## Principios

- **Local-first:** edición sin cuenta ni servidor.
- **Generalista:** sin formato o estilo obligatorio.
- **No destructivo:** conservar las imágenes y transformaciones editables.
- **Portable:** preferir formatos documentados.
- **Extensible:** separar el motor de animación de la interfaz.

## Caso de prueba

El personaje chibi **Néa** sirve para importar sus partes PNG, reconstruir la pose de reposo y crear un baile articulado. Otro personaje con proporciones distintas permitirá comprobar que la herramienta es generalista.

## Contribuciones

Se agradecen informes de errores, sugerencias de usabilidad y propuestas técnicas mediante GitHub Issues. Abra una incidencia antes de realizar cambios importantes.

## Licencia

RIG2DKARTA es software libre bajo la [GNU Affero General Public License v3.0 (AGPL-3.0-only)](../LICENSE). Se permiten el uso comercial, la modificación y la redistribución, respetando las obligaciones de la licencia, incluidas las relativas al código fuente de ciertas versiones modificadas distribuidas o accesibles por red.

Las obras creadas con RIG2DKARTA **no quedan automáticamente sujetas a la AGPL del programa**. Sus derechos dependen de los contenidos utilizados. Consulte [LICENSE](../LICENSE).

---

**Nuestro objetivo: hacer el rigging 2D más accesible desde el navegador.**