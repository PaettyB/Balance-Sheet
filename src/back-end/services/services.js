var token;

export function setTokenLocal(tokenNew) {token = tokenNew}

async function handleResponse(res) {
  if(res.status ===  403){
    console.error("Wrong username or password");
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
  return await fetch('https://localhost:8443/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(handleResponse);
}

export function fetchPayments() {
  return fetch('https://localhost:8443/payments', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "GET", "token": token})
  })
    .then(handleResponse)
}

export function fetchDeposits() {
  return fetch('https://localhost:8443/deposits', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "GET", "token": token})
  })
    .then(handleResponse)
}

export function addPayment(item) {
  return fetch('https://localhost:8443/payments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "ADD", "token": token, item: item})

  }).then(handleResponse);
 }

export function addDeposit(item) {
  return fetch('https://localhost:8443/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "ADD", "token": token, item: item})

 }).then(handleResponse);
}