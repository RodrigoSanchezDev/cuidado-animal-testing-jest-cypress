/**
 * E2E Test: Navegación del Sidebar
 * Verifica que la navegación entre páginas funciona correctamente
 * Nota: La app usa MSW para mocks internos
 */

describe('Navegación Sidebar', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Dashboard')
  })

  it('empieza en Dashboard por defecto', () => {
    cy.get('h1').should('contain', 'Dashboard')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('navega a Clientes', () => {
    cy.get('aside').contains('Clientes').click()
    
    cy.get('h1').should('contain', 'Clientes')
    cy.url().should('include', '/clientes')
  })

  it('navega a Mascotas', () => {
    cy.get('aside').contains('Mascotas').click()
    
    cy.get('h1').should('contain', 'Mascotas')
    cy.url().should('include', '/mascotas')
  })

  it('navega a Veterinarios', () => {
    cy.get('aside').contains('Veterinarios').click()
    
    cy.get('h1').should('contain', 'Veterinarios')
    cy.url().should('include', '/veterinarios')
  })

  it('navega a Citas', () => {
    cy.get('aside').contains('Citas').click()
    
    cy.get('h1').should('contain', 'Citas')
    cy.url().should('include', '/citas')
  })

  it('puede volver al Dashboard desde Clientes', () => {
    // Ir a Clientes
    cy.get('aside').contains('Clientes').click()
    cy.get('h1').should('contain', 'Clientes')
    
    // Volver a Dashboard
    cy.get('aside').contains('Dashboard').click()
    cy.get('h1').should('contain', 'Dashboard')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('muestra el logo de Cuidado Animal en el sidebar', () => {
    cy.get('aside').contains('Cuidado Animal').should('be.visible')
  })

  it('marca el link activo correctamente', () => {
    // En Dashboard el link debe estar activo
    cy.get('aside').contains('Dashboard')
      .closest('a')
      .should('have.class', 'bg-sky-500/15')
    
    // Navegar a Clientes
    cy.get('aside').contains('Clientes').click()
    
    // Ahora Clientes debe estar activo
    cy.get('aside').contains('Clientes')
      .closest('a')
      .should('have.class', 'bg-sky-500/15')
  })
})
