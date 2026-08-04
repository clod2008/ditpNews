import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LangContextProvider } from './context/langContex';

// Registra el service worker (public/service-worker.js) — necesario para que
// /sorteo funcione sin conexión. Estrategia network-first: no arriesga
// contenido viejo en el resto del sitio, ver comentario del propio archivo.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <LangContextProvider>
        <App />  
      </LangContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


