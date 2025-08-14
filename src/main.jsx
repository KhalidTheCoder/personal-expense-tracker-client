import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Routes from './Router/Routes'
import AuthProvider from './Providers/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={Routes} />
     <Toaster position="top-center" reverseOrder={false} />
   </AuthProvider>
  </StrictMode>,
)
