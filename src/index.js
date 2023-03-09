import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './front-end/App/App';
import './front-end/App/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="wrapper">
        <BrowserRouter>
           <App/>
        </BrowserRouter>
    </div>
);

