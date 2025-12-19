import { http, HttpResponse } from 'msw'
import { clients, pets, vets, appointments } from './data'

// REST API Handlers
const restHandlers = [
  // GET /api/clients
  http.get('/api/clients', () => {
    console.log('🟢 MSW: GET /api/clients')
    return HttpResponse.json(clients)
  }),

  // GET /api/pets
  http.get('/api/pets', () => {
    console.log('🟢 MSW: GET /api/pets')
    return HttpResponse.json(pets)
  }),

  // GET /api/vets
  http.get('/api/vets', () => {
    console.log('🟢 MSW: GET /api/vets')
    return HttpResponse.json(vets)
  }),

  // GET /api/appointments - with date and optional vetId filter
  http.get('/api/appointments', ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const vetId = url.searchParams.get('vetId')
    
    console.log('🟢 MSW: GET /api/appointments', { date, vetId })
    
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

// GraphQL Handler - intercepta POST /graphql
const graphqlHandler = http.post('/graphql', async ({ request }) => {
  const body = await request.json()
  const { query, variables = {} } = body
  
  console.log('🟣 MSW GraphQL: Request received')
  
  // Determinar qué query se está ejecutando
  if (query.includes('GetPets')) {
    console.log('🟣 MSW GraphQL: GetPets')
    return HttpResponse.json({
      data: { pets }
    })
  }
  
  if (query.includes('GetClients')) {
    console.log('🟣 MSW GraphQL: GetClients')
    return HttpResponse.json({
      data: { clients }
    })
  }
  
  if (query.includes('GetVets')) {
    console.log('🟣 MSW GraphQL: GetVets')
    return HttpResponse.json({
      data: { vets }
    })
  }
  
  if (query.includes('GetAppointments')) {
    console.log('🟣 MSW GraphQL: GetAppointments', variables)
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
