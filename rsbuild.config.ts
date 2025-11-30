import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  output: {
    assetPrefix: '/react-banco-dinero-casa/',  // 👈 Ruta del repositorio
    cleanDistPath: true,
  },
});
