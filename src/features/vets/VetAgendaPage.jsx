import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUser
} from 'react-icons/hi2'
import { Card, PageHeader, Badge, LoadingSkeleton, ErrorState, EmptyState } from '../../components'
import { useVets } from '../../hooks'

// Componente Avatar con fallback
function VetAvatar({ vet, size = 'md' }) {
  const [imgError, setImgError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-xl'
  }
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
  
  if (!vet.avatarUrl || imgError) {
    return (
      <div className={`${sizeClasses[size]} bg-linear-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center font-semibold text-blue-700`}>
        {getInitials(vet.name)}
      </div>
    )
  }
  
  return (
    <img 
      src={vet.avatarUrl} 
      alt={vet.name}
      className={`${sizeClasses[size]} rounded-2xl object-cover`}
      onError={() => setImgError(true)}
    />
  )
}

// Componente para foto de mascota con fallback
function PetPhoto({ photoUrl, petName }) {
  const [imgError, setImgError] = useState(false)
  
  const getInitials = (name) => name ? name[0].toUpperCase() : '?'
  
  if (!photoUrl || imgError) {
    return (
      <div className="w-8 h-8 bg-linear-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center text-xs font-semibold text-sky-700">
        {getInitials(petName)}
      </div>
    )
  }
  
  return (
    <img 
      src={photoUrl} 
      alt={petName}
      className="w-8 h-8 rounded-lg object-cover"
      onError={() => setImgError(true)}
    />
  )
}

const statusConfig = {
  pending: { label: 'Pendiente', variant: 'warning' },
  'in-progress': { label: 'En progreso', variant: 'info' },
  completed: { label: 'Completada', variant: 'success' }
}

export function VetAgendaPage() {
  const { id } = useParams()
  const { vets, loading: vetsLoading } = useVets()
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0]
  })
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalAppointments, setTotalAppointments] = useState(0)

  const vet = vets.find(v => v.id === id)

  useEffect(() => {
    async function loadAppointments() {
      if (!id) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/appointments?date=${selectedDate}&vetId=${id}`)
        if (!response.ok) throw new Error('Error al cargar citas')
        const data = await response.json()
        
        // Ordenar por hora
        const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
        setTotalAppointments(sorted.length)
        // Limitar a 8 citas
        setAppointments(sorted.slice(0, 8))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [id, selectedDate])

  if (vetsLoading) {
    return (
      <div>
        <PageHeader title="Cargando..." subtitle="" />
        <Card>
          <LoadingSkeleton rows={5} />
        </Card>
      </div>
    )
  }

  if (!vet) {
    return (
      <div>
        <PageHeader title="Veterinario no encontrado" subtitle="" />
        <Card>
          <EmptyState 
            icon={HiOutlineUser}
            title="Veterinario no encontrado"
            description="El veterinario que buscas no existe en el sistema."
          />
          <div className="text-center mt-4">
            <Link 
              to="/veterinarios"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              Volver a veterinarios
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Header con info del vet */}
      <div className="mb-6">
        <Link 
          to="/veterinarios"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium mb-4"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Volver a veterinarios
        </Link>
        
        <Card padding="p-6">
          <div className="flex items-center gap-5">
            <VetAvatar vet={vet} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{vet.name}</h1>
              <p className="text-blue-600 font-medium">{vet.specialty}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtro de fecha y agenda */}
      <Card padding="p-0">
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <HiOutlineCalendarDays className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-slate-800">Agenda de citas</h2>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-500">Fecha:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Lista de citas */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-6">
              <LoadingSkeleton rows={4} />
            </div>
          ) : error ? (
            <div className="p-6">
              <ErrorState message={error} />
            </div>
          ) : appointments.length === 0 ? (
            <EmptyState 
              icon={HiOutlineCalendarDays}
              title="Sin citas"
              description={`No hay citas programadas para ${new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}`}
            />
          ) : (
            <>
              {totalAppointments > 8 && (
                <div className="px-5 py-3 bg-blue-50 text-blue-700 text-sm font-medium">
                  Mostrando 8 de {totalAppointments} citas
                </div>
              )}
              {appointments.map((appointment) => {
                const status = statusConfig[appointment.status] || statusConfig.pending
                
                return (
                  <div 
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 lg:p-5 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Hora */}
                    <div className="flex items-center gap-2 w-20 shrink-0">
                      <HiOutlineClock className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">{appointment.time}</span>
                    </div>

                    {/* Mascota con foto */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <PetPhoto photoUrl={appointment.petPhotoUrl} petName={appointment.petName} />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 truncate">{appointment.petName}</p>
                        <p className="text-sm text-slate-500 truncate">{appointment.reason}</p>
                      </div>
                    </div>

                    {/* Dueño */}
                    <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                      <HiOutlineUser className="w-4 h-4 text-slate-400" />
                      <span className="truncate max-w-30">{appointment.ownerName}</span>
                    </div>

                    {/* Estado */}
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
