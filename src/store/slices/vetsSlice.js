import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchVets } from '../../api/rest'

/**
 * Async thunk para cargar veterinarios via REST
 * MSW intercepta la petición en el navegador
 */
export const loadVets = createAsyncThunk(
  'vets/loadVets',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchVets()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const vetsSlice = createSlice({
  name: 'vets',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVets.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadVets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(loadVets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default vetsSlice.reducer
