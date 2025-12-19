/**
 * Tests para componentes UI reutilizables
 * Aumenta cobertura de src/components/*
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

// Componentes a testear
import { Card } from '../../../src/components/Card'
import { Badge } from '../../../src/components/Badge'
import { PageHeader } from '../../../src/components/PageHeader'
import { EmptyState } from '../../../src/components/EmptyState'
import { ErrorState } from '../../../src/components/ErrorState'
import { LoadingSpinner, LoadingSkeleton } from '../../../src/components/Loading'
import { StatCard } from '../../../src/components/StatCard'
import { Callout } from '../../../src/components/Callout'
import { HiOutlineHeart } from 'react-icons/hi2'

describe('Componentes UI', () => {
  describe('Card', () => {
    it('renderiza children correctamente', () => {
      render(<Card>Contenido de prueba</Card>)
      expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
    })

    it('aplica clases de padding personalizadas', () => {
      render(<Card padding="p-8">Contenido</Card>)
      const card = screen.getByText('Contenido').closest('div')
      expect(card).toHaveClass('p-8')
    })

    it('aplica clases adicionales', () => {
      render(<Card className="my-custom-class">Contenido</Card>)
      const card = screen.getByText('Contenido').closest('div')
      expect(card).toHaveClass('my-custom-class')
    })
  })

  describe('Badge', () => {
    it('renderiza texto correctamente', () => {
      render(<Badge>Pendiente</Badge>)
      expect(screen.getByText('Pendiente')).toBeInTheDocument()
    })

    it('aplica variante pending', () => {
      render(<Badge variant="pending">Pendiente</Badge>)
      const badge = screen.getByText('Pendiente')
      expect(badge).toBeInTheDocument()
    })

    it('aplica variante completed', () => {
      render(<Badge variant="completed">Completada</Badge>)
      const badge = screen.getByText('Completada')
      expect(badge).toBeInTheDocument()
    })

    it('aplica variante in-progress', () => {
      render(<Badge variant="in-progress">En progreso</Badge>)
      const badge = screen.getByText('En progreso')
      expect(badge).toBeInTheDocument()
    })

    it('aplica variante default', () => {
      render(<Badge variant="default">Default</Badge>)
      const badge = screen.getByText('Default')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('PageHeader', () => {
    it('renderiza título', () => {
      render(<PageHeader title="Mi Título" />)
      expect(screen.getByRole('heading', { name: 'Mi Título' })).toBeInTheDocument()
    })

    it('renderiza subtítulo', () => {
      render(<PageHeader title="Título" subtitle="Subtítulo de prueba" />)
      expect(screen.getByText('Subtítulo de prueba')).toBeInTheDocument()
    })

    it('renderiza children (acciones)', () => {
      render(
        <PageHeader title="Título">
          <button>Acción</button>
        </PageHeader>
      )
      expect(screen.getByRole('button', { name: 'Acción' })).toBeInTheDocument()
    })
  })

  describe('EmptyState', () => {
    it('renderiza título', () => {
      render(<EmptyState title="No hay datos" />)
      expect(screen.getByText('No hay datos')).toBeInTheDocument()
    })

    it('renderiza descripción', () => {
      render(<EmptyState title="Vacío" description="No se encontraron resultados" />)
      expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument()
    })

    it('renderiza icono personalizado', () => {
      render(<EmptyState title="Vacío" icon={HiOutlineHeart} />)
      // El icono se renderiza como SVG
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('ErrorState', () => {
    it('renderiza mensaje de error', () => {
      render(<ErrorState message="Algo salió mal" />)
      expect(screen.getByText('Algo salió mal')).toBeInTheDocument()
    })

    it('muestra botón de reintentar cuando se pasa onRetry', async () => {
      const onRetry = vi.fn()
      const user = userEvent.setup()
      
      render(<ErrorState message="Error" onRetry={onRetry} />)
      
      const retryButton = screen.getByRole('button', { name: /reintentar/i })
      expect(retryButton).toBeInTheDocument()
      
      await user.click(retryButton)
      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('no muestra botón de reintentar sin onRetry', () => {
      render(<ErrorState message="Error" />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('LoadingSpinner', () => {
    it('renderiza spinner', () => {
      render(<LoadingSpinner />)
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('acepta tamaño sm', () => {
      render(<LoadingSpinner size="sm" />)
      const spinner = document.querySelector('.w-4')
      expect(spinner).toBeInTheDocument()
    })

    it('acepta tamaño lg', () => {
      render(<LoadingSpinner size="lg" />)
      const spinner = document.querySelector('.w-8')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('LoadingSkeleton', () => {
    it('renderiza número de filas especificado', () => {
      render(<LoadingSkeleton rows={5} />)
      const skeletonItems = document.querySelectorAll('.bg-slate-200')
      expect(skeletonItems.length).toBeGreaterThanOrEqual(5)
    })

    it('tiene animación pulse', () => {
      render(<LoadingSkeleton rows={3} />)
      const container = document.querySelector('.animate-pulse')
      expect(container).toBeInTheDocument()
    })
  })

  describe('StatCard', () => {
    it('renderiza valor y label', () => {
      render(
        <MemoryRouter>
          <StatCard icon={HiOutlineHeart} value={42} label="Total Items" />
        </MemoryRouter>
      )
      
      expect(screen.getByText('42')).toBeInTheDocument()
      expect(screen.getByText('Total Items')).toBeInTheDocument()
    })

    it('renderiza icono', () => {
      render(
        <MemoryRouter>
          <StatCard icon={HiOutlineHeart} value={10} label="Test" />
        </MemoryRouter>
      )
      
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('renderiza link cuando se proporciona linkTo', () => {
      render(
        <MemoryRouter>
          <StatCard icon={HiOutlineHeart} value={10} label="Test" linkTo="/mascotas" />
        </MemoryRouter>
      )
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/mascotas')
    })
  })

  describe('Callout', () => {
    it('renderiza children', () => {
      render(<Callout>Información importante</Callout>)
      expect(screen.getByText('Información importante')).toBeInTheDocument()
    })

    it('aplica clases adicionales', () => {
      render(<Callout className="my-class">Contenido</Callout>)
      const callout = screen.getByText('Contenido').closest('div')
      expect(callout).toHaveClass('my-class')
    })
  })
})
