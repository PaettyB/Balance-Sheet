import React from 'react'
import { AppState } from './App'


export default function TabSelector({getState, setState}) {
  
    function handleSelectPayments(e) {
        setState(AppState.AddPayments);
    }

    function handleSelectDeposits(e){
        setState(AppState.AddDeposits);
    }
    function handleSelectEdit(e){
        setState(AppState.Edit);
    }

    return (
    <div id='tabSelectorContainer'>
    <button className={"tabSelector" + (getState() === AppState.AddPayments?" active" : "")} onClick={handleSelectPayments}>Add Payments</button>
    <button className={"tabSelector" + (getState() === AppState.AddDeposits?" active" : "")} onClick={handleSelectDeposits}>Add Deposits</button>
    <button className={"tabSelector" + (getState() === AppState.Edit?" active" : "")} onClick={handleSelectEdit}>Edit</button>
    </div>
    )
}
