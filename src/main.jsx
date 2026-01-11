
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CarbonFootprintProvider } from "./context/CarbonFootprintContext.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CarbonFootprintProvider>
      <App />
    </CarbonFootprintProvider>
      
    </BrowserRouter>
  </React.StrictMode>
)
