import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App/>
    <ToastContainer 
    position='bottom-center'
    autoClose={3000}
    theme="colored"
    />
    
  </React.StrictMode>
);
