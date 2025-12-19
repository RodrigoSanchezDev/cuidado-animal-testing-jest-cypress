import { useState } from 'react'
import { 
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from 'react-icons/hi2'
import { Card, PageHeader, Badge, LoadingSkeleton, ErrorState, EmptyState } from '../../components'
import { useAppointments } from '../../hooks'

export function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const { appointments, loading, error } = useAppointments(selectedDate)
  
  const maxAppointments = 8
  const displayedAppointments = appointments.slice(0, maxAppointments)
  const totalAppointments = appointments.length

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('es-CL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const navigateDate = (direction) => {
    const current = new Date(selectedDate)
    current.setDate(current.getDate() + direction)
    setSelectedDate(current.toISOString().split('T')[0])
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente'
      case 'in-progress': return 'En progreso'
      case 'completed': return 'Completada'
      default: return status
    }
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Citas" subtitle="Agenda de atenciones" />
        <Card>
          <ErrorState message={error} />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Citas" 
        subtitle="Gestión de citas y atenciones"
      >
        {/* Date Picker */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
          <button 
            onClick={() => navigateDate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <HiOutlineChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 bg-transparent border-none outline-none text-sm font-medium text-slate-700 cursor-pointer"
          />
          
          <button 
            onClick={() => navigateDate(1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <HiOutlineChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </PageHeader>

      {/* Date Display */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-xl">
            <HiOutlineCalendarDays className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Mostrando citas para</p>
            <p className="font-semibold text-slate-800 capitalize">{formatDate(selectedDate)}</p>
          </div>
        </div>
        
        {totalAppointments > maxAppointments && (
          <Badge variant="pending">
            Mostrando {maxAppointments} de {totalAppointments}
          </Badge>
        )}
      </div>

      <Card padding="p-0">
        {loading ? (
          <div className="p-6">
            <LoadingSkeleton rows={5} />
          </div>
        ) : displayedAppointments.length === 0 ? (
          <EmptyState 
            icon={HiOutlineCalendarDays}
            title="No hay citas"
            description="No hay citas programadas para esta fecha."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {displayedAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex items-start gap-4 p-4 lg:p-5 hover:bg-slate-50/50 transition-colors"
              >
                {/* Time */}
                <div className="flex flex-col items-center min-w-15">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-1">
                    <HiOutlineClock className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{appointment.time}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">{appointment.reason}</h3>
                      <p className="text-sm text-slate-500">Dr. {appointment.vetName}</p>
                    </div>
                    <Badge variant={appointment.status}>
                      {getStatusLabel(appointment.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="p-1.5 bg-sky-50 rounded-lg">
                        <HiOutlineHeart className="w-4 h-4 text-sky-600" />
                      </div>
                      <span>{appointment.petName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="p-1.5 bg-slate-100 rounded-lg">
                        <HiOutlineUser className="w-4 h-4 text-slate-500" />
                      </div>
                      <span>{appointment.ownerName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Summary */}
      {displayedAppointments.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="text-center">
            <p className="text-2xl font-bold text-slate-800">{appointments.filter(a => a.status === 'pending').length}</p>
            <p className="text-sm text-slate-500">Pendientes</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'in-progress').length}</p>
            <p className="text-sm text-slate-500">En progreso</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-slate-600">{appointments.filter(a => a.status === 'completed').length}</p>
            <p className="text-sm text-slate-500">Completadas</p>
          </Card>
        </div>
      )}
    </div>
  )
}
