import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LangContextProvider } from './context/langContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LangContextProvider>
        <App />  
      </LangContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


