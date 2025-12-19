import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './MainLayout'
import { Dashboard } from '../features/dashboard/Dashboard'
import { ClientsPage } from '../features/clients/ClientsPage'
import { PetsPage } from '../features/pets/PetsPage'
import { AppointmentsPage } from '../features/appointments/AppointmentsPage'
import { VetsPage } from '../features/vets/VetsPage'
import { VetAgendaPage } from '../features/vets/VetAgendaPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<ClientsPage />} />
          <Route path="mascotas" element={<PetsPage />} />
          <Route path="veterinarios" element={<VetsPage />} />
          <Route path="veterinarios/:id" element={<VetAgendaPage />} />
          <Route path="citas" element={<AppointmentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
