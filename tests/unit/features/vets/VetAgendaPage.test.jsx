/**
 * Tests para VetAgendaPage
 * Verifica:
 * - Filtro de citas por día
 * - Lista de citas del veterinario seleccionado
 * - Límite de 8 citas
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils/renderWithProviders'
import { VetAgendaPage } from '../../../../src/features/vets/VetAgendaPage'
import { vets, appointments, TEST_DATE } from '../../../msw/data'

// Mock de useParams para simular el id del veterinario
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: 'v1' }) // Dr. Alejandro Muñoz
  }
})

describe('VetAgendaPage', () => {
  // Usar fake timers con shouldAdvanceTime para permitir que las promesas se resuelvan
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(TEST_DATE + 'T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Renderizado inicial', () => {
    it('muestra el nombre del veterinario', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].name)).toBeInTheDocument()
      })
    })

    it('muestra la especialidad del veterinario', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        expect(screen.getByText(vets[0].specialty)).toBeInTheDocument()
      })
    })

    it('muestra el título "Agenda de citas"', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/agenda de citas/i)).toBeInTheDocument()
      })
    })

    it('muestra link para volver a veterinarios', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /volver a veterinarios/i })).toBeInTheDocument()
      })
    })
  })

  describe('Filtro por día', () => {
    it('tiene un input de tipo date para filtrar', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        const dateInput = document.querySelector('input[type="date"]')
        expect(dateInput).toBeInTheDocument()
      })
    })

    it('muestra las citas filtradas del veterinario para el día seleccionado', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      // Dr. Muñoz (v1) tiene citas en TEST_DATE
      await waitFor(() => {
        // Debería mostrar al menos una cita
        const timeElements = screen.queryAllByText(/^\d{2}:\d{2}$/)
        expect(timeElements.length).toBeGreaterThan(0)
      }, { timeout: 3000 })
    })
  })

  describe('Lista de citas', () => {
    it('muestra la hora de cada cita', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        // Las citas de v1 incluyen 08:00, 09:00, etc.
        const timeElements = screen.queryAllByText(/^\d{2}:\d{2}$/)
        expect(timeElements.length).toBeGreaterThan(0)
      }, { timeout: 3000 })
    })

    it('muestra el nombre de la mascota en cada cita', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        // Dr. Muñoz atiende a Max, Rocky, Simba
        const petNames = ['Max', 'Rocky', 'Simba']
        const foundNames = petNames.filter(name => screen.queryByText(name))
        expect(foundNames.length).toBeGreaterThan(0)
      }, { timeout: 3000 })
    })

    it('muestra el estado de cada cita', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        const statusElements = screen.queryAllByText(/pendiente|en progreso|completada/i)
        expect(statusElements.length).toBeGreaterThan(0)
      }, { timeout: 3000 })
    })
  })

  describe('Límite de 8 citas', () => {
    it('muestra máximo 8 citas', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        const timeElements = screen.queryAllByText(/^\d{2}:\d{2}$/)
        expect(timeElements.length).toBeLessThanOrEqual(8)
      }, { timeout: 3000 })
    })
  })

  describe('Avatar del veterinario', () => {
    it('muestra la imagen del veterinario', async () => {
      renderWithProviders(<VetAgendaPage />)
      
      await waitFor(() => {
        const vetImage = screen.getByAltText(vets[0].name)
        expect(vetImage).toBeInTheDocument()
      })
    })
  })
})
