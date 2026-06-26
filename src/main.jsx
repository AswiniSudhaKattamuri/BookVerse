import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/global.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
		<Toaster position='top-right'/>
      <App />
    </AuthProvider>
  </StrictMode>,
)
