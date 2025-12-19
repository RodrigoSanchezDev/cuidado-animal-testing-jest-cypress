// BASE_URL dinámico: '/' en local, '/<repo>/' en GitHub Pages
const REST_API_URL = `${import.meta.env.BASE_URL}api`

/**
 * Fetch all clients from REST API
 * @returns {Promise<import('./types').Client[]>}
 */
export async function fetchClients() {
  const response = await fetch(`${REST_API_URL}/clients`)
  if (!response.ok) {
    throw new Error('Error fetching clients')
  }
  return response.json()
}

/**
 * Fetch all pets from REST API
 * @returns {Promise<import('./types').Pet[]>}
 */
export async function fetchPets() {
  const response = await fetch(`${REST_API_URL}/pets`)
  if (!response.ok) {
    throw new Error('Error fetching pets')
  }
  return response.json()
}

/**
 * Fetch all vets from REST API
 * @returns {Promise<import('./types').Vet[]>}
 */
export async function fetchVets() {
  const response = await fetch(`${REST_API_URL}/vets`)
  if (!response.ok) {
    throw new Error('Error fetching vets')
  }
  return response.json()
}

/**
 * Fetch appointments by date from REST API
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<import('./types').Appointment[]>}
 */
export async function fetchAppointments(date) {
  const response = await fetch(`${REST_API_URL}/appointments?date=${date}`)
  if (!response.ok) {
    throw new Error('Error fetching appointments')
  }
  return response.json()
}
