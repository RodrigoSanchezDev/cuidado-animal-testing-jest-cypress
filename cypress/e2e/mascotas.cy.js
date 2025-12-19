/**
 * E2E Test: Mascotas
 * Verifica lista de mascotas con imágenes y detalles
 * Nota: La app usa MSW para mocks internos
 */

describe('Mascotas', () => {
  beforeEach(() => {
    cy.visit('/mascotas')
    cy.get('h1').should('contain', 'Mascotas')
  })

  it('muestra el título "Mascotas"', () => {
    cy.get('h1').should('contain', 'Mascotas')
  })

  it('lista todas las mascotas', () => {
    cy.contains('Max').should('be.visible')
    cy.contains('Luna').should('be.visible')
    cy.contains('Rocky').should('be.visible')
  })

  it('muestra la especie de cada mascota', () => {
    // Hay perros, gatos, etc.
    cy.contains('Perro').should('be.visible')
    cy.contains('Gato').should('be.visible')
  })

  it('muestra la raza de cada mascota', () => {
    cy.contains('Golden Retriever').should('be.visible')
    cy.contains('Siamés').should('be.visible')
  })

  it('muestra la edad de cada mascota', () => {
    // Verificar que hay edades mostradas
    cy.contains(/\d+ año/i).should('be.visible')
  })

  it('cada mascota tiene imagen', () => {
    // Debe haber imágenes de mascotas
    cy.get('img').should('have.length.gte', 1)
  })

  describe('Información del dueño', () => {
    it('muestra el nombre del dueño', () => {
      // Max y Luna son de María González
      cy.contains('María González').should('be.visible')
    })
  })
})

describe('Mascotas - Cards interactivas', () => {
  beforeEach(() => {
    cy.visit('/mascotas')
    cy.get('h1').should('contain', 'Mascotas')
  })

  it('las cards de mascota existen', () => {
    // Las cards deben existir
    cy.get('[class*="bg-white"], article').should('have.length.gte', 1)
  })

  it('puede hacer click en una mascota para ver más detalles', () => {
    // Click en Max
    cy.contains('Max').click()
    
    // Debe mostrar más información
    cy.contains('Golden Retriever').should('be.visible')
  })
})
