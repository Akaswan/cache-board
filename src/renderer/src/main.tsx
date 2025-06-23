import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

interface ElectronAPI {
  captureClipboard: () => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
