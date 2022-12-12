import React from 'react'
import { AppState } from './App'
import ListTab from './ListTab'
import { setPayment, setDeposit } from '../../back-end/services/services'

export default function ContentPane({getState, getPayments, setPayments, getDeposits, setDeposits}) {
    if(getState() === AppState.AddPayments){
        return (<ListTab getList={getPayments} setList={setPayments} setTransaction={setPayment}></ListTab>)
    } else if( getState() === AppState.AddDeposits){
        return (<ListTab getList={getDeposits} setList={setDeposits} setTransaction={setDeposit}></ListTab>)
    } else if(getState() === AppState.Edit){
        return (<></>)
    }
}
