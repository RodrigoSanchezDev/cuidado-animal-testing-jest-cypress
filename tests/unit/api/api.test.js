/**
 * Tests para funciones de API
 * Aumenta cobertura de src/api/*
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchClients, fetchPets, fetchVets, fetchAppointments } from '../../../src/api/rest'
import { fetchPetsGraphQL, fetchVetsGraphQL, fetchClientsGraphQL, fetchAppointmentsGraphQL } from '../../../src/api/graphql'
import { server } from '../../msw/server'
import { http, HttpResponse } from 'msw'
import { clients, pets, vets, appointments, TEST_DATE } from '../../msw/data'

describe('API REST', () => {
  describe('fetchClients', () => {
    it('devuelve lista de clientes', async () => {
      const result = await fetchClients()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(clients.length)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
    })

    it('lanza error cuando la respuesta no es ok', async () => {
      server.use(
        http.get('/api/clients', () => {
          return HttpResponse.json({ error: 'Server Error' }, { status: 500 })
        })
      )

      await expect(fetchClients()).rejects.toThrow('Error fetching clients')
    })
  })

  describe('fetchPets', () => {
    it('devuelve lista de mascotas', async () => {
      const result = await fetchPets()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(pets.length)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('species')
    })

    it('lanza error cuando falla', async () => {
      server.use(
        http.get('/api/pets', () => {
          return HttpResponse.json({ error: 'Error' }, { status: 500 })
        })
      )

      await expect(fetchPets()).rejects.toThrow('Error fetching pets')
    })
  })

  describe('fetchVets', () => {
    it('devuelve lista de veterinarios', async () => {
      const result = await fetchVets()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(vets.length)
      expect(result[0]).toHaveProperty('specialty')
    })

    it('lanza error cuando falla', async () => {
      server.use(
        http.get('/api/vets', () => {
          return HttpResponse.json({ error: 'Error' }, { status: 500 })
        })
      )

      await expect(fetchVets()).rejects.toThrow('Error fetching vets')
    })
  })

  describe('fetchAppointments', () => {
    it('devuelve citas filtradas por fecha', async () => {
      const result = await fetchAppointments(TEST_DATE)
      
      expect(Array.isArray(result)).toBe(true)
      // Todas las citas deben ser de la fecha solicitada
      result.forEach(appointment => {
        expect(appointment.date).toBe(TEST_DATE)
      })
    })

    it('lanza error cuando falla', async () => {
      server.use(
        http.get('/api/appointments', () => {
          return HttpResponse.json({ error: 'Error' }, { status: 500 })
        })
      )

      await expect(fetchAppointments(TEST_DATE)).rejects.toThrow('Error fetching appointments')
    })
  })
})

describe('API GraphQL', () => {
  describe('fetchPetsGraphQL', () => {
    it('devuelve lista de mascotas via GraphQL', async () => {
      const result = await fetchPetsGraphQL()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(pets.length)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('species')
    })

    it('lanza error cuando GraphQL devuelve errores', async () => {
      server.use(
        http.post('/graphql', () => {
          return HttpResponse.json({
            errors: [{ message: 'GraphQL Error' }]
          })
        })
      )

      await expect(fetchPetsGraphQL()).rejects.toThrow('GraphQL Error')
    })

    it('lanza error cuando la respuesta no es ok', async () => {
      server.use(
        http.post('/graphql', () => {
          return HttpResponse.json({ error: 'Server Error' }, { status: 500 })
        })
      )

      await expect(fetchPetsGraphQL()).rejects.toThrow()
    })
  })

  describe('fetchVetsGraphQL', () => {
    it('devuelve lista de veterinarios via GraphQL', async () => {
      const result = await fetchVetsGraphQL()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(vets.length)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('specialty')
    })
  })

  describe('fetchClientsGraphQL', () => {
    it('devuelve lista de clientes via GraphQL', async () => {
      const result = await fetchClientsGraphQL()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(clients.length)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('email')
    })
  })

  describe('fetchAppointmentsGraphQL', () => {
    it('devuelve citas filtradas por fecha via GraphQL', async () => {
      const result = await fetchAppointmentsGraphQL(TEST_DATE)
      
      expect(Array.isArray(result)).toBe(true)
      result.forEach(appointment => {
        expect(appointment.date).toBe(TEST_DATE)
      })
    })

    it('filtra citas por vetId cuando se proporciona', async () => {
      const vetId = vets[0].id
      const result = await fetchAppointmentsGraphQL(TEST_DATE, vetId)
      
      expect(Array.isArray(result)).toBe(true)
      // Todas las citas deben ser del veterinario especificado
      result.forEach(appointment => {
        expect(appointment.vetId).toBe(vetId)
      })
    })
  })
})
