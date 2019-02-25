import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "font-awesome/css/font-awesome.css"

ReactDOM.render(
        <BrowserRouter>
        <App />
        </BrowserRouter>, document.getElementById('root'));

        


serviceWorker.unregister();
