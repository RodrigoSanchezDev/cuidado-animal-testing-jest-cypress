import { createServer } from 'http'
import { createYoga, createSchema } from 'graphql-yoga'
import { clients, pets, vets, appointments } from './data.js'

const typeDefs = /* GraphQL */ `
  type MedicalRecord {
    date: String!
    description: String!
    vet: String!
  }

  type Client {
    id: ID!
    name: String!
    phone: String!
    email: String!
    address: String!
    petIds: [String!]!
  }

  type Pet {
    id: ID!
    name: String!
    species: String!
    breed: String!
    age: Int!
    ownerId: String!
    ownerName: String!
    medicalHistory: [MedicalRecord!]!
  }

  type Vet {
    id: ID!
    name: String!
    specialty: String!
    phone: String!
    email: String!
  }

  type Appointment {
    id: ID!
    date: String!
    time: String!
    petId: String!
    petName: String!
    ownerId: String!
    ownerName: String!
    vetId: String!
    vetName: String!
    reason: String!
    status: String!
  }

  type Query {
    clients: [Client!]!
    pets: [Pet!]!
    vets: [Vet!]!
    appointments(date: String!): [Appointment!]!
  }
`

const resolvers = {
  Query: {
    clients: () => clients,
    pets: () => pets,
    vets: () => vets,
    appointments: (_, { date }) => {
      return appointments.filter(apt => apt.date === date)
    }
  }
}

const schema = createSchema({
  typeDefs,
  resolvers
})

const yoga = createYoga({
  schema,
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS']
  }
})

const server = createServer(yoga)
const PORT = 4001

server.listen(PORT, () => {
  console.log(`🚀 GraphQL server running at http://localhost:${PORT}/graphql`)
  console.log(`   Queries available:`)
  console.log(`   - clients`)
  console.log(`   - pets`)
  console.log(`   - vets`)
  console.log(`   - appointments(date: String!)`)
})
