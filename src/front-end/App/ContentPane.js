import React from 'react'
import { AppState } from './App'
import ListTab from './ListTab'
import { addPayment, addDeposit, deletePayment, deleteDeposit } from '../../back-end/services/services'

export default function ContentPane({getState, getPayments, setPayments, getDeposits, setDeposits, getBalance}) {
    const [paymentPage, setPaymentPage] = React.useState(1);
    const [depositPage, setDepositPage] = React.useState(1);

    function getPaymentPage() {
        return paymentPage;
    }
    function getDepositPage(){
        return depositPage;
    }

    if(getState() === AppState.AddPayments){
        return (<ListTab getList={getPayments} 
            setList={setPayments} 
            addTransaction={addPayment} 
            deleteTransaction={deletePayment} 
            getBalance={getBalance} 
            getPage={getPaymentPage} 
            setPage={setPaymentPage}></ListTab>)
    } else if( getState() === AppState.AddDeposits){
        return (<ListTab getList={getDeposits} 
            setList={setDeposits} 
            addTransaction={addDeposit} 
            deleteTransaction={deleteDeposit} 
            getBalance={getBalance} 
            getPage={getDepositPage} 
            setPage={setDepositPage}></ListTab>)
    }
}
