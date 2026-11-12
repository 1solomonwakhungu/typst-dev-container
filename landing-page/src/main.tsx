import '@primer/react-brand/fonts/fonts.css'
import '@primer/react-brand/lib/css/main.css'
import './global.css'

import { ThemeProvider } from '@primer/react-brand'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider colorMode="dark">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
