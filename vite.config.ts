import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.1", // aceita conexões de localhost e 127.0.0.1
    port: 5173,
    strictPort: false,
    cors: true,
    open: false,
    watch: {
      usePolling: true, // evita cache travado em Windows/WLS
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["fsevents"], // evita erros no Windows
  },
}));
