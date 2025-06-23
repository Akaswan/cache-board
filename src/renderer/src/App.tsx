import React from 'react'

interface ElectronAPI {
  captureClipboard: () => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

const App: React.FC = () => {
  const captureClipboard = (): void => {
    window.electronAPI.captureClipboard()
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Clipboard Viewer</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={captureClipboard} style={{ marginRight: '1rem' }}>
          Read Clipboard
        </button>
      </div>
    </div>
  )
}

export default App
