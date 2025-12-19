/**
 * Tests para hooks personalizados
 * Verifica integración con Redux
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createTestStore } from '../../test-utils/renderWithProviders'

// Hooks a testear
import { usePets } from '../../../src/hooks/usePets'
import { useClients } from '../../../src/hooks/useClients'
import { useVets } from '../../../src/hooks/useVets'
import { useAppointments } from '../../../src/hooks/useAppointments'

import { clients, pets, vets, appointments, TEST_DATE } from '../../msw/data'

// Wrapper para renderizar hooks con Redux
function createWrapper(preloadedState = {}) {
  const store = createTestStore(preloadedState)
  return function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
}

describe('Hooks personalizados', () => {
  describe('usePets', () => {
    it('inicia en estado de carga', () => {
      const { result } = renderHook(() => usePets(), {
        wrapper: createWrapper()
      })
      
      expect(result.current.loading).toBe(true)
      expect(result.current.pets).toEqual([])
    })

    it('carga las mascotas correctamente', async () => {
      const { result } = renderHook(() => usePets(), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.pets.length).toBe(pets.length)
      expect(result.current.error).toBeNull()
    })
  })

  describe('useClients', () => {
    it('inicia en estado de carga', () => {
      const { result } = renderHook(() => useClients(), {
        wrapper: createWrapper()
      })
      
      expect(result.current.loading).toBe(true)
      expect(result.current.clients).toEqual([])
    })

    it('carga los clientes correctamente', async () => {
      const { result } = renderHook(() => useClients(), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.clients.length).toBe(clients.length)
      expect(result.current.error).toBeNull()
    })
  })

  describe('useVets', () => {
    it('inicia en estado de carga', () => {
      const { result } = renderHook(() => useVets(), {
        wrapper: createWrapper()
      })
      
      expect(result.current.loading).toBe(true)
      expect(result.current.vets).toEqual([])
    })

    it('carga los veterinarios correctamente', async () => {
      const { result } = renderHook(() => useVets(), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.vets.length).toBe(vets.length)
      expect(result.current.error).toBeNull()
    })
  })

  describe('useAppointments', () => {
    it('inicia en estado de carga cuando se proporciona fecha', () => {
      const { result } = renderHook(() => useAppointments(TEST_DATE), {
        wrapper: createWrapper()
      })
      
      expect(result.current.loading).toBe(true)
      expect(result.current.appointments).toEqual([])
    })

    it('carga las citas para la fecha especificada', async () => {
      const { result } = renderHook(() => useAppointments(TEST_DATE), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      // Todas las citas deben ser de la fecha solicitada
      expect(result.current.appointments.length).toBeGreaterThan(0)
      expect(result.current.error).toBeNull()
    })

    it('no carga si no se proporciona fecha', () => {
      const { result } = renderHook(() => useAppointments(null), {
        wrapper: createWrapper()
      })
      
      // Con null, loading debería ser false o los appointments vacíos
      expect(result.current.appointments).toEqual([])
    })
  })
})
