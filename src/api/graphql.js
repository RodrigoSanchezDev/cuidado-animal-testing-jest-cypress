/**
 * GraphQL API Client
 * Usa fetch nativo para que MSW pueda interceptar las peticiones
 * Sin dependencias externas - compatible con MSW browser mock
 */

// BASE_URL dinámico: '/' en local, '/<repo>/' en GitHub Pages
const GRAPHQL_API_URL = `${import.meta.env.BASE_URL}graphql`

/**
 * Ejecuta una query GraphQL usando fetch nativo (compatible con MSW)
 * @param {string} query - La query GraphQL
 * @param {object} variables - Variables opcionales
 * @returns {Promise<any>}
 */
async function graphqlFetch(query, variables = {}) {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`)
  }

  const json = await response.json()
  
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL Error')
  }

  return json.data
}

/**
 * Fetch all pets via GraphQL
 * @returns {Promise<import('./types').Pet[]>}
 */
export async function fetchPetsGraphQL() {
  const query = `
    query GetPets {
      pets {
        id
        name
        species
        breed
        age
        ownerId
        ownerName
        photoUrl
        medicalHistory {
          date
          description
          vet
        }
      }
    }
  `
  const data = await graphqlFetch(query)
  return data.pets
}

/**
 * Fetch all vets via GraphQL
 * @returns {Promise<import('./types').Vet[]>}
 */
export async function fetchVetsGraphQL() {
  const query = `
    query GetVets {
      vets {
        id
        name
        specialty
        phone
        email
        avatarUrl
      }
    }
  `
  const data = await graphqlFetch(query)
  return data.vets
}

/**
 * Fetch all clients via GraphQL
 * @returns {Promise<import('./types').Client[]>}
 */
export async function fetchClientsGraphQL() {
  const query = `
    query GetClients {
      clients {
        id
        name
        phone
        email
        address
        petIds
      }
    }
  `
  const data = await graphqlFetch(query)
  return data.clients
}

/**
 * Fetch appointments by date via GraphQL
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} vetId - Optional vet ID filter
 * @returns {Promise<import('./types').Appointment[]>}
 */
export async function fetchAppointmentsGraphQL(date, vetId = null) {
  const query = `
    query GetAppointments($date: String!, $vetId: String) {
      appointments(date: $date, vetId: $vetId) {
        id
        date
        time
        petId
        petName
        petPhotoUrl
        ownerId
        ownerName
        vetId
        vetName
        reason
        status
      }
    }
  `
  const data = await graphqlFetch(query, { date, vetId })
  return data.appointments
}
