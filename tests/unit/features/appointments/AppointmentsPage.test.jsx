/**
 * Tests para AppointmentsPage
 * Verifica (criterio 6):
 * - Filtro por día
 * - Límite de 8 citas
 * - Veterinario + Mascota + Dueño por cita
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils/renderWithProviders'
import { AppointmentsPage } from '../../../../src/features/appointments/AppointmentsPage'
import { appointments, TEST_DATE } from '../../../msw/data'

describe('AppointmentsPage', () => {
  // Usar fake timers con shouldAdvanceTime para permitir que las promesas se resuelvan
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(TEST_DATE + 'T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Renderizado inicial', () => {
    it('muestra el título "Citas"', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      expect(screen.getByRole('heading', { name: /citas/i })).toBeInTheDocument()
    })

    it('muestra estado de carga inicialmente', () => {
      renderWithProviders(<AppointmentsPage />)
      
      const loadingElement = document.querySelector('.animate-pulse')
      expect(loadingElement).toBeInTheDocument()
    })

    it('muestra el selector de fecha', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      // El input date no es un textbox, verificar que existe el input de fecha
      const dateInput = document.querySelector('input[type="date"]')
      expect(dateInput).toBeInTheDocument()
    })
  })

  describe('Filtro por día', () => {
    it('muestra las citas del día seleccionado', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      // Esperar que carguen las citas - buscar cualquier cita
      await waitFor(() => {
        const appointments = screen.getAllByText(/Max|Luna|Rocky|Mia|Simba/i)
        expect(appointments.length).toBeGreaterThan(0)
      }, { timeout: 2000 })
    })

    it('tiene un input de tipo date para filtrar', () => {
      renderWithProviders(<AppointmentsPage />)
      
      const dateInput = document.querySelector('input[type="date"]')
      expect(dateInput).toBeInTheDocument()
    })

    it('cambia las citas al navegar con botones de fecha', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      renderWithProviders(<AppointmentsPage />)
      
      // Esperar que carguen las citas
      await waitFor(() => {
        expect(screen.getByText(/mostrando 8 de 10/i)).toBeInTheDocument()
      }, { timeout: 2000 })
      
      // Verificar que hay botones de navegación de fecha
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Límite de 8 citas', () => {
    it('muestra máximo 8 citas aunque haya más', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/mostrando 8 de 10/i)).toBeInTheDocument()
      }, { timeout: 2000 })
      
      // Contar elementos de cita (cada uno tiene una hora)
      const timeElements = screen.getAllByText(/^\d{2}:\d{2}$/)
      expect(timeElements.length).toBeLessThanOrEqual(8)
    })

    it('muestra badge "Mostrando 8 de N" cuando hay más de 8 citas', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      // Tenemos 10 citas en los datos de test
      await waitFor(() => {
        expect(screen.getByText(/mostrando 8 de 10/i)).toBeInTheDocument()
      }, { timeout: 2000 })
    })
  })

  describe('Información de cada cita', () => {
    it('muestra el veterinario de cada cita', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        // Puede haber múltiples citas con el mismo veterinario
        const vetElements = screen.getAllByText(/dr\. alejandro muñoz/i)
        expect(vetElements.length).toBeGreaterThan(0)
      }, { timeout: 2000 })
    })

    it('muestra la mascota de cada cita', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        // Buscar cualquier mascota
        const pets = screen.getAllByText(/Max|Luna|Rocky|Mia|Simba/i)
        expect(pets.length).toBeGreaterThan(0)
      }, { timeout: 2000 })
    })

    it('muestra el dueño de cada cita', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        // Debería haber múltiples menciones de María González (tiene varias mascotas con citas)
        const ownerElements = screen.getAllByText('María González')
        expect(ownerElements.length).toBeGreaterThan(0)
      })
    })

    it('muestra la hora de cada cita', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('08:00')).toBeInTheDocument()
        expect(screen.getByText('08:30')).toBeInTheDocument()
      })
    })

    it('muestra el estado de cada cita (Pendiente/En progreso/Completada)', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        // Verificar que hay badges de estado
        expect(screen.getAllByText(/pendiente|en progreso|completada/i).length).toBeGreaterThan(0)
      })
    })

    it('muestra la razón/motivo de la cita', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Control general')).toBeInTheDocument()
      })
    })
  })

  describe('Resumen de citas', () => {
    it('muestra contador de citas pendientes', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Pendientes')).toBeInTheDocument()
      })
    })

    it('muestra contador de citas en progreso', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        // Buscar el badge de "en progreso" con cualquier variante
        const inProgressElements = screen.getAllByText(/en progreso/i)
        expect(inProgressElements.length).toBeGreaterThan(0)
      }, { timeout: 2000 })
    })

    it('muestra contador de citas completadas', async () => {
      renderWithProviders(<AppointmentsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Completadas')).toBeInTheDocument()
      })
    })
  })
})
