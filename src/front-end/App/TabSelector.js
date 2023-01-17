import React from 'react'
import { AppState } from './App'


export default function TabSelector({getState, setState, deleteToken}) {
  
    function handleSelectPayments(e) {
        setState(AppState.AddPayments);
    }

    function handleSelectDeposits(e){
        setState(AppState.AddDeposits);
    }

    function handleLogout(e) {
        e.preventDefault();
        deleteToken(null);
    }

    return (
    <div id='tabSelectorContainer'>
    <div id='titleContainer'>
        <img id='logo' src='/custom_logo.png' width='48px' alt="img"></img>
        <h2 id='title'>Bready's Balance</h2>
    </div>
    <button className={"styledButton" + (getState() === AppState.AddPayments?" active" : "")} onClick={handleSelectPayments}>Add Payments</button>
    <button className={"styledButton" + (getState() === AppState.AddDeposits?" active" : "")} onClick={handleSelectDeposits}>Add Deposits</button>
    <div id='logoutContainer'>
        <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
    </div>
    )
}
