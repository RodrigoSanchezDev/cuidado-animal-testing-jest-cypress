const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // URL base de Vite dev server
    baseUrl: 'http://localhost:5173',
    
    // Directorio de specs E2E
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    
    // Directorio de fixtures
    fixturesFolder: 'cypress/fixtures',
    
    // Directorio de screenshots y videos
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // No grabar video en CI (más rápido)
    video: false,
    
    // Viewport por defecto (desktop)
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    
    // Setup para code coverage
    setupNodeEvents(on, config) {
      // Registrar tareas de cobertura
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
})
