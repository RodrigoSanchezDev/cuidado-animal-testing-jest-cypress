import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.jsx'

/**
 * Habilita MSW para interceptar requests en:
 * - Desarrollo local (import.meta.env.DEV)
 * - GitHub Pages (hostname termina en github.io)
 * MSW actúa como "backend virtual" para la app
 */
async function enableMocking() {
  const isGitHubPages = window.location.hostname.endsWith('github.io')
  const shouldEnableMSW = import.meta.env.DEV || isGitHubPages

  if (shouldEnableMSW) {
    const { worker } = await import('./mocks/browser')
    // Usar BASE_URL para que el SW se cargue desde el subpath correcto en Pages
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`
      }
    })
  }
}

enableMocking().then(() => {
  console.log('🔶 MSW: Mock Service Worker started')
  console.log('🟢 Redux: Store initialized')
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
}).catch((error) => {
  console.error('🔴 MSW: Failed to start', error)
  // Render app anyway so user can see the interface
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
})
