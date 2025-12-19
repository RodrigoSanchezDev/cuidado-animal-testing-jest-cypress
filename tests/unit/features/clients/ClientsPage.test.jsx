/**
 * Tests para ClientsPage
 * Verifica (criterio 6):
 * - Lista de clientes
 * - Mascotas de cada cliente
 * - Imágenes de mascotas
 */

import { describe, it, expect } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils/renderWithProviders'
import { ClientsPage } from '../../../../src/features/clients/ClientsPage'
import { clients, pets } from '../../../msw/data'

describe('ClientsPage', () => {
  describe('Renderizado inicial', () => {
    it('muestra el título "Clientes"', async () => {
      renderWithProviders(<ClientsPage />)
      
      expect(screen.getByRole('heading', { name: /clientes/i })).toBeInTheDocument()
    })

    it('muestra estado de carga inicialmente', () => {
      renderWithProviders(<ClientsPage />)
      
      // LoadingSkeleton tiene elementos con clase animate-pulse
      const loadingElement = document.querySelector('.animate-pulse')
      expect(loadingElement).toBeInTheDocument()
    })

    it('lista todos los clientes después de cargar', async () => {
      renderWithProviders(<ClientsPage />)
      
      // Esperar que aparezcan los clientes
      for (const client of clients) {
        await waitFor(() => {
          expect(screen.getByText(client.name)).toBeInTheDocument()
        })
      }
    })

    it('muestra el teléfono de cada cliente', async () => {
      renderWithProviders(<ClientsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(clients[0].phone)).toBeInTheDocument()
      })
    })

    it('muestra el contador de clientes registrados', async () => {
      renderWithProviders(<ClientsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/\d+ clientes registrados/i)).toBeInTheDocument()
      })
    })
  })

  describe('Interacción - Expandir cliente para ver mascotas', () => {
    it('expande un cliente al hacer click y muestra sus mascotas', async () => {
      const user = userEvent.setup()
      renderWithProviders(<ClientsPage />)
      
      // Esperar que cargue
      await waitFor(() => {
        expect(screen.getByText(clients[0].name)).toBeInTheDocument()
      })
      
      // Click en el primer cliente (María González tiene 2 mascotas: Max y Luna)
      const clientRow = screen.getByText(clients[0].name).closest('div[class*="cursor-pointer"]')
      await user.click(clientRow)
      
      // Verificar que se muestran las mascotas del cliente
      await waitFor(() => {
        // María González tiene Max (p1) y Luna (p2)
        expect(screen.getByText('Max')).toBeInTheDocument()
        expect(screen.getByText('Luna')).toBeInTheDocument()
      })
    })

    it('muestra la dirección del cliente al expandir', async () => {
      const user = userEvent.setup()
      renderWithProviders(<ClientsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(clients[0].name)).toBeInTheDocument()
      })
      
      const clientRow = screen.getByText(clients[0].name).closest('div[class*="cursor-pointer"]')
      await user.click(clientRow)
      
      await waitFor(() => {
        expect(screen.getByText(clients[0].address)).toBeInTheDocument()
      })
    })

    it('colapsa el cliente al hacer click de nuevo', async () => {
      const user = userEvent.setup()
      renderWithProviders(<ClientsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(clients[0].name)).toBeInTheDocument()
      })
      
      const clientRow = screen.getByText(clients[0].name).closest('div[class*="cursor-pointer"]')
      
      // Expandir
      await user.click(clientRow)
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      // Colapsar
      await user.click(clientRow)
      await waitFor(() => {
        expect(screen.queryByText(/historial médico/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Mascotas con imágenes', () => {
    it('las tarjetas de mascota tienen imágenes (img tags)', async () => {
      const user = userEvent.setup()
      renderWithProviders(<ClientsPage />)
      
      // Esperar que cargue y expandir cliente
      await waitFor(() => {
        expect(screen.getByText(clients[0].name)).toBeInTheDocument()
      })
      
      const clientRow = screen.getByText(clients[0].name).closest('div[class*="cursor-pointer"]')
      await user.click(clientRow)
      
      // Esperar a que aparezcan las mascotas
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      // Verificar que hay imágenes de mascotas
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
    })
  })
})
