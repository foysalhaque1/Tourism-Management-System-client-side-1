import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {

  RouterProvider,
} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './ThemeProvider/ThemeProvider.jsx';


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>


      <QueryClientProvider client={queryClient}>
        <AuthProvider>

          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
