import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Home from './Home';
import Login from '../Login/Login';
import Register from '../Login/Register';
import useToken from '../Login/useToken';

export const LOCAL_STORAGE_TOKEN = "token" 

export const AppState =  {
    AddPayments: 0,
    AddDeposits: 1,
}

function App() {    
    const {token, setToken, deleteToken} = useToken();
    
    function getToken() {
        return token;
    }

    return (
        <>
            <Routes>
                <Route exact index path='/' element={<Home setToken={setToken} getToken={getToken} deleteToken={deleteToken}/>}>
                </Route>
                <Route exact path="/login"  element={<Login setToken={setToken} getToken={getToken} deleteToken={deleteToken}/>}>
                </Route>
                <Route exact path="/register" element={<Register setToken={setToken} getToken={getToken} deleteToken={deleteToken}/>}></Route>
                <Route path='*' element={<><h1 style={{padding:"20px"}}>404 Page Not found</h1></>}>
                    
                </Route>
            </Routes>
        </>
    )
}



export default App;

