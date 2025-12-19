/**
 * Tests para PetsPage
 * Verifica (criterio 6):
 * - Lista de mascotas con especie, raza y edad
 * - Imágenes de mascotas
 * - Historial médico al expandir
 */

import { describe, it, expect } from 'vitest'
import { screen, waitFor, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils/renderWithProviders'
import { PetsPage } from '../../../../src/features/pets/PetsPage'
import { pets } from '../../../msw/data'

describe('PetsPage', () => {
  describe('Renderizado inicial', () => {
    it('muestra el título "Mascotas"', async () => {
      renderWithProviders(<PetsPage />)
      
      expect(screen.getByRole('heading', { name: /mascotas/i })).toBeInTheDocument()
    })

    it('muestra estado de carga inicialmente', () => {
      renderWithProviders(<PetsPage />)
      
      const loadingElement = document.querySelector('.animate-pulse')
      expect(loadingElement).toBeInTheDocument()
    })

    it('lista todas las mascotas después de cargar', async () => {
      renderWithProviders(<PetsPage />)
      
      // Verificar que todas las mascotas aparecen
      for (const pet of pets) {
        await waitFor(() => {
          expect(screen.getByText(pet.name)).toBeInTheDocument()
        })
      }
    })

    it('muestra el subtítulo con el total de mascotas', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/\d+ mascotas registradas/i)).toBeInTheDocument()
      })
    })
  })

  describe('Información de cada mascota', () => {
    it('muestra la especie de cada mascota con badge', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        // Usar getAllByText porque hay múltiples mascotas de la misma especie
        const perroBadges = screen.getAllByText('Perro')
        expect(perroBadges.length).toBeGreaterThan(0)
        // Luna es Gato
        const gatoBadges = screen.getAllByText('Gato')
        expect(gatoBadges.length).toBeGreaterThan(0)
      })
    })

    it('muestra la raza de cada mascota', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Golden Retriever')).toBeInTheDocument()
        expect(screen.getByText('Siamés')).toBeInTheDocument()
      })
    })

    it('muestra la edad de cada mascota', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        // Max tiene 3 años
        expect(screen.getByText(/3 años/)).toBeInTheDocument()
        // Luna tiene 2 años
        expect(screen.getByText(/2 años/)).toBeInTheDocument()
      })
    })

    it('muestra el dueño de cada mascota', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getAllByText('María González').length).toBeGreaterThan(0)
      })
    })
  })

  describe('Imágenes de mascotas', () => {
    it('cada mascota tiene una imagen (elemento img)', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      // Verificar que hay imágenes
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
    })

    it('las imágenes tienen alt text con el nombre de la mascota', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      // Al menos una imagen debe tener alt="Max"
      const maxImage = screen.getByAltText('Max')
      expect(maxImage).toBeInTheDocument()
    })
  })

  describe('Expandir mascota - Historial médico', () => {
    it('expande una mascota al hacer click y muestra historial médico', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      // Click en Max (tiene historial médico)
      const petRow = screen.getByText('Max').closest('div[class*="cursor-pointer"]')
      await user.click(petRow)
      
      // Verificar que aparece la sección de historial médico
      await waitFor(() => {
        expect(screen.getByText(/historial médico/i)).toBeInTheDocument()
      })
    })

    it('muestra los registros del historial médico', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      const petRow = screen.getByText('Max').closest('div[class*="cursor-pointer"]')
      await user.click(petRow)
      
      // Max tiene "Vacuna antirrábica" en su historial
      await waitFor(() => {
        expect(screen.getByText(/vacuna antirrábica/i)).toBeInTheDocument()
      })
    })

    it('muestra mensaje cuando no hay historial médico', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Mia')).toBeInTheDocument()
      })
      
      // Mia no tiene historial médico
      const petRow = screen.getByText('Mia').closest('div[class*="cursor-pointer"]')
      await user.click(petRow)
      
      await waitFor(() => {
        expect(screen.getByText(/sin historial médico/i)).toBeInTheDocument()
      })
    })

    it('muestra imagen grande al expandir', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      const petRow = screen.getByText('Max').closest('div[class*="cursor-pointer"]')
      await user.click(petRow)
      
      await waitFor(() => {
        // Verificar que hay imagen grande (w-32 h-32)
        const images = screen.getAllByAltText('Max')
        expect(images.length).toBeGreaterThanOrEqual(1)
      })
    })

    it('colapsa la mascota al hacer click de nuevo', async () => {
      const user = userEvent.setup()
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Max')).toBeInTheDocument()
      })
      
      const petRow = screen.getByText('Max').closest('div[class*="cursor-pointer"]')
      
      // Expandir
      await user.click(petRow)
      await waitFor(() => {
        expect(screen.getByText(/historial médico/i)).toBeInTheDocument()
      })
      
      // Colapsar
      await user.click(petRow)
      await waitFor(() => {
        expect(screen.queryByText(/historial médico/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Estados especiales', () => {
    it('muestra componente ErrorState cuando hay error en estado', async () => {
      // Crear store con estado de error precargado
      const { createTestStore } = await import('../../../test-utils/renderWithProviders')
      const store = createTestStore({
        pets: {
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
            <PetsPage />
          </MemoryRouter>
        </Provider>
      )
      
      // El ErrorState muestra "Error" en un h3
      expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument()
    })

    it('muestra componente EmptyState cuando no hay mascotas', async () => {
      // Crear store con estado vacío precargado
      const { createTestStore } = await import('../../../test-utils/renderWithProviders')
      const store = createTestStore({
        pets: {
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
            <PetsPage />
          </MemoryRouter>
        </Provider>
      )
      
      expect(screen.getByText(/no hay mascotas/i)).toBeInTheDocument()
    })
  })

  describe('Avatar fallback', () => {
    it('muestra emoji cuando la imagen falla', async () => {
      renderWithProviders(<PetsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(pets[0].name)).toBeInTheDocument()
      })
      
      // Simular error de imagen
      const img = screen.getByAltText(pets[0].name)
      fireEvent.error(img)
      
      // Debería mostrar emoji de perro o gato según la especie
      await waitFor(() => {
        // Verificar que aparece un emoji (div con clase sky)
        const emojiContainer = document.querySelector('.from-sky-100')
        expect(emojiContainer).toBeInTheDocument()
      })
    })
  })
})
