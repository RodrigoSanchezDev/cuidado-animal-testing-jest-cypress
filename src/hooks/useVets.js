import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadVets } from '../store'

/**
 * Hook para obtener veterinarios usando Redux + REST
 * Internamente usa Redux para estado global
 * La API pública del hook no cambia
 */
export function useVets() {
  const dispatch = useDispatch()
  const { items: vets, status, error } = useSelector((state) => state.vets)

  useEffect(() => {
    // Solo cargar si el estado es 'idle' (no cargado aún)
    if (status === 'idle') {
      dispatch(loadVets())
    }
  }, [status, dispatch])

  return {
    vets,
    loading: status === 'loading' || status === 'idle',
    error
  }
}
