import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAppointments, resetAppointments } from '../store'

/**
 * Hook para obtener citas por fecha usando Redux + REST
 * Internamente usa Redux para estado global
 * La API pública del hook no cambia
 */
export function useAppointments(date) {
  const dispatch = useDispatch()
  const { items: appointments, status, error, currentDate } = useSelector((state) => state.appointments)

  useEffect(() => {
    if (!date) return

    // Si la fecha cambió, necesitamos recargar
    if (date !== currentDate) {
      dispatch(loadAppointments(date))
    }
  }, [date, currentDate, dispatch])

  // Cleanup cuando el componente se desmonta o la fecha es null
  useEffect(() => {
    return () => {
      // Opcional: resetear al desmontar si es necesario
      // dispatch(resetAppointments())
    }
  }, [])

  return {
    appointments,
    loading: status === 'loading' || (status === 'idle' && date),
    error
  }
}
