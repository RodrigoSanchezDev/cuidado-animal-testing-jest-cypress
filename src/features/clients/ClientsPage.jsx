import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  HiOutlinePhone, 
  HiOutlineMapPin, 
  HiOutlineEnvelope,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineHeart
} from 'react-icons/hi2'
import { Card, PageHeader, LoadingSkeleton, ErrorState, EmptyState } from '../../components'
import { useClients, usePets } from '../../hooks'

// Componente para foto de mascota con fallback
function PetPhoto({ pet }) {
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
  
  if (!pet.photoUrl || imgError) {
    return (
      <div className="w-12 h-12 bg-linear-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center text-xl">
        {getSpeciesEmoji(pet.species)}
      </div>
    )
  }
  
  return (
    <img 
      src={pet.photoUrl} 
      alt={pet.name}
      className="w-12 h-12 rounded-xl object-cover"
      onError={() => setImgError(true)}
    />
  )
}

export function ClientsPage() {
  const { clients, loading, error } = useClients()
  const { pets } = usePets()
  const [expandedClient, setExpandedClient] = useState(null)

  const toggleExpand = (clientId) => {
    setExpandedClient(expandedClient === clientId ? null : clientId)
  }

  const getClientPets = (clientId) => {
    return pets.filter(pet => pet.ownerId === clientId)
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Clientes" subtitle="Gestión de clientes de la veterinaria" />
        <Card>
          <ErrorState message={error} />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Clientes" 
        subtitle={`${clients.length} clientes registrados`}
      />

      <Card padding="p-0">
        {loading ? (
          <div className="p-6">
            <LoadingSkeleton rows={5} />
          </div>
        ) : clients.length === 0 ? (
          <EmptyState 
            title="No hay clientes"
            description="Aún no se han registrado clientes en el sistema."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {clients.map((client) => {
              const clientPets = getClientPets(client.id)
              const isExpanded = expandedClient === client.id
              
              return (
                <div key={client.id} className="hover:bg-slate-50/50 transition-colors">
                  <div 
                    className="flex items-center gap-4 p-4 lg:p-5 cursor-pointer"
                    onClick={() => toggleExpand(client.id)}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-white">
                        {client.name.charAt(0)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800">{client.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <HiOutlinePhone className="w-4 h-4" />
                          {client.phone}
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500">
                          <HiOutlineEnvelope className="w-4 h-4" />
                          {client.email}
                        </span>
                      </div>
                    </div>

                    {/* Pets count & expand */}
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                        <HiOutlineHeart className="w-4 h-4" />
                        <span className="text-sm font-medium">{clientPets.length}</span>
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

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                      <div className="ml-16 space-y-4">
                        {/* Address */}
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                          <HiOutlineMapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                          <span>{client.address}</span>
                        </div>

                        {/* Pets */}
                        {clientPets.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Mascotas</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {clientPets.map((pet) => (
                                <Link 
                                  key={pet.id}
                                  to="/mascotas"
                                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                                >
                                  <PetPhoto pet={pet} />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-700 group-hover:text-blue-700">{pet.name}</p>
                                    <p className="text-xs text-slate-500">{pet.species} • {pet.breed}</p>
                                    <p className="text-xs text-slate-400">{pet.age} {pet.age === 1 ? 'año' : 'años'}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
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
