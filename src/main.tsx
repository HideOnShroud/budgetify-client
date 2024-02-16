import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/space-grotesk'

const theme = extendTheme(

  {
    fonts: {
      body: `'Space Grotesk', sans-serif`,
      heading: `'Space Grotesk', sans-serif`,

    },
  }
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
