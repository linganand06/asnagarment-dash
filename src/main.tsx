import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Design System
import './styles/variables.css'
import './styles/global.css'
import './styles/typography.css'
import './styles/layout.css'
import './styles/animations.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/sections.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
