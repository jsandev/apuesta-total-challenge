import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "at-challenge",
      filename: "remoteEntry.js",
      remotes: {
        microfront1: "http://localhost:3001/assets/remoteEntry.js",
        microfront2: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router"],
    }),
  ],
  server: { port: 3000 },
  build: {
    target: "esnext",
  },
});
