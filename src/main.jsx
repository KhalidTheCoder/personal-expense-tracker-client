import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Routes from './Router/Routes'
import AuthProvider from './Providers/AuthProvider'
import { Toaster } from 'react-hot-toast'


import AOS from "aos";
import "aos/dist/aos.css";


AOS.init({
  duration: 1000,  
  once: true,     
  easing: "ease-in-out",
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={Routes} />
     <Toaster position="top-center" reverseOrder={false} />
   </AuthProvider>
  </StrictMode>,
)
