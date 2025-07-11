import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { AdminProvider } from "./pages/Admin Profile/AdminContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="top-right"
      richColors
    />
    <AdminProvider>
      <App />
    </AdminProvider>
  </StrictMode>,
)
