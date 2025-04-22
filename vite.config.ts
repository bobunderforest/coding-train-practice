import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/coding-train-practice',
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    checker({
      typescript: { tsconfigPath: './tsconfig.app.json' },
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint',
      },
    }),
  ],
  server: { port: 3000 },
})
