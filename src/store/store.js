import { configureStore } from '@reduxjs/toolkit'
import { 
  petsReducer, 
  clientsReducer, 
  vetsReducer, 
  appointmentsReducer 
} from './slices'

/**
 * Redux Store - Estado global de la aplicación
 * 
 * Slices:
 * - pets: Mascotas (cargadas via GraphQL)
 * - clients: Clientes (cargados via REST)
 * - vets: Veterinarios (cargados via REST)
 * - appointments: Citas por fecha (cargadas via REST)
 * 
 * Todas las peticiones son interceptadas por MSW en el navegador.
 * NO hay servidor externo - todo funciona con `npm run dev`
 */
export const store = configureStore({
  reducer: {
    pets: petsReducer,
    clients: clientsReducer,
    vets: vetsReducer,
    appointments: appointmentsReducer
  },
  devTools: import.meta.env.DEV
})

// Tipos para TypeScript (opcional, útil para autocompletado)
/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */
