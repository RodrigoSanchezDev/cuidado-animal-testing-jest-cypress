/**
 * Test Utilities
 * Wrapper para renderizar componentes con todos los providers necesarios
 */

import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// Importar reducers reales
import { 
  petsReducer, 
  clientsReducer, 
  vetsReducer, 
  appointmentsReducer 
} from '../../src/store/slices'

/**
 * Crea un store de Redux para tests
 * Usa los reducers reales pero con estado inicial limpio
 * 
 * @param {Object} preloadedState - Estado inicial opcional
 */
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      pets: petsReducer,
      clients: clientsReducer,
      vets: vetsReducer,
      appointments: appointmentsReducer
    },
    preloadedState,
    // Deshabilitar serializable check para tests (más rápido)
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  })
}

/**
 * Renderiza un componente con todos los providers necesarios
 * 
 * @param {React.ReactElement} ui - Componente a renderizar
 * @param {Object} options - Opciones de renderizado
 * @param {string[]} options.initialEntries - Rutas iniciales para MemoryRouter
 * @param {Object} options.preloadedState - Estado inicial de Redux
 * @param {Object} options.store - Store de Redux (si se pasa, se usa en vez de crear uno)
 */
export function renderWithProviders(
  ui,
  {
    initialEntries = ['/'],
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) {
  // Wrapper que incluye todos los providers
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </Provider>
    )
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

/**
 * Renderiza solo con Router (sin Redux)
 * Útil para componentes que no usan Redux
 */
export function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  )
}

/**
 * Renderiza solo con Redux (sin Router)
 * Útil para tests de hooks/slices
 */
export function renderWithRedux(ui, { preloadedState = {}, store = createTestStore(preloadedState) } = {}) {
  return {
    store,
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>
    )
  }
}

// Re-exportar todo de @testing-library/react para conveniencia
export * from '@testing-library/react'

// Export por defecto
export { renderWithProviders as render }
