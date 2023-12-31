import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRoutes from './routes/Routes.jsx'
import OnclickProvider from './frontend/Providers/OnclickProvider'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {  HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HelmetProvider>
        <OnclickProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RouterProvider router={myRoutes}></RouterProvider>
            </AuthProvider>
            <Toaster />
          </QueryClientProvider>
        </OnclickProvider>
       
      </HelmetProvider>
  </React.StrictMode>,
)
