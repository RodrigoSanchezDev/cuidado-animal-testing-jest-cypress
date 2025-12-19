// Mock Data for Cuidado Animal Veterinary System

export const clients = [
  { id: 'c1', name: 'María González', phone: '+56 9 1234 5678', email: 'maria.gonzalez@email.com', address: 'Av. Providencia 1234, Santiago', petIds: ['p1', 'p2'] },
  { id: 'c2', name: 'Carlos Rodríguez', phone: '+56 9 2345 6789', email: 'carlos.rodriguez@email.com', address: 'Los Leones 567, Providencia', petIds: ['p3'] },
  { id: 'c3', name: 'Ana Martínez', phone: '+56 9 3456 7890', email: 'ana.martinez@email.com', address: 'Av. Apoquindo 890, Las Condes', petIds: ['p4', 'p5'] },
  { id: 'c4', name: 'Pedro Silva', phone: '+56 9 4567 8901', email: 'pedro.silva@email.com', address: 'Av. Italia 321, Ñuñoa', petIds: ['p6'] },
  { id: 'c5', name: 'Laura Fernández', phone: '+56 9 5678 9012', email: 'laura.fernandez@email.com', address: 'Manuel Montt 456, Providencia', petIds: ['p7'] },
  { id: 'c6', name: 'Diego Morales', phone: '+56 9 6789 0123', email: 'diego.morales@email.com', address: 'Av. Ossa 789, La Reina', petIds: ['p8', 'p9'] },
  { id: 'c7', name: 'Valentina Castro', phone: '+56 9 7890 1234', email: 'valentina.castro@email.com', address: 'Bilbao 234, Providencia', petIds: ['p10'] },
  { id: 'c8', name: 'Francisco López', phone: '+56 9 8901 2345', email: 'francisco.lopez@email.com', address: 'Av. Vitacura 5678, Vitacura', petIds: ['p11'] },
  { id: 'c9', name: 'Camila Herrera', phone: '+56 9 9012 3456', email: 'camila.herrera@email.com', address: 'Pocuro 890, Providencia', petIds: ['p12'] },
  { id: 'c10', name: 'Sebastián Díaz', phone: '+56 9 0123 4567', email: 'sebastian.diaz@email.com', address: 'Av. Las Condes 1234, Las Condes', petIds: [] },
]

export const pets = [
  { id: 'p1', name: 'Max', species: 'Perro', breed: 'Golden Retriever', age: 3, ownerId: 'c1', ownerName: 'María González', medicalHistory: [
    { date: '2024-08-15', description: 'Vacuna antirrábica', vet: 'Dr. Muñoz' },
    { date: '2024-06-10', description: 'Control general - Buen estado', vet: 'Dra. Soto' }
  ]},
  { id: 'p2', name: 'Luna', species: 'Gato', breed: 'Siamés', age: 2, ownerId: 'c1', ownerName: 'María González', medicalHistory: [
    { date: '2024-09-20', description: 'Esterilización', vet: 'Dra. Soto' }
  ]},
  { id: 'p3', name: 'Rocky', species: 'Perro', breed: 'Bulldog Francés', age: 4, ownerId: 'c2', ownerName: 'Carlos Rodríguez', medicalHistory: [
    { date: '2024-07-05', description: 'Tratamiento dermatológico', vet: 'Dr. Muñoz' },
    { date: '2024-05-12', description: 'Limpieza dental', vet: 'Dra. Vargas' }
  ]},
  { id: 'p4', name: 'Mia', species: 'Gato', breed: 'Persa', age: 5, ownerId: 'c3', ownerName: 'Ana Martínez', medicalHistory: []},
  { id: 'p5', name: 'Simba', species: 'Gato', breed: 'Maine Coon', age: 1, ownerId: 'c3', ownerName: 'Ana Martínez', medicalHistory: [
    { date: '2024-10-01', description: 'Primera vacuna', vet: 'Dr. Muñoz' }
  ]},
  { id: 'p6', name: 'Toby', species: 'Perro', breed: 'Beagle', age: 6, ownerId: 'c4', ownerName: 'Pedro Silva', medicalHistory: [
    { date: '2024-04-22', description: 'Cirugía menor - Lipoma', vet: 'Dra. Soto' }
  ]},
  { id: 'p7', name: 'Coco', species: 'Ave', breed: 'Cacatúa', age: 8, ownerId: 'c5', ownerName: 'Laura Fernández', medicalHistory: []},
  { id: 'p8', name: 'Bruno', species: 'Perro', breed: 'Pastor Alemán', age: 2, ownerId: 'c6', ownerName: 'Diego Morales', medicalHistory: [
    { date: '2024-11-10', description: 'Vacunación completa', vet: 'Dra. Vargas' }
  ]},
  { id: 'p9', name: 'Nala', species: 'Perro', breed: 'Labrador', age: 4, ownerId: 'c6', ownerName: 'Diego Morales', medicalHistory: []},
  { id: 'p10', name: 'Michi', species: 'Gato', breed: 'Común Europeo', age: 3, ownerId: 'c7', ownerName: 'Valentina Castro', medicalHistory: [
    { date: '2024-08-30', description: 'Control de peso', vet: 'Dr. Muñoz' }
  ]},
  { id: 'p11', name: 'Thor', species: 'Perro', breed: 'Rottweiler', age: 5, ownerId: 'c8', ownerName: 'Francisco López', medicalHistory: []},
  { id: 'p12', name: 'Pelusa', species: 'Conejo', breed: 'Holland Lop', age: 2, ownerId: 'c9', ownerName: 'Camila Herrera', medicalHistory: [
    { date: '2024-09-15', description: 'Revisión dental', vet: 'Dra. Vargas' }
  ]},
]

export const vets = [
  { id: 'v1', name: 'Dr. Alejandro Muñoz', specialty: 'Medicina General', phone: '+56 9 1111 2222', email: 'a.munoz@cuidadoanimal.cl' },
  { id: 'v2', name: 'Dra. Carolina Soto', specialty: 'Cirugía', phone: '+56 9 2222 3333', email: 'c.soto@cuidadoanimal.cl' },
  { id: 'v3', name: 'Dra. Patricia Vargas', specialty: 'Dermatología', phone: '+56 9 3333 4444', email: 'p.vargas@cuidadoanimal.cl' },
  { id: 'v4', name: 'Dr. Roberto Paz', specialty: 'Cardiología', phone: '+56 9 4444 5555', email: 'r.paz@cuidadoanimal.cl' },
]

// Generate appointments for today and nearby dates
const generateAppointments = () => {
  const today = new Date()
  const appointments = []
  
  const reasons = [
    'Control general',
    'Vacunación',
    'Revisión post-operatoria',
    'Consulta dermatológica',
    'Desparasitación',
    'Control de peso',
    'Limpieza dental',
    'Consulta urgente'
  ]
  
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
  
  // Generate appointments for -2 to +5 days from today
  for (let dayOffset = -2; dayOffset <= 5; dayOffset++) {
    const date = new Date(today)
    date.setDate(date.getDate() + dayOffset)
    const dateStr = date.toISOString().split('T')[0]
    
    // Random number of appointments per day (3-10)
    const numAppointments = Math.floor(Math.random() * 8) + 3
    const usedTimes = new Set()
    
    for (let i = 0; i < numAppointments; i++) {
      let time
      do {
        time = times[Math.floor(Math.random() * times.length)]
      } while (usedTimes.has(time))
      usedTimes.add(time)
      
      const pet = pets[Math.floor(Math.random() * pets.length)]
      const vet = vets[Math.floor(Math.random() * vets.length)]
      
      // Past appointments are completed, today can be any status, future are pending
      let status
      if (dayOffset < 0) {
        status = 'completed'
      } else if (dayOffset === 0) {
        const hour = parseInt(time.split(':')[0])
        const currentHour = today.getHours()
        if (hour < currentHour) {
          status = 'completed'
        } else if (hour === currentHour) {
          status = 'in-progress'
        } else {
          status = 'pending'
        }
      } else {
        status = 'pending'
      }
      
      appointments.push({
        id: `a${appointments.length + 1}`,
        date: dateStr,
        time,
        petId: pet.id,
        petName: pet.name,
        ownerId: pet.ownerId,
        ownerName: pet.ownerName,
        vetId: vet.id,
        vetName: vet.name,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        status
      })
    }
  }
  
  return appointments.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return a.time.localeCompare(b.time)
  })
}

export const appointments = generateAppointments()
