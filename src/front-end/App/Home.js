import React, {useState, useEffect} from 'react'
import TabSelector from './TabSelector';
import ContentPane from './ContentPane';
import { fetchPayments, fetchDeposits } from '../../back-end/services/services';

export const LOCAL_STORAGE_TOKEN = "token" 

export const AppState =  {
    AddPayments: 0,
    AddDeposits: 1,
}

function Home({getToken, setToken, deleteToken}) {    
    const [state, setState] = useState(AppState.AddPayments);
    var token = getToken();
    const [payments, setPayments] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [balance, setBalance] = useState(0);

    function checkToken(){
        return (token);
    }
    if(!checkToken()) {
        window.location="/login";
        return(<></>);
    }

    function calculateBalance() {
        let balance = 0;
        for(let i = 0; i < payments.length; i++) {
            balance -= parseFloat(payments[i].amount);
        }
        for(let i = 0 ; i < deposits.length; i++) {
            balance += parseFloat(deposits[i].amount);
        }
        return balance;
    }

    useEffect(() => {
        let mounted = true;
        if(!getToken()) 
            return () => mounted = true;
        document.getElementById("datePicker").valueAsDate = new Date();
        fetchPayments()
        .then(response => {
            if(mounted && response) {
                setPayments(response);
            } else {
                alert("Could not get Payments");
                deleteToken();
            }
        });
        fetchDeposits()
        .then(response => {
            if(mounted && response) {
                setDeposits(response);
            } else {
                alert("Could not get Deposits");
                deleteToken();
            }
        });
        return () => mounted = false;
    }, [token]);

    useEffect( () => {
        setBalance(calculateBalance());
    }, [payments,deposits]);

    
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

    function getBalance() {
        return balance;
    }
}



export default Home;