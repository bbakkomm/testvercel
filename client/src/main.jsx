import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/common.css';
import './assets/css/index.css';
// import customFetch from './utils/customFetch.js';
import { ToastContainer } from 'react-toastify';

// const resp = await customFetch.get('/test');
// console.log(resp);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center' autoClose='800' />
  </StrictMode>,
)
