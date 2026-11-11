import { defineConfig } from "vite";

// Proxy de développement vers le Studio de voix (réseau local de la maison).
// Évite les erreurs CORS d'un fetch() direct depuis le navigateur.
// Adresse réelle configurable via la variable d'env STUDIO_VOIX_URL (sinon valeur par défaut).
const STUDIO_VOIX_URL = process.env.STUDIO_VOIX_URL || "http://192.168.1.53:8800";

export default defineConfig({
  server: {
    proxy: {
      "/studio-voix": {
        target: STUDIO_VOIX_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/studio-voix/, ""),
      },
    },
  },
});
