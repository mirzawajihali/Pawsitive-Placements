import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <ParallaxProvider>
 <RouterProvider router={router} />
 </ParallaxProvider>
  </StrictMode>,
)


