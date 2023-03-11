import React, {useState, useEffect} from 'react'
import TabSelector from './TabSelector';
import ContentPane from './ContentPane';
import { fetchPayments, fetchDeposits } from '../../back-end/services/services';
import { useNavigate } from 'react-router-dom';

export const LOCAL_STORAGE_TOKEN = "token" 

export const AppState =  {
    AddPayments: 0,
    AddDeposits: 1,
}

function Home({getToken, setToken, deleteToken}) {    
    const [state, setState] = useState(AppState.AddPayments);
    const [payments, setPayments] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    function checkToken(){
        return getToken();
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
        if(!checkToken()){ 
            return navigate("/login")
        }
        document.getElementById("datePicker").valueAsDate = new Date();
        fetchPayments()
        .then(([err, response]) => {
            if(!mounted || err){
                alert("Could not get Payments: " + err);
                // deleteToken();
                return;
            }
            setPayments(response);
        }, (err) => {
            alert("Could not reach API: " + err)
        });
        fetchDeposits()
        .then(([err, response]) => {
            if(!mounted || err){
                alert("Could not get Deposits: " + err);
                // deleteToken();
                return;
            }
            setDeposits(response);
        }, (err) => {
            alert("Could not reach API: " + err)
        });
        return () => mounted = false;
    }, [getToken()]);

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