import { useState } from 'react'
import { 
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineDocumentText
} from 'react-icons/hi2'
import { Card, PageHeader, Badge, LoadingSkeleton, ErrorState, EmptyState } from '../../components'
import { usePets } from '../../hooks'

// Componente Avatar para mascotas con foto real y fallback
function PetAvatar({ pet, size = 'md' }) {
  const [imgError, setImgError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-32 h-32'
  }
  
  const getSpeciesEmoji = (species) => {
    switch (species?.toLowerCase()) {
      case 'perro': return '🐕'
      case 'gato': return '🐱'
      case 'ave': return '🦜'
      case 'conejo': return '🐰'
      default: return '🐾'
    }
  }
  
  if (!pet.photoUrl || imgError) {
    return (
      <div className={`${sizeClasses[size]} bg-linear-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center text-2xl shrink-0`}>
        {getSpeciesEmoji(pet.species)}
      </div>
    )
  }
  
  return (
    <img 
      src={pet.photoUrl} 
      alt={pet.name}
      className={`${sizeClasses[size]} rounded-xl object-cover shrink-0`}
      onError={() => setImgError(true)}
    />
  )
}

export function PetsPage() {
  const { pets, loading, error } = usePets()
  const [expandedPet, setExpandedPet] = useState(null)

  const toggleExpand = (petId) => {
    setExpandedPet(expandedPet === petId ? null : petId)
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Mascotas" subtitle="Listado de pacientes" />
        <Card>
          <ErrorState message={error} />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Mascotas" 
        subtitle={`${pets.length} mascotas registradas`}
      />

      <Card padding="p-0">
        {loading ? (
          <div className="p-6">
            <LoadingSkeleton rows={5} />
          </div>
        ) : pets.length === 0 ? (
          <EmptyState 
            icon={HiOutlineHeart}
            title="No hay mascotas"
            description="Aún no se han registrado mascotas en el sistema."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {pets.map((pet) => {
              const isExpanded = expandedPet === pet.id
              
              return (
                <div key={pet.id} className="hover:bg-slate-50/50 transition-colors">
                  <div 
                    className="flex items-center gap-4 p-4 lg:p-5 cursor-pointer"
                    onClick={() => toggleExpand(pet.id)}
                  >
                    {/* Avatar con foto */}
                    <PetAvatar pet={pet} size="md" />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{pet.name}</h3>
                        <Badge variant="default">{pet.species}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="text-sm text-slate-500">{pet.breed}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500">{pet.age} {pet.age === 1 ? 'año' : 'años'}</span>
                      </div>
                    </div>

                    {/* Owner & expand */}
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                        <HiOutlineUser className="w-4 h-4 text-slate-400" />
                        <span>{pet.ownerName}</span>
                      </div>
                      <button className="p-2 hover:bg-slate-200/50 rounded-lg transition-colors">
                        {isExpanded ? (
                          <HiOutlineChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <HiOutlineChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded content - Medical History + Foto grande */}
                  {isExpanded && (
                    <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                      <div className="ml-0 lg:ml-16 grid gap-6 lg:grid-cols-[200px_1fr]">
                        {/* Foto grande */}
                        <div className="flex justify-center lg:justify-start">
                          <PetAvatar pet={pet} size="lg" />
                        </div>

                        <div>
                          {/* Owner info for mobile */}
                          <div className="sm:hidden mb-4 flex items-center gap-2 text-sm text-slate-600">
                            <HiOutlineUser className="w-4 h-4 text-slate-400" />
                            <span>Dueño: {pet.ownerName}</span>
                          </div>

                          {/* Medical History */}
                          <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                              <HiOutlineDocumentText className="w-4 h-4" />
                              Historial Médico
                            </h4>
                            
                            {pet.medicalHistory && pet.medicalHistory.length > 0 ? (
                              <div className="space-y-3">
                                {pet.medicalHistory.map((record, index) => (
                                  <div 
                                    key={index}
                                    className="p-3 bg-slate-50 rounded-xl border border-slate-100"
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-slate-700">
                                        {new Date(record.date).toLocaleDateString('es-CL')}
                                      </span>
                                      <span className="text-xs text-slate-500">{record.vet}</span>
                                    </div>
                                    <p className="text-sm text-slate-600">{record.description}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-slate-500 italic">Sin historial médico registrado</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
