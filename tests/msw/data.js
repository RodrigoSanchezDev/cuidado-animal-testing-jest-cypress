/**
 * Mock Data determinístico para tests unitarios
 * Datos fijos (sin generación dinámica) para tests predecibles
 */

// Fecha fija para tests - usamos una fecha estática
export const TEST_DATE = '2025-12-18'

export const clients = [
  { 
    id: 'c1', 
    name: 'María González', 
    phone: '+56 9 1234 5678', 
    email: 'maria.gonzalez@email.com', 
    address: 'Av. Providencia 1234, Santiago', 
    petIds: ['p1', 'p2'] 
  },
  { 
    id: 'c2', 
    name: 'Carlos Rodríguez', 
    phone: '+56 9 2345 6789', 
    email: 'carlos.rodriguez@email.com', 
    address: 'Los Leones 567, Providencia', 
    petIds: ['p3'] 
  },
  { 
    id: 'c3', 
    name: 'Ana Martínez', 
    phone: '+56 9 3456 7890', 
    email: 'ana.martinez@email.com', 
    address: 'Av. Apoquindo 890, Las Condes', 
    petIds: ['p4', 'p5'] 
  },
  { 
    id: 'c4', 
    name: 'Pedro Silva', 
    phone: '+56 9 4567 8901', 
    email: 'pedro.silva@email.com', 
    address: 'Av. Italia 321, Ñuñoa', 
    petIds: ['p6'] 
  },
  { 
    id: 'c5', 
    name: 'Laura Fernández', 
    phone: '+56 9 5678 9012', 
    email: 'laura.fernandez@email.com', 
    address: 'Manuel Montt 456, Providencia', 
    petIds: ['p7'] 
  },
]

export const pets = [
  { 
    id: 'p1', 
    name: 'Max', 
    species: 'Perro', 
    breed: 'Golden Retriever', 
    age: 3, 
    ownerId: 'c1', 
    ownerName: 'María González', 
    photoUrl: '/images/pets/pet-01.jpg', 
    medicalHistory: [
      { date: '2024-08-15', description: 'Vacuna antirrábica', vet: 'Dr. Muñoz' },
      { date: '2024-06-10', description: 'Control general - Buen estado', vet: 'Dra. Soto' }
    ]
  },
  { 
    id: 'p2', 
    name: 'Luna', 
    species: 'Gato', 
    breed: 'Siamés', 
    age: 2, 
    ownerId: 'c1', 
    ownerName: 'María González', 
    photoUrl: '/images/pets/pet-02.jpg', 
    medicalHistory: [
      { date: '2024-09-20', description: 'Esterilización', vet: 'Dra. Soto' }
    ]
  },
  { 
    id: 'p3', 
    name: 'Rocky', 
    species: 'Perro', 
    breed: 'Bulldog Francés', 
    age: 4, 
    ownerId: 'c2', 
    ownerName: 'Carlos Rodríguez', 
    photoUrl: '/images/pets/pet-03.jpg', 
    medicalHistory: [
      { date: '2024-07-05', description: 'Tratamiento dermatológico', vet: 'Dr. Muñoz' }
    ]
  },
  { 
    id: 'p4', 
    name: 'Mia', 
    species: 'Gato', 
    breed: 'Persa', 
    age: 5, 
    ownerId: 'c3', 
    ownerName: 'Ana Martínez', 
    photoUrl: '/images/pets/pet-04.jpg', 
    medicalHistory: []
  },
  { 
    id: 'p5', 
    name: 'Simba', 
    species: 'Gato', 
    breed: 'Maine Coon', 
    age: 1, 
    ownerId: 'c3', 
    ownerName: 'Ana Martínez', 
    photoUrl: '/images/pets/pet-05.jpg', 
    medicalHistory: [
      { date: '2024-10-01', description: 'Primera vacuna', vet: 'Dr. Muñoz' }
    ]
  },
  { 
    id: 'p6', 
    name: 'Toby', 
    species: 'Perro', 
    breed: 'Beagle', 
    age: 6, 
    ownerId: 'c4', 
    ownerName: 'Pedro Silva', 
    photoUrl: '/images/pets/pet-06.jpg', 
    medicalHistory: []
  },
  { 
    id: 'p7', 
    name: 'Coco', 
    species: 'Ave', 
    breed: 'Cacatúa', 
    age: 8, 
    ownerId: 'c5', 
    ownerName: 'Laura Fernández', 
    photoUrl: '/images/pets/pet-07.jpg', 
    medicalHistory: []
  },
]

export const vets = [
  { 
    id: 'v1', 
    name: 'Dr. Alejandro Muñoz', 
    specialty: 'Medicina General', 
    phone: '+56 9 1111 2222', 
    email: 'a.munoz@cuidadoanimal.cl', 
    avatarUrl: '/images/vets/vet-01.jpg' 
  },
  { 
    id: 'v2', 
    name: 'Dra. Carolina Soto', 
    specialty: 'Cirugía', 
    phone: '+56 9 2222 3333', 
    email: 'c.soto@cuidadoanimal.cl', 
    avatarUrl: '/images/vets/vet-02.jpg' 
  },
  { 
    id: 'v3', 
    name: 'Dra. Patricia Vargas', 
    specialty: 'Dermatología', 
    phone: '+56 9 3333 4444', 
    email: 'p.vargas@cuidadoanimal.cl', 
    avatarUrl: '/images/vets/vet-03.jpg' 
  },
  { 
    id: 'v4', 
    name: 'Dr. Roberto Paz', 
    specialty: 'Cardiología', 
    phone: '+56 9 4444 5555', 
    email: 'r.paz@cuidadoanimal.cl', 
    avatarUrl: '/images/vets/vet-04.jpg' 
  },
]

// 10 citas para el TEST_DATE - permite probar el límite de 8
export const appointments = [
  {
    id: 'a1',
    date: TEST_DATE,
    time: '08:00',
    petId: 'p1',
    petName: 'Max',
    petPhotoUrl: '/images/pets/pet-01.jpg',
    ownerId: 'c1',
    ownerName: 'María González',
    vetId: 'v1',
    vetName: 'Dr. Alejandro Muñoz',
    reason: 'Control general',
    status: 'completed'
  },
  {
    id: 'a2',
    date: TEST_DATE,
    time: '08:30',
    petId: 'p2',
    petName: 'Luna',
    petPhotoUrl: '/images/pets/pet-02.jpg',
    ownerId: 'c1',
    ownerName: 'María González',
    vetId: 'v2',
    vetName: 'Dra. Carolina Soto',
    reason: 'Vacunación',
    status: 'completed'
  },
  {
    id: 'a3',
    date: TEST_DATE,
    time: '09:00',
    petId: 'p3',
    petName: 'Rocky',
    petPhotoUrl: '/images/pets/pet-03.jpg',
    ownerId: 'c2',
    ownerName: 'Carlos Rodríguez',
    vetId: 'v1',
    vetName: 'Dr. Alejandro Muñoz',
    reason: 'Revisión post-operatoria',
    status: 'in-progress'
  },
  {
    id: 'a4',
    date: TEST_DATE,
    time: '09:30',
    petId: 'p4',
    petName: 'Mia',
    petPhotoUrl: '/images/pets/pet-04.jpg',
    ownerId: 'c3',
    ownerName: 'Ana Martínez',
    vetId: 'v3',
    vetName: 'Dra. Patricia Vargas',
    reason: 'Consulta dermatológica',
    status: 'pending'
  },
  {
    id: 'a5',
    date: TEST_DATE,
    time: '10:00',
    petId: 'p5',
    petName: 'Simba',
    petPhotoUrl: '/images/pets/pet-05.jpg',
    ownerId: 'c3',
    ownerName: 'Ana Martínez',
    vetId: 'v1',
    vetName: 'Dr. Alejandro Muñoz',
    reason: 'Desparasitación',
    status: 'pending'
  },
  {
    id: 'a6',
    date: TEST_DATE,
    time: '10:30',
    petId: 'p6',
    petName: 'Toby',
    petPhotoUrl: '/images/pets/pet-06.jpg',
    ownerId: 'c4',
    ownerName: 'Pedro Silva',
    vetId: 'v2',
    vetName: 'Dra. Carolina Soto',
    reason: 'Control de peso',
    status: 'pending'
  },
  {
    id: 'a7',
    date: TEST_DATE,
    time: '11:00',
    petId: 'p7',
    petName: 'Coco',
    petPhotoUrl: '/images/pets/pet-07.jpg',
    ownerId: 'c5',
    ownerName: 'Laura Fernández',
    vetId: 'v4',
    vetName: 'Dr. Roberto Paz',
    reason: 'Limpieza dental',
    status: 'pending'
  },
  {
    id: 'a8',
    date: TEST_DATE,
    time: '11:30',
    petId: 'p1',
    petName: 'Max',
    petPhotoUrl: '/images/pets/pet-01.jpg',
    ownerId: 'c1',
    ownerName: 'María González',
    vetId: 'v3',
    vetName: 'Dra. Patricia Vargas',
    reason: 'Consulta urgente',
    status: 'pending'
  },
  // Citas 9 y 10 - NO deben mostrarse (límite de 8)
  {
    id: 'a9',
    date: TEST_DATE,
    time: '14:00',
    petId: 'p2',
    petName: 'Luna',
    petPhotoUrl: '/images/pets/pet-02.jpg',
    ownerId: 'c1',
    ownerName: 'María González',
    vetId: 'v1',
    vetName: 'Dr. Alejandro Muñoz',
    reason: 'Control post-vacuna',
    status: 'pending'
  },
  {
    id: 'a10',
    date: TEST_DATE,
    time: '14:30',
    petId: 'p3',
    petName: 'Rocky',
    petPhotoUrl: '/images/pets/pet-03.jpg',
    ownerId: 'c2',
    ownerName: 'Carlos Rodríguez',
    vetId: 'v2',
    vetName: 'Dra. Carolina Soto',
    reason: 'Revisión de herida',
    status: 'pending'
  },
]

// Citas por veterinario (para VetAgendaPage)
export const appointmentsForVet1 = appointments.filter(a => a.vetId === 'v1')
