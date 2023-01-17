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
    <div className='row'>
         <div className='col-xs-1 col-sm-1 col-md-1 col-lg-1'>
            <img className="" src='/custom_logo.png' width={"80px"} alt="img"></img>
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2'>
            <h2 className='col-lg-4'>Bready's Balance</h2>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button className={"col-lg-4 styledButton" + (getState() === AppState.AddPayments?" active" : "")} onClick={handleSelectPayments}>Add Payments</button>
            
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button className={"col-lg-4 styledButton" + (getState() === AppState.AddDeposits?" active" : "")} onClick={handleSelectDeposits}>Add Deposits</button>
            
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2'>
            <button className='logout' onClick={handleLogout}>Logout</button>
            
    </div>
    </div>
    )
}
