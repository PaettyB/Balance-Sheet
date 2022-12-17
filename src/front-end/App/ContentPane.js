import React from 'react'
import { AppState } from './App'
import ListTab from './ListTab'
import EditTab from './EditTab'
import { addPayment, addDeposit, deletePayment, deleteDeposit } from '../../back-end/services/services'

export default function ContentPane({getState, getPayments, setPayments, getDeposits, setDeposits}) {
    if(getState() === AppState.AddPayments){
        return (<ListTab getList={getPayments} setList={setPayments} addTransaction={addPayment} deleteTransaction={deletePayment}></ListTab>)
    } else if( getState() === AppState.AddDeposits){
        return (<ListTab getList={getDeposits} setList={setDeposits} addTransaction={addDeposit} deleteTransaction={deleteDeposit}></ListTab>)
    } else if(getState() === AppState.Edit){
        return (<EditTab get></EditTab>)
    }
}
