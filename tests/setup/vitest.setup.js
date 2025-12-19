/**
 * Vitest Setup File
 * - Configura MSW server para tests Node
 * - Importa matchers de @testing-library/jest-dom
 * - Limpia estado entre tests
 */

import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { server } from '../msw/server'

// Extender expect con matchers de jest-dom
expect.extend(matchers)

// ============================================
// MSW SERVER LIFECYCLE
// ============================================

// Iniciar MSW server antes de todos los tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' })
})

// Reset handlers después de cada test (para tests que sobrescriben handlers)
afterEach(() => {
  server.resetHandlers()
  // Cleanup del DOM de React
  cleanup()
})

// Cerrar server después de todos los tests
afterAll(() => {
  server.close()
})

// ============================================
// MOCKS GLOBALES
// ============================================

// Mock de import.meta.env para Vite
vi.stubGlobal('import.meta', {
  env: {
    DEV: true,
    PROD: false,
    MODE: 'test'
  }
})

// Mock de console para reducir ruido en tests (opcional)
// vi.spyOn(console, 'log').mockImplementation(() => {})

// Mock de IntersectionObserver (algunos componentes podrían usarlo)
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  takeRecords: vi.fn(() => [])
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// Mock de ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn()
}))
vi.stubGlobal('ResizeObserver', ResizeObserverMock)

// Mock de window.matchMedia (para responsive queries)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
