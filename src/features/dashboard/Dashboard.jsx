import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  HiOutlineHeart, 
  HiOutlineUserGroup, 
  HiOutlineCalendarDays,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineScissors,
  HiOutlineExclamationTriangle,
  HiOutlineEye
} from 'react-icons/hi2'
import { Card, StatCard, Badge, Callout, LoadingSkeleton, ErrorState } from '../../components'
import { usePets, useVets, useAppointments, useClients } from '../../hooks'

// ============================================
// COMPONENTES AUXILIARES PREMIUM
// ============================================

/**
 * PetAvatarStack - Stack de avatares de mascotas para el Hero
 * Muestra 4-6 fotos circulares con efecto overlap
 */
function PetAvatarStack({ pets, maxVisible = 5 }) {
  const visiblePets = pets.slice(0, maxVisible)
  const remaining = pets.length - maxVisible
  
  return (
    <div className="flex items-center -space-x-2">
      {visiblePets.map((pet, index) => (
        <PetMiniAvatar 
          key={pet.id} 
          pet={pet} 
          size={32} 
          className="ring-2 ring-white"
          style={{ zIndex: maxVisible - index }}
        />
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
          +{remaining}
        </div>
      )}
    </div>
  )
}

/**
 * PetMiniAvatar - Avatar circular pequeño de mascota
 * Con tratamiento grayscale + overlay azul sutil
 */
function PetMiniAvatar({ pet, size = 28, className = '', style = {} }) {
  const [imgError, setImgError] = useState(false)
  
  const getSpeciesEmoji = (species) => {
    switch (species?.toLowerCase()) {
      case 'perro': return '🐕'
      case 'gato': return '🐱'
      case 'ave': return '🦜'
      case 'conejo': return '🐰'
      default: return '🐾'
    }
  }
  
  if (!pet?.photoUrl || imgError) {
    return (
      <div 
        className={`rounded-full bg-sky-100 flex items-center justify-center text-xs shrink-0 ${className}`}
        style={{ width: size, height: size, ...style }}
      >
        {getSpeciesEmoji(pet?.species)}
      </div>
    )
  }
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <img 
        src={pet.photoUrl} 
        alt={pet.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover grayscale-30 saturate-[0.8]"
        onError={() => setImgError(true)}
      />
      {/* Overlay azul muy sutil */}
      <div className="absolute inset-0 bg-sky-500/5 pointer-events-none" />
    </div>
  )
}

/**
 * FeaturedPetCard - Widget de paciente destacado
 * Con foto grande y tratamiento premium
 */
function FeaturedPetCard({ pet, appointments }) {
  const [imgError, setImgError] = useState(false)
  
  // Buscar última y próxima cita de esta mascota
  const petAppointments = appointments.filter(a => a.petId === pet.id)
  const lastVisit = pet.medicalHistory?.[0]?.date
  const nextAppointment = petAppointments.find(a => a.status === 'pending')
  
  const getSpeciesEmoji = (species) => {
    switch (species?.toLowerCase()) {
      case 'perro': return '🐕'
      case 'gato': return '🐱'
      case 'ave': return '🦜'
      case 'conejo': return '🐰'
      default: return '🐾'
    }
  }
  
  return (
    <Card variant="featured" padding="p-0" className="overflow-hidden">
      <div className="p-4 pb-3 border-b border-sky-100/60">
        <div className="flex items-center gap-2">
          <HiOutlineStar className="w-4 h-4 text-sky-500" />
          <h3 className="font-semibold text-slate-800 text-sm">Paciente destacado</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex gap-4">
          {/* Foto grande con tratamiento premium */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
            {pet.photoUrl && !imgError ? (
              <>
                <img 
                  src={pet.photoUrl} 
                  alt={pet.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-20 saturate-[0.85]"
                  onError={() => setImgError(true)}
                />
                {/* Overlay azul sutil */}
                <div className="absolute inset-0 bg-linear-to-t from-sky-900/20 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl bg-sky-50">
                {getSpeciesEmoji(pet.species)}
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-800 truncate">{pet.name}</h4>
            <p className="text-sm text-slate-500">{pet.species} · {pet.breed}</p>
            
            <div className="mt-2 space-y-1">
              <p className="text-xs text-slate-600">
                <span className="text-slate-400">Dueño:</span> {pet.ownerName}
              </p>
              {lastVisit && (
                <p className="text-xs text-slate-500">
                  <span className="text-slate-400">Última visita:</span>{' '}
                  {new Date(lastVisit).toLocaleDateString('es-CL')}
                </p>
              )}
              {nextAppointment && (
                <p className="text-xs text-sky-600 font-medium">
                  Próxima cita: {nextAppointment.time}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <Link 
          to="/mascotas"
          className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-medium text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
        >
          Ver ficha completa
          <HiOutlineArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  )
}

// ============================================
// DASHBOARD PRINCIPAL
// ============================================

export function Dashboard() {
  const today = new Date().toISOString().split('T')[0]
  
  const { pets, loading: petsLoading, error: petsError } = usePets()
  const { vets, loading: vetsLoading, error: vetsError } = useVets()
  const { appointments, loading: appointmentsLoading, error: appointmentsError } = useAppointments(today)
  const { clients, loading: clientsLoading } = useClients()

  // Calculate pet distribution
  const petDistribution = pets.reduce((acc, pet) => {
    const category = pet.species === 'Perro' ? 'Perros' : pet.species === 'Gato' ? 'Gatos' : 'Otros'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, { Perros: 0, Gatos: 0, Otros: 0 })

  const totalPets = pets.length
  const maxAppointments = 8
  const displayedAppointments = appointments.slice(0, maxAppointments)
  
  // Próxima cita (primera pendiente o en progreso)
  const nextAppointment = appointments.find(a => a.status === 'pending' || a.status === 'in-progress')
  
  // Citas en progreso
  const inProgressCount = appointments.filter(a => a.status === 'in-progress').length
  
  // Últimos clientes (últimos 5)
  const recentClients = clients.slice(-5).reverse()
  
  // Paciente destacado (el que tenga próxima cita o historial reciente)
  const featuredPet = pets.find(p => {
    const hasTodayAppointment = appointments.some(a => a.petId === p.id)
    return hasTodayAppointment
  }) || pets[0]

  if (petsError || vetsError || appointmentsError) {
    return <ErrorState message="Error al cargar los datos del dashboard" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Panel de control de Cuidado Animal</p>
      </div>

      {/* Hero Banner - Card 3D blanca elegante con acento superior */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/70 shadow-[0_14px_40px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.14)] transition-all duration-200 p-6">
        {/* Barra superior de acento sky */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-sky-400 via-sky-500 to-blue-500" />
        {/* Halo interno muy sutil - solo esquina */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-100/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-linear-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-100">
              <HiOutlineSparkles className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Bienvenido, Dr. García</h2>
              <p className="text-slate-500 text-sm mt-0.5">
                Hoy tienes <span className="font-medium text-slate-700">{appointments.length} citas</span>
                {inProgressCount > 0 && (
                  <> · <span className="font-medium text-teal-600">{inProgressCount} en progreso</span></>
                )}
              </p>
              
              {/* PetAvatarStack debajo del texto */}
              {!petsLoading && pets.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Pacientes:</span>
                  <PetAvatarStack pets={pets} maxVisible={5} />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:shrink-0">
            <Link 
              to="/citas"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Ver agenda
              <HiOutlineCalendarDays className="w-4 h-4" />
            </Link>
            <Link 
              to="/veterinarios"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors"
            >
              Ver veterinarios
            </Link>
          </div>
        </div>
        
        {/* Chips de Servicios Veterinarios */}
        <div className="relative mt-5 pt-5 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-2.5">Servicios disponibles</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200/70 text-sky-700 text-xs font-medium rounded-full">
              <HiOutlineBeaker className="w-3.5 h-3.5" />
              Vacunación
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200/70 text-sky-700 text-xs font-medium rounded-full">
              <HiOutlineShieldCheck className="w-3.5 h-3.5" />
              Control
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200/70 text-teal-700 text-xs font-medium rounded-full">
              <HiOutlineScissors className="w-3.5 h-3.5" />
              Cirugía
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200/70 text-sky-700 text-xs font-medium rounded-full">
              <HiOutlineEye className="w-3.5 h-3.5" />
              Dermatología
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200/70 text-teal-700 text-xs font-medium rounded-full">
              <HiOutlineExclamationTriangle className="w-3.5 h-3.5" />
              Urgencias
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid - Bento style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatCard 
          icon={HiOutlineHeart}
          value={petsLoading ? '...' : pets.length}
          label="Total Mascotas"
          linkTo="/mascotas"
        />
        <StatCard 
          icon={HiOutlineUserGroup}
          value={vetsLoading ? '...' : vets.length}
          label="Veterinarios"
          linkTo="/veterinarios"
          linkLabel="Ver equipo"
        />
        <StatCard 
          icon={HiOutlineCalendarDays}
          value={appointmentsLoading ? '...' : appointments.length}
          label="Citas Hoy"
          linkTo="/citas"
          variant="primary"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet Distribution */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Distribución de Mascotas</h2>
          </div>
          
          {/* Micro callout */}
          <Callout className="mb-4">
            <span className="font-medium text-slate-700">Total mascotas: {totalPets}</span>
            <span className="text-slate-400 mx-2">·</span>
            <span>Clientes: {clients.length}</span>
          </Callout>
          
          {petsLoading ? (
            <LoadingSkeleton rows={3} />
          ) : (
            <div className="space-y-4">
              {Object.entries(petDistribution).map(([category, count]) => {
                const percentage = totalPets > 0 ? Math.round((count / totalPets) * 100) : 0
                const colors = {
                  Perros: 'bg-blue-500',
                  Gatos: 'bg-sky-400',
                  Otros: 'bg-slate-400'
                }
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{category}</span>
                      <span className="text-sm text-slate-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[category]} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Today's Appointments */}
        <Card className="lg:col-span-2" padding="p-0">
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Agenda de Hoy</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            {appointments.length > maxAppointments && (
              <Badge variant="info">
                Mostrando {maxAppointments} de {appointments.length}
              </Badge>
            )}
          </div>
          
          {/* Micro callout - Próxima cita con acento teal */}
          {nextAppointment && (
            <div className="px-6 pt-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-linear-to-r from-teal-50/80 to-sky-50/50 border border-teal-100/60 rounded-xl">
                <div className="w-1 h-8 bg-teal-400 rounded-full" />
                <HiOutlineClock className="w-4 h-4 text-teal-600" />
                <span className="font-medium text-slate-700">Próxima:</span>
                <span className="text-teal-700 font-semibold">{nextAppointment.time}</span>
                <span className="text-slate-300">•</span>
                <span className="font-medium text-slate-700">{nextAppointment.petName}</span>
              </div>
            </div>
          )}
          
          <div className="divide-y divide-slate-100">
            {appointmentsLoading ? (
              <div className="p-6">
                <LoadingSkeleton rows={4} />
              </div>
            ) : displayedAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <HiOutlineCalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No hay citas programadas para hoy</p>
              </div>
            ) : (
              displayedAppointments.map((appointment) => {
                // Buscar la mascota para obtener su foto
                const appointmentPet = pets.find(p => p.id === appointment.petId)
                const isInProgress = appointment.status === 'in-progress'
                
                return (
                  <div key={appointment.id} className={`relative flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors ${isInProgress ? 'bg-teal-50/30' : ''}`}>
                    {/* Indicador lateral teal para citas en progreso */}
                    {isInProgress && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-teal-400 rounded-r-full" />
                    )}
                    {/* Mini foto de mascota en lugar de icono */}
                    <PetMiniAvatar 
                      pet={appointmentPet || { name: appointment.petName, photoUrl: appointment.petPhotoUrl }} 
                      size={44}
                      className="ring-2 ring-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-800">{appointment.time}</p>
                        <span className="text-slate-300">•</span>
                        <p className="text-slate-600 truncate">{appointment.petName}</p>
                      </div>
                      <p className="text-sm text-slate-500 truncate">
                        {appointment.vetName} — {appointment.ownerName}
                      </p>
                    </div>
                    <Badge variant={appointment.status}>
                      {appointment.status === 'pending' ? 'Pendiente' : 
                       appointment.status === 'in-progress' ? 'En progreso' : 'Completada'}
                    </Badge>
                  </div>
                )
              })
            )}
          </div>
          
          {displayedAppointments.length > 0 && (
            <div className="p-4 border-t border-slate-100">
              <Link 
                to="/citas"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              >
                Ver todas las citas
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom section: Quick Actions + Recent Clients + Featured Pet */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/mascotas" className="group">
            <Card className="h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <HiOutlineHeart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">Ver Mascotas</h3>
                  <p className="text-sm text-slate-500">Consulta el listado completo de pacientes</p>
                </div>
                <HiOutlineArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link to="/citas" className="group">
            <Card className="h-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
                  <HiOutlineCalendarDays className="w-6 h-6 text-sky-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">Administrar Citas</h3>
                  <p className="text-sm text-slate-500">Revisa la agenda del día</p>
                </div>
                <HiOutlineArrowRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Clients Widget */}
        <Card className="lg:col-span-1" padding="p-0">
          <div className="p-5 pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Últimos clientes</h3>
          </div>
          
          {clientsLoading ? (
            <div className="p-5">
              <LoadingSkeleton rows={3} />
            </div>
          ) : recentClients.length === 0 ? (
            <div className="p-5 text-center text-sm text-slate-500">
              No hay clientes registrados
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentClients.slice(0, 4).map((client) => {
                const clientPetCount = pets.filter(p => p.ownerId === client.id).length
                return (
                  <div key={client.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/50 transition-colors">
                    {/* Avatar inicial */}
                    <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-white">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{client.name}</p>
                      <p className="text-xs text-slate-500">
                        {clientPetCount > 0 
                          ? `+${clientPetCount} mascota${clientPetCount > 1 ? 's' : ''}`
                          : 'Sin mascotas'
                        }
                      </p>
                    </div>
                    
                    <HiOutlineUser className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                )
              })}
            </div>
          )}
          
          <div className="p-3 border-t border-slate-100">
            <Link 
              to="/clientes"
              className="flex items-center justify-center gap-1.5 w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Ver clientes
              <HiOutlineArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>

        {/* Featured Pet Widget */}
        {!petsLoading && featuredPet && (
          <FeaturedPetCard pet={featuredPet} appointments={appointments} />
        )}
      </div>
    </div>
  )
}
