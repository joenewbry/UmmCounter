import React from 'react'
import ReactDOM from 'react-dom/client'
import './samples/node-api'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { routes } from './lib/routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={routes} />
    </MantineProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
