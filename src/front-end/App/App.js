import React, {useState, useEffect} from 'react'
import TabSelector from './TabSelector';
import ContentPane from './ContentPane';
import { fetchPayments, fetchDeposits } from '../../back-end/services/services';
import Login from '../Login/Login';
import useToken from '../Login/useToken';

export const LOCAL_STORAGE_TOKEN = "token" 

export const AppState =  {
    AddPayments: 0,
    AddDeposits: 1,
}

function App() {    
    const [state, setState] = useState(AppState.AddPayments);

    const [payments, setPayments] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [balance, setBalance] = useState([]);

    const {token, setToken, deleteToken} = useToken();

    function checkToken(){
        return (token);
    }

    function calculateBalance() {
        let balance = 0;
        for(let i = 0; i < payments.length; i++) {
            balance -= payments[i];
        }
        for(let i = 0 ; i < deposits.length; i++) {
            balance += deposits[i];
        }
        return balance;
    }

    useEffect(() => {
        let mounted = true;
        if(!checkToken()) 
            return () => mounted = true;
        document.getElementById("datePicker").valueAsDate = new Date();
        fetchPayments()
        .then(response => {
            if(mounted && response) {
            setPayments(response)
            } else {
                alert("Something went wrong");
                deleteToken();
            }
        });
        fetchDeposits()
        .then(response => {
            if(mounted && response) {
            setDeposits(response)
            } else {
                alert("Something went wrong");
                deleteToken();
            }
        });
        setBalance(calculateBalance());
        return () => mounted = false;
    }, [token]);

    if(!checkToken()) {
        return(<Login setToken={setToken} getToken={getToken}></Login>);
    }
    return (
        <>
        <TabSelector getState={getState} setState={setState} deleteToken={deleteToken}/>
        <ContentPane getState={getState} getPayments={getPayments} setPayments={setPayments} getDeposits={getDeposits} setDeposits={setDeposits} getBalance={getBalance}></ContentPane>
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

    function getBalance() {
        return balance;
    }
}



export default App;
