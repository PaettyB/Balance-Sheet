import React from 'react'
import { AppState } from './App'
import ListTab from './ListTab'
import { addPayment, addDeposit } from '../../back-end/services/services'

export default function ContentPane({getState, getPayments, setPayments, getDeposits, setDeposits}) {
    if(getState() === AppState.AddPayments){
        return (<ListTab getList={getPayments} setList={setPayments} setTransaction={addPayment}></ListTab>)
    } else if( getState() === AppState.AddDeposits){
        return (<ListTab getList={getDeposits} setList={setDeposits} setTransaction={addDeposit}></ListTab>)
    } else if(getState() === AppState.Edit){
        return (<></>)
    }
}
