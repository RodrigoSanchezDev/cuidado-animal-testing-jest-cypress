// Archivo de soporte de Cypress
// Comandos globales y configuración

// Importar comandos personalizados si los tienes
// import './commands'

// Importar plugin de code coverage
import '@cypress/code-coverage/support'

// Prevenir que Cypress falle en errores no capturados de la app
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  // Útil para errores de terceros o del Service Worker
  return false
})
