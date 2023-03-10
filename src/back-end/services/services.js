var token;
const { apiAddress, apiPort } = require("../../res/config")

export function setTokenLocal(tokenNew) {token = tokenNew}

async function handleResponse(res) {
  if(res.status !== 200 && res.status !== 204){
    return [(await res.json()).message, null];
  } else {
    try {
      return [null, await res.json()];
    } catch (e) {
      return res.statusText;
    }
  }
}

export async function login(credentials) {
  return await fetch('https://' + apiAddress + ':' + apiPort +'/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(handleResponse);
}

export async function register(credentials) {
  return await fetch('https://' + apiAddress + ':' + apiPort +'/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(handleResponse);
}

export function fetchPayments() {
  return fetch('https://' + apiAddress + ':' + apiPort + '/payments', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "GET", "token": token})
  })
    .then(handleResponse)
}

export function fetchDeposits() {
  return fetch('https://' + apiAddress + ':' + apiPort + '/deposits', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "GET", "token": token})
  })
    .then(handleResponse)
}

export function addPayment(item) {
  return fetch('https://' + apiAddress + ':' + apiPort +'/payments', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "ADD", "token": token, item: item})

  }).then(handleResponse);
 }

export function addDeposit(item) {
  return fetch('https://' + apiAddress + ':' + apiPort + '/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "ADD", "token": token, item: item})

 }).then(handleResponse);
}

export function deletePayment(id) {
  return fetch('https://' + apiAddress + ':' + apiPort +'/payments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "DELETE", "token": token, id: id})

  }).then(handleResponse);
}

export function deleteDeposit(id) {
  return fetch('https://' + apiAddress + ':' + apiPort + '/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "DELETE", "token": token, id: id})

 }).then(handleResponse);
}