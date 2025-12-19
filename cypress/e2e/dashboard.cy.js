/**
 * E2E Test: Dashboard
 * Verifica que el Dashboard carga correctamente con Hero y KPIs
 * Nota: La app usa MSW para mocks internos
 */

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Dashboard')
  })

  it('carga el Dashboard correctamente', () => {
    cy.get('h1').should('contain', 'Dashboard')
  })

  it('muestra el Hero Banner con mensaje de bienvenida', () => {
    cy.contains('Bienvenido').should('be.visible')
  })

  it('muestra los KPIs (StatCards)', () => {
    // Verificar que existen las StatCards
    cy.contains('Total Mascotas').should('be.visible')
    cy.contains('Veterinarios').should('be.visible')
    cy.contains('Citas Hoy').should('be.visible')
  })

  it('muestra la distribución de mascotas', () => {
    cy.contains('Distribución de Mascotas').should('be.visible')
    cy.contains('Perros').should('be.visible')
    cy.contains('Gatos').should('be.visible')
  })

  it('muestra la agenda de hoy con citas', () => {
    cy.contains('Agenda de Hoy').should('be.visible')
  })

  it('muestra los chips de servicios disponibles', () => {
    cy.contains('Vacunación').should('be.visible')
    cy.contains('Control').should('be.visible')
    cy.contains('Cirugía').should('be.visible')
  })

  it('tiene links funcionales en Quick Actions', () => {
    cy.contains('Ver Mascotas').should('have.attr', 'href', '/mascotas')
    cy.contains('Administrar Citas').should('have.attr', 'href', '/citas')
  })
})
