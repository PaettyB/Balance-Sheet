var token;
const apiAddress = "192.168.178.43"

export function setTokenLocal(tokenNew) {token = tokenNew}

async function handleResponse(res) {
  if(res.status !== 200 && res.status !== 204){
    return null;
  } else {
    try {
      return await res.json();
    } catch (e) {
      return res.statusText;
    }
  }
}

export async function login(credentials) {
  return await fetch('https://' + apiAddress + ':8443/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(handleResponse);
}

export function fetchPayments() {
  return fetch('https://' + apiAddress + ':8443/payments', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
      // 'Upgrade-Insecure-Requests': 1
    },
    body: JSON.stringify({action: "GET", "token": token})
  })
    .then(handleResponse)
}

export function fetchDeposits() {
  return fetch('https://' + apiAddress + ':8443/deposits', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "GET", "token": token})
  })
    .then(handleResponse)
}

export function addPayment(item) {
  return fetch('https://' + apiAddress + ':8443/payments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "ADD", "token": token, item: item})

  }).then(handleResponse);
 }

export function addDeposit(item) {
  return fetch('https://' + apiAddress + ':8443/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "ADD", "token": token, item: item})

 }).then(handleResponse);
}

export function deletePayment(id) {
  return fetch('https://' + apiAddress + ':8443/payments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "DELETE", "token": token, id: id})

  }).then(handleResponse);
}

export function deleteDeposit(id) {
  return fetch('https://' + apiAddress + ':8443/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "DELETE", "token": token, id: id})

 }).then(handleResponse);
}