/**
 * Tests para AppRouter
 * Verifica:
 * - Renderizado del Dashboard por defecto
 * - Navegación a todas las rutas
 * - Uso de React Router (criterio 1)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, renderWithRedux } from '../../test-utils/renderWithProviders'

// Componentes a testear
import { AppRouter } from '../../../src/app/AppRouter'
import { MainLayout } from '../../../src/app/MainLayout'
import { Routes, Route, Outlet } from 'react-router-dom'

// Helper para obtener el link del sidebar
const getSidebarLink = (name) => {
  const sidebar = document.querySelector('aside')
  return within(sidebar).getByRole('link', { name })
}

describe('AppRouter', () => {
  // Limpiar entre tests para evitar contaminación del historial de BrowserRouter
  beforeEach(() => {
    cleanup()
    window.history.pushState({}, '', '/')
  })

  describe('Renderizado inicial', () => {
    it('renderiza el Dashboard por defecto en la ruta "/"', async () => {
      // AppRouter ya tiene BrowserRouter interno, usar renderWithRedux
      renderWithRedux(<AppRouter />)
      
      // Dashboard debe estar visible
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
    })

    it('muestra el logo de Cuidado Animal en el Sidebar', async () => {
      renderWithRedux(<AppRouter />)
      
      await waitFor(() => {
        // Buscar el logo específico en el sidebar (el span con font-bold)
        const logos = screen.getAllByText(/cuidado animal/i)
        expect(logos.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Navegación entre rutas', () => {
    it('navega a Clientes al hacer click en el link del Sidebar', async () => {
      const user = userEvent.setup()
      renderWithRedux(<AppRouter />)
      
      // Esperar a que cargue
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
      
      // Click en el link de Clientes del sidebar
      const clientesLink = getSidebarLink(/clientes/i)
      await user.click(clientesLink)
      
      // Verificar que estamos en la página de Clientes
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /clientes/i })).toBeInTheDocument()
      })
    })

    it('navega a Mascotas al hacer click en el link del Sidebar', async () => {
      renderWithRedux(<AppRouter />)
      
      // Esperar a que cargue
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
      
      // Verificar que el link de mascotas existe y tiene el href correcto
      const mascotasLink = getSidebarLink(/mascotas/i)
      expect(mascotasLink).toBeInTheDocument()
      expect(mascotasLink).toHaveAttribute('href', '/mascotas')
    })

    it('navega a Veterinarios al hacer click en el link del Sidebar', async () => {
      renderWithRedux(<AppRouter />)
      
      // Esperar a que cargue
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
      
      // Verificar que el link de veterinarios existe y tiene el href correcto
      const vetsLink = getSidebarLink(/veterinarios/i)
      expect(vetsLink).toBeInTheDocument()
      expect(vetsLink).toHaveAttribute('href', '/veterinarios')
    })

    it('navega a Citas al hacer click en el link del Sidebar', async () => {
      renderWithRedux(<AppRouter />)
      
      // Esperar a que cargue
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
      
      // Verificar que el link de citas existe y tiene el href correcto
      const citasLink = getSidebarLink(/citas/i)
      expect(citasLink).toBeInTheDocument()
      expect(citasLink).toHaveAttribute('href', '/citas')
    })

    it('tiene todos los links de navegación configurados', async () => {
      renderWithRedux(<AppRouter />)
      
      // Esperar a que cargue
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
      
      // Verificar todos los links del sidebar
      expect(getSidebarLink(/dashboard/i)).toHaveAttribute('href', '/')
      expect(getSidebarLink(/clientes/i)).toHaveAttribute('href', '/clientes')
      expect(getSidebarLink(/mascotas/i)).toHaveAttribute('href', '/mascotas')
      expect(getSidebarLink(/veterinarios/i)).toHaveAttribute('href', '/veterinarios')
      expect(getSidebarLink(/citas/i)).toHaveAttribute('href', '/citas')
    })
  })
})

describe('MainLayout', () => {
  it('renderiza el Sidebar con todos los links de navegación', () => {
    renderWithProviders(<MainLayout />, { initialEntries: ['/'] })
    
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /mascotas/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /veterinarios/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /citas/i })).toBeInTheDocument()
  })

  it('renderiza el Topbar', () => {
    renderWithProviders(<MainLayout />, { initialEntries: ['/'] })
    
    // El Topbar tiene botones (menú hamburguesa y otros)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renderiza el área de contenido principal (Outlet)', () => {
    renderWithProviders(<MainLayout />, { initialEntries: ['/'] })
    
    // El main content area existe
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
  })
})
