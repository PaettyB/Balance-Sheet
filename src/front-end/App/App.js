import React, {useState, useEffect} from 'react'
import TabSelector from './TabSelector';
import ContentPane from './ContentPane';
import { fetchPayments, fetchDeposits } from '../../back-end/services/services';
import Login from '../Login/Login';
import useToken from './useToken';

export const LOCAL_STORAGE_TOKEN = "token" 

export const AppState =  {
    AddPayments: 0,
    AddDeposits: 1,
    Edit: 2
}

function App() {    
    const [state, setState] = useState(AppState.AddPayments);

    const [payments, setPayments] = useState([]);
    const [deposits,setDeposits] = useState([]);

    const {token, setToken} = useToken();

    function checkToken(){
        return (token);
    }

    useEffect(() => {
        let mounted = true;
        if(!checkToken()) 
            return () => mounted = true;
        fetchPayments()
            .then(response => {
                if(mounted) {
                setPayments(response)
                }
            });
            fetchDeposits()
            .then(response => {
                if(mounted) {
                setDeposits(response)
                }
            });
        return () => mounted = false;
    }, [token]);

    if(!checkToken()) {
        return(<Login setToken={setToken} getToken={getToken}></Login>);
    }
    return (
        <>
        <TabSelector getState={getState} setState={setState}/>
        <ContentPane getState={getState} getPayments={getPayments} setPayments={setPayments} getDeposits={getDeposits} setDeposits={setDeposits}></ContentPane>
        </>
    );

    function getState(){
        return state;
    }
    
    function getPayments(){
        return payments;
    }

    function getDeposits(){
        return deposits;
    }

    function getToken() {
        return token;
    }
}



export default App;
