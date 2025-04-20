import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// don't import lovable-tagger at the top

export default defineConfig(async ({ mode }) => {
  const { componentTagger } = await import("lovable-tagger"); // ✅ dynamic import

  return {
    base: "./",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      componentTagger(), // now this works fine
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
