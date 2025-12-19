import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment para tests de React con DOM
    environment: 'jsdom',
    
    // Setup files para configurar matchers y MSW
    setupFiles: ['./tests/setup/vitest.setup.js'],
    
    // Incluir archivos de test
    include: ['tests/**/*.{test,spec}.{js,jsx}'],
    
    // Globals para describe, it, expect sin imports
    globals: true,
    
    // CSS modules mock (evita errores con Tailwind)
    css: false,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage-unit',
      reporter: ['text', 'html', 'lcov'],
      // Archivos a cubrir
      include: ['src/**/*.{js,jsx}'],
      // Excluir archivos que no aportan cobertura útil
      exclude: [
        'src/main.jsx',           // Entry point
        'src/index.css',          // Estilos
        'src/mocks/**',           // MSW mocks (para browser)
        'src/api/types.js',       // Solo JSDoc types
        'node_modules/**',
      ],
      // Umbrales de cobertura
      thresholds: {
        global: {
          lines: 90,
          statements: 90,
          functions: 90,
          branches: 80
        }
      }
    }
  },
  // Resolver alias si es necesario
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
