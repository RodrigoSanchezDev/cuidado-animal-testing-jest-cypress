import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPets } from '../store'

/**
 * Hook para obtener mascotas usando Redux + GraphQL
 * Internamente usa Redux para estado global
 * La API pública del hook no cambia
 */
export function usePets() {
  const dispatch = useDispatch()
  const { items: pets, status, error } = useSelector((state) => state.pets)

  useEffect(() => {
    // Solo cargar si el estado es 'idle' (no cargado aún)
    if (status === 'idle') {
      dispatch(loadPets())
    }
  }, [status, dispatch])

  return {
    pets,
    loading: status === 'loading' || status === 'idle',
    error
  }
}
