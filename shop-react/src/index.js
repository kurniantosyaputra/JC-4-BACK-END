import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import router
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter> //<<<<< tambahkan  /browser Router
, document.getElementById('root')); 
registerServiceWorker();
