import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPetsGraphQL } from '../../api/graphql'

/**
 * Async thunk para cargar mascotas via GraphQL
 * MSW intercepta la petición en el navegador
 */
export const loadPets = createAsyncThunk(
  'pets/loadPets',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPetsGraphQL()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPets.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(loadPets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default petsSlice.reducer
