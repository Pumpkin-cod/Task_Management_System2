import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import App from './App.tsx';
import './index.css';

const oidcConfig = {
  authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_BsbIOkMpb",
  client_id: "4f44616v62816066gvrdeon2ba",
  redirect_uri: import.meta.env.DEV 
    ? "http://localhost:5173/" 
    : "https://d84l1y8p4kdic.cloudfront.net/",
  response_type: "code",
  scope: "email openid phone", 
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
