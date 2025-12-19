/**
 * Tests para Redux Slices
 * Verifica (criterio 1):
 * - Initial state de cada slice
 * - Reducers funcionan correctamente
 */

import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'

// Importar reducers
import petsReducer, { loadPets } from '../../../src/store/slices/petsSlice'
import clientsReducer, { loadClients } from '../../../src/store/slices/clientsSlice'
import vetsReducer, { loadVets } from '../../../src/store/slices/vetsSlice'
import appointmentsReducer, { loadAppointments, resetAppointments } from '../../../src/store/slices/appointmentsSlice'

describe('Redux Slices', () => {
  describe('petsSlice', () => {
    it('tiene el estado inicial correcto', () => {
      const state = petsReducer(undefined, { type: 'unknown' })
      
      expect(state).toEqual({
        items: [],
        status: 'idle',
        error: null
      })
    })

    it('cambia status a loading cuando se dispara loadPets.pending', () => {
      const state = petsReducer(
        { items: [], status: 'idle', error: null },
        { type: loadPets.pending.type }
      )
      
      expect(state.status).toBe('loading')
      expect(state.error).toBeNull()
    })

    it('actualiza items cuando loadPets.fulfilled', () => {
      const mockPets = [{ id: 'p1', name: 'Max' }]
      const state = petsReducer(
        { items: [], status: 'loading', error: null },
        { type: loadPets.fulfilled.type, payload: mockPets }
      )
      
      expect(state.status).toBe('succeeded')
      expect(state.items).toEqual(mockPets)
    })

    it('guarda error cuando loadPets.rejected', () => {
      const state = petsReducer(
        { items: [], status: 'loading', error: null },
        { type: loadPets.rejected.type, payload: 'Error de red' }
      )
      
      expect(state.status).toBe('failed')
      expect(state.error).toBe('Error de red')
    })
  })

  describe('clientsSlice', () => {
    it('tiene el estado inicial correcto', () => {
      const state = clientsReducer(undefined, { type: 'unknown' })
      
      expect(state).toEqual({
        items: [],
        status: 'idle',
        error: null
      })
    })

    it('cambia status a loading cuando se dispara loadClients.pending', () => {
      const state = clientsReducer(
        { items: [], status: 'idle', error: null },
        { type: loadClients.pending.type }
      )
      
      expect(state.status).toBe('loading')
    })

    it('actualiza items cuando loadClients.fulfilled', () => {
      const mockClients = [{ id: 'c1', name: 'María' }]
      const state = clientsReducer(
        { items: [], status: 'loading', error: null },
        { type: loadClients.fulfilled.type, payload: mockClients }
      )
      
      expect(state.status).toBe('succeeded')
      expect(state.items).toEqual(mockClients)
    })
  })

  describe('vetsSlice', () => {
    it('tiene el estado inicial correcto', () => {
      const state = vetsReducer(undefined, { type: 'unknown' })
      
      expect(state).toEqual({
        items: [],
        status: 'idle',
        error: null
      })
    })

    it('cambia status a loading cuando se dispara loadVets.pending', () => {
      const state = vetsReducer(
        { items: [], status: 'idle', error: null },
        { type: loadVets.pending.type }
      )
      
      expect(state.status).toBe('loading')
    })

    it('actualiza items cuando loadVets.fulfilled', () => {
      const mockVets = [{ id: 'v1', name: 'Dr. Muñoz' }]
      const state = vetsReducer(
        { items: [], status: 'loading', error: null },
        { type: loadVets.fulfilled.type, payload: mockVets }
      )
      
      expect(state.status).toBe('succeeded')
      expect(state.items).toEqual(mockVets)
    })
  })

  describe('appointmentsSlice', () => {
    it('tiene el estado inicial correcto', () => {
      const state = appointmentsReducer(undefined, { type: 'unknown' })
      
      expect(state).toEqual({
        items: [],
        currentDate: null,
        status: 'idle',
        error: null
      })
    })

    it('cambia status a loading cuando se dispara loadAppointments.pending', () => {
      const state = appointmentsReducer(
        { items: [], currentDate: null, status: 'idle', error: null },
        { type: loadAppointments.pending.type }
      )
      
      expect(state.status).toBe('loading')
    })

    it('actualiza items y currentDate cuando loadAppointments.fulfilled', () => {
      const mockAppointments = [{ id: 'a1', time: '08:00' }]
      const state = appointmentsReducer(
        { items: [], currentDate: null, status: 'loading', error: null },
        { 
          type: loadAppointments.fulfilled.type, 
          payload: { date: '2025-12-18', appointments: mockAppointments }
        }
      )
      
      expect(state.status).toBe('succeeded')
      expect(state.items).toEqual(mockAppointments)
      expect(state.currentDate).toBe('2025-12-18')
    })

    it('resetAppointments limpia el estado', () => {
      const state = appointmentsReducer(
        { 
          items: [{ id: 'a1' }], 
          currentDate: '2025-12-18', 
          status: 'succeeded', 
          error: null 
        },
        resetAppointments()
      )
      
      expect(state.items).toEqual([])
      expect(state.currentDate).toBeNull()
      expect(state.status).toBe('idle')
    })
  })

  describe('Store integrado', () => {
    it('se puede crear un store con todos los reducers', () => {
      const store = configureStore({
        reducer: {
          pets: petsReducer,
          clients: clientsReducer,
          vets: vetsReducer,
          appointments: appointmentsReducer
        }
      })
      
      const state = store.getState()
      
      expect(state.pets.status).toBe('idle')
      expect(state.clients.status).toBe('idle')
      expect(state.vets.status).toBe('idle')
      expect(state.appointments.status).toBe('idle')
    })
  })
})
