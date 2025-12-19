import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import istanbul from 'vite-plugin-istanbul'

// Nombre del repo para GitHub Pages (Project Pages)
const REPO_NAME = 'cuidado-animal-testing-jest-cypress'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  
  return {
    // Base URL: '/' en dev, '/<repo>/' en producción para GitHub Pages
    base: isProd ? `/${REPO_NAME}/` : '/',
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
  }
})
