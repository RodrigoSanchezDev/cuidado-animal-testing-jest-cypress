/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {string[]} petIds
 */

/**
 * @typedef {Object} Pet
 * @property {string} id
 * @property {string} name
 * @property {string} species
 * @property {string} breed
 * @property {number} age
 * @property {string} ownerId
 * @property {string} ownerName
 * @property {MedicalRecord[]} medicalHistory
 */

/**
 * @typedef {Object} MedicalRecord
 * @property {string} date
 * @property {string} description
 * @property {string} vet
 */

/**
 * @typedef {Object} Vet
 * @property {string} id
 * @property {string} name
 * @property {string} specialty
 * @property {string} phone
 * @property {string} email
 */

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} date
 * @property {string} time
 * @property {string} petId
 * @property {string} petName
 * @property {string} ownerId
 * @property {string} ownerName
 * @property {string} vetId
 * @property {string} vetName
 * @property {string} reason
 * @property {'pending' | 'in-progress' | 'completed'} status
 */

export {}
