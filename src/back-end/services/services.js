
export function login(credentials) {
  console.log(credentials);
  const r = fetch('https://localhost:8443/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return r.then(resp => resp.json());
}

export function fetchPayments() {
  return fetch('http://localhost:3333/payments')
    .then(data => data.json())
}

export function setPayment(item) {
  return fetch('http://localhost:3333/payments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
  }).then(data=>data.json);
 }

export function fetchDeposits() {
    return fetch('http://localhost:3333/deposits')
      .then(data => data.json())
}

export function setDeposit(item) {
  return fetch('http://localhost:3333/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
 }