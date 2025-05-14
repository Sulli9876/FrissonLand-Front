import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router'
import React from 'react';
import './assets/styles/main.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <GoogleOAuthProvider clientId="192637832836-jl12bto3t9gv8k01rq6tind881m531le.apps.googleusercontent.com"> 
       <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);