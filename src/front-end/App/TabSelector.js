import React from 'react'
import { AppState } from './App'


export default function TabSelector({getState, setState, deleteToken}) {
  
    function handleSelectPayments(e) {
        setState(AppState.AddPayments);
    }

    function handleSelectDeposits(e){
        setState(AppState.AddDeposits);
    }
    function handleSelectEdit(e){
        setState(AppState.Edit);
    }

    function handleLogout(e) {
        e.preventDefault();
        deleteToken(null);
    }

    return (
    <div id='tabSelectorContainer'>
    <div id='logoutContainer'>
        
    </div>
    <button className={"tabSelector" + (getState() === AppState.AddPayments?" active" : "")} onClick={handleSelectPayments}>Add Payments</button>
    <button className={"tabSelector" + (getState() === AppState.AddDeposits?" active" : "")} onClick={handleSelectDeposits}>Add Deposits</button>
    <button className={"tabSelector" + (getState() === AppState.Edit?" active" : "")} onClick={handleSelectEdit}>Edit</button>
    <div id='logoutContainer'>
        <button id='logout' onClick={handleLogout}>Logout</button>
    </div>
    </div>
    )
}
