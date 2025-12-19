/**
 * Tests para estados UI
 * Verifica:
 * - Loading state
 * - Error state
 * - Empty state
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils/renderWithProviders'
import { ClientsPage } from '../../../src/features/clients/ClientsPage'
import { PetsPage } from '../../../src/features/pets/PetsPage'
import { server } from '../../msw/server'
import { http, HttpResponse, delay } from 'msw'

describe('Estados UI', () => {
  describe('Loading State', () => {
    it('ClientsPage muestra skeleton de carga mientras carga datos', async () => {
      // Agregar delay al handler
      server.use(
        http.get('/api/clients', async () => {
          await delay(500)
          return HttpResponse.json([])
        })
      )

      renderWithProviders(<ClientsPage />)
      
      // Verificar que se muestra el estado de carga
      const loadingElement = document.querySelector('.animate-pulse')
      expect(loadingElement).toBeInTheDocument()
    })

    it('PetsPage muestra skeleton de carga mientras carga datos', async () => {
      // Agregar delay al handler de GraphQL
      server.use(
        http.post('/graphql', async () => {
          await delay(500)
          return HttpResponse.json({ data: { pets: [] } })
        })
      )

      renderWithProviders(<PetsPage />)
      
      const loadingElement = document.querySelector('.animate-pulse')
      expect(loadingElement).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('ClientsPage muestra error cuando el API falla', async () => {
      // Sobrescribir handler para devolver error - usar wildcard para jsdom
      server.use(
        http.get('*/api/clients', () => {
          return new HttpResponse(null, { status: 500 })
        })
      )

      // Renderizar con estado inicial limpio para forzar la carga
      renderWithProviders(<ClientsPage />, {
        preloadedState: {
          clients: {
            items: [],
            status: 'idle',  // Forzar recarga
            error: null
          }
        }
      })
      
      // Esperar a que aparezca el estado de error
      await waitFor(() => {
        // Puede haber múltiples elementos con "error"
        const errorElements = screen.getAllByText(/error/i)
        expect(errorElements.length).toBeGreaterThan(0)
      }, { timeout: 3000 })
    })

    it('PetsPage muestra error cuando GraphQL falla', async () => {
      server.use(
        http.post('*/graphql', () => {
          return HttpResponse.json(
            { errors: [{ message: 'GraphQL Error' }] },
            { status: 500 }
          )
        })
      )

      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      }, { timeout: 5000 })
    })
  })

  describe('Empty State', () => {
    it('ClientsPage muestra estado vacío cuando no hay clientes', async () => {
      server.use(
        http.get('*/api/clients', () => {
          return HttpResponse.json([])
        })
      )

      renderWithProviders(<ClientsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/no hay clientes/i)).toBeInTheDocument()
      })
    })

    it('PetsPage muestra estado vacío cuando no hay mascotas', async () => {
      server.use(
        http.post('*/graphql', async ({ request }) => {
          const body = await request.json()
          if (body.query.includes('GetPets')) {
            return HttpResponse.json({ data: { pets: [] } })
          }
          return HttpResponse.json({ data: {} })
        })
      )

      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/no hay mascotas/i)).toBeInTheDocument()
      })
    })
  })
})
