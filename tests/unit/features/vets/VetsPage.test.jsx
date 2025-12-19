/**
 * Tests para VetsPage
 * Verifica:
 * - Lista de veterinarios
 * - Avatares/fotos de veterinarios
 * - Especialidad y contacto
 */

import { describe, it, expect } from 'vitest'
import { screen, waitFor, fireEvent, render } from '@testing-library/react'
import { renderWithProviders } from '../../../test-utils/renderWithProviders'
import { VetsPage } from '../../../../src/features/vets/VetsPage'
import { vets } from '../../../msw/data'

describe('VetsPage', () => {
  describe('Renderizado inicial', () => {
    it('muestra el título "Veterinarios"', async () => {
      renderWithProviders(<VetsPage />)
      
      expect(screen.getByRole('heading', { name: /veterinarios/i })).toBeInTheDocument()
    })

    it('muestra estado de carga inicialmente', () => {
      renderWithProviders(<VetsPage />)
      
      const loadingElement = document.querySelector('.animate-pulse')
      expect(loadingElement).toBeInTheDocument()
    })

    it('lista todos los veterinarios después de cargar', async () => {
      renderWithProviders(<VetsPage />)
      
      for (const vet of vets) {
        await waitFor(() => {
          expect(screen.getByText(vet.name)).toBeInTheDocument()
        })
      }
    })

    it('muestra el subtítulo con el total de profesionales', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/\d+ profesionales/i)).toBeInTheDocument()
      })
    })
  })

  describe('Información de cada veterinario', () => {
    it('muestra la especialidad de cada veterinario', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Medicina General')).toBeInTheDocument()
        expect(screen.getByText('Cirugía')).toBeInTheDocument()
        expect(screen.getByText('Dermatología')).toBeInTheDocument()
        expect(screen.getByText('Cardiología')).toBeInTheDocument()
      })
    })

    it('muestra el teléfono de cada veterinario', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].phone)).toBeInTheDocument()
      })
    })

    it('muestra el email de cada veterinario', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].email)).toBeInTheDocument()
      })
    })
  })

  describe('Avatares de veterinarios', () => {
    it('cada veterinario tiene una imagen o avatar', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].name)).toBeInTheDocument()
      })
      
      // Verificar que hay imágenes
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
    })

    it('las imágenes tienen alt text con el nombre del veterinario', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].name)).toBeInTheDocument()
      })
      
      const vetImage = screen.getByAltText(vets[0].name)
      expect(vetImage).toBeInTheDocument()
    })
  })

  describe('Navegación a agenda', () => {
    it('cada veterinario tiene un link a "Ver agenda"', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].name)).toBeInTheDocument()
      })
      
      const agendaLinks = screen.getAllByRole('link', { name: /ver agenda/i })
      expect(agendaLinks.length).toBe(vets.length)
    })

    it('los links de agenda apuntan a /veterinarios/:id', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].name)).toBeInTheDocument()
      })
      
      const agendaLinks = screen.getAllByRole('link', { name: /ver agenda/i })
      expect(agendaLinks[0]).toHaveAttribute('href', `/veterinarios/${vets[0].id}`)
    })
  })

  describe('Estados especiales', () => {
    it('muestra componente ErrorState cuando hay error en estado', async () => {
      // Crear store con estado de error precargado
      const { createTestStore } = await import('../../../test-utils/renderWithProviders')
      const store = createTestStore({
        vets: {
          items: [],
          loading: false,
          error: 'Error de prueba'
        }
      })
      
      const { Provider } = await import('react-redux')
      const { MemoryRouter } = await import('react-router-dom')
      
      render(
        <Provider store={store}>
          <MemoryRouter>
            <VetsPage />
          </MemoryRouter>
        </Provider>
      )
      
      // El ErrorState muestra "Error" en un h3
      expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument()
    })

    it('muestra componente EmptyState cuando no hay veterinarios', async () => {
      // Crear store con estado vacío precargado
      const { createTestStore } = await import('../../../test-utils/renderWithProviders')
      const store = createTestStore({
        vets: {
          items: [],
          loading: false,
          error: null
        }
      })
      
      const { Provider } = await import('react-redux')
      const { MemoryRouter } = await import('react-router-dom')
      
      render(
        <Provider store={store}>
          <MemoryRouter>
            <VetsPage />
          </MemoryRouter>
        </Provider>
      )
      
      expect(screen.getByText(/no hay veterinarios/i)).toBeInTheDocument()
    })
  })

  describe('Avatar fallback', () => {
    it('muestra iniciales cuando la imagen falla', async () => {
      renderWithProviders(<VetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].name)).toBeInTheDocument()
      })
      
      // Simular error de imagen
      const img = screen.getByAltText(vets[0].name)
      fireEvent.error(img)
      
      // Debería mostrar las iniciales en div con clase blue
      await waitFor(() => {
        const initials = document.querySelector('.text-blue-700')
        expect(initials).toBeInTheDocument()
      })
    })
  })
})
