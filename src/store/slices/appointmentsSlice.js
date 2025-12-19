import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAppointments } from '../../api/rest'

/**
 * Async thunk para cargar citas por fecha via REST
 * MSW intercepta la petición en el navegador
 */
export const loadAppointments = createAsyncThunk(
  'appointments/loadAppointments',
  async (date, { rejectWithValue }) => {
    try {
      const data = await fetchAppointments(date)
      // Ordenar por hora
      const sorted = data.sort((a, b) => a.time.localeCompare(b.time))
      return { date, appointments: sorted }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: [],
    currentDate: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    // Resetear cuando cambia la fecha
    resetAppointments: (state) => {
      state.items = []
      state.status = 'idle'
      state.currentDate = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppointments.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.appointments
        state.currentDate = action.payload.date
        state.error = null
      })
      .addCase(loadAppointments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { resetAppointments } = appointmentsSlice.actions
export default appointmentsSlice.reducer
