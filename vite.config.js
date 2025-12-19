import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import istanbul from 'vite-plugin-istanbul'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'cypress', '**/*.test.*', '**/*.spec.*'],
      extension: ['.js', '.jsx'],
      requireEnv: false,
      cypress: true,
    }),
  ],
})
