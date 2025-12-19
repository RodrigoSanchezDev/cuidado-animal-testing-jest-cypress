import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  HiOutlineUserCircle,
  HiOutlineCalendarDays,
  HiOutlineEnvelope,
  HiOutlinePhone
} from 'react-icons/hi2'
import { Card, PageHeader, LoadingSkeleton, ErrorState, EmptyState } from '../../components'
import { useVets } from '../../hooks'

// Componente Avatar con fallback
function VetAvatar({ vet, size = 'md' }) {
  const [imgError, setImgError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl'
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

export function VetsPage() {
  const { vets, loading, error } = useVets()

  if (error) {
    return (
      <div>
        <PageHeader title="Veterinarios" subtitle="Equipo médico" />
        <Card>
          <ErrorState message={error} />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Veterinarios" 
        subtitle={`${vets.length} profesionales en nuestro equipo`}
      />

      {loading ? (
        <Card>
          <LoadingSkeleton rows={4} />
        </Card>
      ) : vets.length === 0 ? (
        <Card>
          <EmptyState 
            icon={HiOutlineUserCircle}
            title="No hay veterinarios"
            description="Aún no se han registrado veterinarios en el sistema."
          />
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {vets.map((vet) => (
            <Card key={vet.id} padding="p-6">
              <div className="flex gap-5">
                {/* Avatar */}
                <div className="shrink-0">
                  <VetAvatar vet={vet} size="md" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-slate-800">{vet.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{vet.specialty}</p>
                  
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <HiOutlinePhone className="w-4 h-4 text-slate-400" />
                      <span>{vet.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <HiOutlineEnvelope className="w-4 h-4 text-slate-400" />
                      <span>{vet.email}</span>
                    </div>
                  </div>

                  {/* Link a agenda */}
                  <Link 
                    to={`/veterinarios/${vet.id}`}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    Ver agenda
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
