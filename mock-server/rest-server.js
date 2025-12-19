import express from 'express'
import cors from 'cors'
import { clients, pets, vets, appointments } from './data.js'

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

// GET /api/clients - Get all clients
app.get('/api/clients', (req, res) => {
  res.json(clients)
})

// GET /api/pets - Get all pets
app.get('/api/pets', (req, res) => {
  res.json(pets)
})

// GET /api/vets - Get all veterinarians
app.get('/api/vets', (req, res) => {
  res.json(vets)
})

// GET /api/appointments - Get appointments by date
app.get('/api/appointments', (req, res) => {
  const { date } = req.query
  
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required (YYYY-MM-DD)' })
  }
  
  const filteredAppointments = appointments.filter(apt => apt.date === date)
  res.json(filteredAppointments)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'REST API', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 REST API server running at http://localhost:${PORT}`)
  console.log(`   Endpoints:`)
  console.log(`   - GET /api/clients`)
  console.log(`   - GET /api/pets`)
  console.log(`   - GET /api/vets`)
  console.log(`   - GET /api/appointments?date=YYYY-MM-DD`)
})
