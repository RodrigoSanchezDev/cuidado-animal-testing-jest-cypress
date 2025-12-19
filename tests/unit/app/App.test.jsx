/**
 * Tests para App.jsx
 * Verifica:
 * - Renderizado correcto del componente principal
 * - Integración con AppRouter
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { screen, waitFor, cleanup } from '@testing-library/react'
import { renderWithRedux } from '../../test-utils/renderWithProviders'
import App from '../../../src/App'

describe('App', () => {
  beforeEach(() => {
    cleanup()
    window.history.pushState({}, '', '/')
  })

  describe('Renderizado', () => {
    it('renderiza el componente App correctamente', async () => {
      renderWithRedux(<App />)
      
      // App debe renderizar AppRouter que muestra el Dashboard por defecto
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
      })
    })

    it('muestra el layout principal con sidebar', async () => {
      renderWithRedux(<App />)
      
      await waitFor(() => {
        // Verificar que el sidebar está presente
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })
    })

    it('muestra el topbar con título', async () => {
      renderWithRedux(<App />)
      
      await waitFor(() => {
        // El topbar debe mostrar "Cuidado Animal"
        const topbar = document.querySelector('header')
        expect(topbar).toBeInTheDocument()
      })
    })

    it('renderiza el contenido principal', async () => {
      renderWithRedux(<App />)
      
      await waitFor(() => {
        // Debe haber un área de contenido principal
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
    })
  })

  describe('Integración con Router', () => {
    it('App contiene las rutas de navegación del sidebar', async () => {
      renderWithRedux(<App />)
      
      await waitFor(() => {
        // Verificar que existen los links de navegación en el sidebar
        const sidebar = document.querySelector('aside')
        expect(sidebar).toBeInTheDocument()
        
        // Verificar que hay links dentro del sidebar
        const links = sidebar.querySelectorAll('a')
        expect(links.length).toBeGreaterThan(0)
      })
    })
  })
})
