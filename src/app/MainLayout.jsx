import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main content area - Canvas limpio bg-slate-50 */}
        <main className="relative flex-1 p-4 lg:p-6 overflow-auto bg-slate-50">
          {/* Halo decorativo mínimo - solo esquina superior derecha */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Contenido con z-index para estar sobre el halo */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
