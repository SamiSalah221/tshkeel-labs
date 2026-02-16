import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

// Reuse root across HMR reloads to prevent double-root error
const root = window.__APP_ROOT || createRoot(container)
window.__APP_ROOT = root

root.render(<App />)

if (import.meta.hot) {
  import.meta.hot.accept()
}
