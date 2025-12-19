/**
 * Tests para Dashboard
 * Verifica:
 * - Renderizado del Hero banner
 * - KPIs (StatCards)
 * - Agenda del día
 * - Widgets auxiliares
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../test-utils/renderWithProviders'
import { Dashboard } from '../../../../src/features/dashboard/Dashboard'
import { TEST_DATE, pets, vets, appointments } from '../../../msw/data'

describe('Dashboard', () => {
  // Usar fake timers con shouldAdvanceTime para permitir que las promesas se resuelvan
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(TEST_DATE + 'T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Renderizado inicial', () => {
    it('muestra el título "Dashboard"', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    })

    it('muestra el subtítulo del panel de control', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByText(/panel de control/i)).toBeInTheDocument()
    })
  })

  describe('Hero Banner', () => {
    it('muestra mensaje de bienvenida', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/bienvenido/i)).toBeInTheDocument()
      })
    })

    it('muestra la cantidad de citas del día', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/\d+ citas/i)).toBeInTheDocument()
      })
    })

    it('muestra chips de servicios disponibles', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByText(/vacunación/i)).toBeInTheDocument()
      // Usar getAllByText para "control" ya que aparece en múltiples lugares
      const controlElements = screen.getAllByText(/control/i)
      expect(controlElements.length).toBeGreaterThan(0)
      expect(screen.getByText(/cirugía/i)).toBeInTheDocument()
    })

    it('tiene botón para ver agenda', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByRole('link', { name: /ver agenda/i })).toBeInTheDocument()
    })

    it('tiene botón para ver veterinarios', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByRole('link', { name: /ver veterinarios/i })).toBeInTheDocument()
    })
  })

  describe('KPIs - StatCards', () => {
    it('muestra el total de mascotas', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        // Puede haber múltiples elementos con "total mascotas"
        const elements = screen.getAllByText(/total mascotas/i)
        expect(elements.length).toBeGreaterThan(0)
      })
    })

    it('muestra el número de veterinarios', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        // Puede haber múltiples elementos con "veterinarios"
        const elements = screen.getAllByText(/veterinarios/i)
        expect(elements.length).toBeGreaterThan(0)
      })
    })

    it('muestra las citas de hoy', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/citas hoy/i)).toBeInTheDocument()
      })
    })
  })

  describe('Distribución de mascotas', () => {
    it('muestra sección de distribución de mascotas', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/distribución de mascotas/i)).toBeInTheDocument()
      })
    })

    it('muestra categorías: Perros, Gatos, Otros', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText('Perros')).toBeInTheDocument()
        expect(screen.getByText('Gatos')).toBeInTheDocument()
        expect(screen.getByText('Otros')).toBeInTheDocument()
      })
    })
  })

  describe('Agenda de hoy', () => {
    it('muestra la sección "Agenda de Hoy"', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/agenda de hoy/i)).toBeInTheDocument()
      })
    })

    it('muestra la fecha actual formateada', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        // La fecha debería estar en formato español
        expect(screen.getByText(/\d+ de \w+ de \d+/i)).toBeInTheDocument()
      })
    })

    it('muestra citas con mascota y veterinario', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        // Verificar que hay citas listadas - puede haber múltiples "Max"
        const elements = screen.getAllByText('Max')
        expect(elements.length).toBeGreaterThan(0)
      })
    })

    it('muestra estado de cada cita (badge)', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        const statusBadges = screen.getAllByText(/pendiente|en progreso|completada/i)
        expect(statusBadges.length).toBeGreaterThan(0)
      })
    })

    it('tiene link para ver todas las citas', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /ver todas las citas/i })).toBeInTheDocument()
      })
    })
  })

  describe('Quick Actions', () => {
    it('tiene link para ver mascotas', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByRole('link', { name: /ver mascotas/i })).toBeInTheDocument()
    })

    it('tiene link para administrar citas', async () => {
      renderWithProviders(<Dashboard />)
      
      expect(screen.getByRole('link', { name: /administrar citas/i })).toBeInTheDocument()
    })
  })

  describe('Widget de últimos clientes', () => {
    it('muestra sección de últimos clientes', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/últimos clientes/i)).toBeInTheDocument()
      })
    })

    it('tiene link para ver clientes', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /ver clientes/i })).toBeInTheDocument()
      })
    })
  })

  describe('Widget de paciente destacado', () => {
    it('muestra sección de paciente destacado', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByText(/paciente destacado/i)).toBeInTheDocument()
      })
    })

    it('tiene link para ver ficha completa', async () => {
      renderWithProviders(<Dashboard />)
      
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /ver ficha completa/i })).toBeInTheDocument()
      })
    })
  })
})
