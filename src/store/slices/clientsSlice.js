import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchClients } from '../../api/rest'

/**
 * Async thunk para cargar clientes via REST
 * MSW intercepta la petición en el navegador
 */
export const loadClients = createAsyncThunk(
  'clients/loadClients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchClients()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadClients.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadClients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(loadClients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default clientsSlice.reducer
