/**
 * MSW Server para tests unitarios (Node.js)
 * Usa los mismos handlers que el browser mock para consistencia
 */

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Crear server con handlers
export const server = setupServer(...handlers)
