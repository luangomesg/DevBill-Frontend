import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppProvider } from './hooks/index.tsx'
import { Home } from './screens/home/index.tsx'
import GlobalStyles from './styles/globalStyles.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyles />
      <Home />
    </AppProvider>
  </React.StrictMode>,
)
