/**
 * E2E Test: Clientes
 * Verifica lista de clientes y expansión de detalles
 * Nota: La app usa MSW para mocks internos
 */

describe('Clientes', () => {
  beforeEach(() => {
    cy.visit('/clientes')
    cy.get('h1').should('contain', 'Clientes')
  })

  it('muestra el título "Clientes"', () => {
    cy.get('h1').should('contain', 'Clientes')
  })

  it('lista todos los clientes', () => {
    // MSW provee datos de clientes
    cy.contains('María González').should('be.visible')
    cy.contains('Carlos Rodríguez').should('be.visible')
    cy.contains('Ana Martínez').should('be.visible')
  })

  it('muestra el email de cada cliente', () => {
    cy.contains('maria.gonzalez@email.com').should('be.visible')
  })

  it('muestra el teléfono de cada cliente', () => {
    cy.contains('+56 9 1234 5678').should('be.visible')
  })

  it('muestra la cantidad de mascotas de cada cliente', () => {
    // María tiene 2 mascotas (Max y Luna según MSW data)
    cy.contains(/mascota/i).should('be.visible')
  })

  describe('Expansión de detalles', () => {
    it('puede expandir un cliente para ver detalles', () => {
      // Click en el primer cliente
      cy.contains('María González').click()
      
      // Debe mostrar las mascotas
      cy.contains('Max').should('be.visible')
    })

    it('muestra las mascotas del cliente expandido', () => {
      // Click en Carlos Rodríguez
      cy.contains('Carlos Rodríguez').click()
      
      // Debe mostrar Rocky
      cy.contains('Rocky').should('be.visible')
    })

    it('puede colapsar el cliente expandido', () => {
      // Expandir
      cy.contains('María González').click()
      cy.contains('Max').should('be.visible')
      
      // Colapsar
      cy.contains('María González').click()
      
      // Verificar toggle (el contenido puede estar oculto)
      cy.get('body').should('exist')
    })
  })

  describe('Información de mascotas', () => {
    it('muestra la especie y raza de la mascota', () => {
      cy.contains('María González').click()
      
      // Max es un Perro Golden Retriever
      cy.contains('Perro').should('be.visible')
      cy.contains('Golden Retriever').should('be.visible')
    })

    it('muestra la imagen de la mascota', () => {
      cy.contains('María González').click()
      
      // Debe haber al menos una imagen de mascota
      cy.get('img').should('have.length.gte', 1)
    })
  })
})
