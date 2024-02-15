import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const babelPlugins = [];

if (process.env.MIGHTYMELD) {
  babelPlugins.push("@mightymeld/runtime/babel-plugin-mightymeld");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: babelPlugins,
      },
    }),
  ],
});
