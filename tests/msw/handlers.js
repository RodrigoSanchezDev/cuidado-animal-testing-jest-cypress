/**
 * MSW Handlers para tests unitarios (Node.js)
 * Misma estructura que src/mocks/handlers.js pero con datos determinísticos
 * para tests predecibles
 */

import { http, HttpResponse, delay } from 'msw'
import { clients, pets, vets, appointments } from './data'

// REST API Handlers - usar * para interceptar cualquier base URL
const restHandlers = [
  // GET /api/clients
  http.get('*/api/clients', () => {
    return HttpResponse.json(clients)
  }),

  // GET /api/pets
  http.get('*/api/pets', () => {
    return HttpResponse.json(pets)
  }),

  // GET /api/vets
  http.get('*/api/vets', () => {
    return HttpResponse.json(vets)
  }),

  // GET /api/appointments - with date and optional vetId filter
  http.get('*/api/appointments', ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const vetId = url.searchParams.get('vetId')
    
    let filtered = appointments
    
    if (date) {
      filtered = filtered.filter(a => a.date === date)
    }
    
    if (vetId) {
      filtered = filtered.filter(a => a.vetId === vetId)
    }
    
    return HttpResponse.json(filtered)
  }),
]

// GraphQL Handler - intercepta POST /graphql (cualquier host)
const graphqlHandler = http.post('*/graphql', async ({ request }) => {
  const body = await request.json()
  const { query, variables = {} } = body
  
  // Determinar qué query se está ejecutando
  if (query.includes('GetPets')) {
    return HttpResponse.json({
      data: { pets }
    })
  }
  
  if (query.includes('GetClients')) {
    return HttpResponse.json({
      data: { clients }
    })
  }
  
  if (query.includes('GetVets')) {
    return HttpResponse.json({
      data: { vets }
    })
  }
  
  if (query.includes('GetAppointments')) {
    let filtered = appointments
    
    if (variables.date) {
      filtered = filtered.filter(a => a.date === variables.date)
    }
    
    if (variables.vetId) {
      filtered = filtered.filter(a => a.vetId === variables.vetId)
    }
    
    return HttpResponse.json({
      data: { appointments: filtered }
    })
  }
  
  // Query no reconocida
  return HttpResponse.json({
    errors: [{ message: 'Unknown query' }]
  }, { status: 400 })
})

export const handlers = [...restHandlers, graphqlHandler]

// ============================================
// HANDLERS ESPECIALES PARA TESTS
// ============================================

/**
 * Handler que simula delay (para tests de loading state)
 */
export const delayedClientHandler = http.get('/api/clients', async () => {
  await delay(500) // 500ms de delay
  return HttpResponse.json(clients)
})

/**
 * Handler que simula error 500 (para tests de error state)
 */
export const errorClientHandler = http.get('/api/clients', () => {
  return HttpResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 }
  )
})

/**
 * Handler que simula error GraphQL
 */
export const errorGraphQLHandler = http.post('/graphql', () => {
  return HttpResponse.json(
    { errors: [{ message: 'GraphQL Server Error' }] },
    { status: 500 }
  )
})
