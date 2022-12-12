import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './front-end/App/App';
import './front-end/App/style.css';
import Login from './front-end/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="wrapper">
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                </Route>
                <Route path="/login" element={<Login />}>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
);

