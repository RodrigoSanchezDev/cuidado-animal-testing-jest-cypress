import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadClients } from '../store'

/**
 * Hook para obtener clientes usando Redux + REST
 * Internamente usa Redux para estado global
 * La API pública del hook no cambia
 */
export function useClients() {
  const dispatch = useDispatch()
  const { items: clients, status, error } = useSelector((state) => state.clients)

  useEffect(() => {
    // Solo cargar si el estado es 'idle' (no cargado aún)
    if (status === 'idle') {
      dispatch(loadClients())
    }
  }, [status, dispatch])

  return {
    clients,
    loading: status === 'loading' || status === 'idle',
    error
  }
}
