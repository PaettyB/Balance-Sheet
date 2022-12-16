
export async function login(credentials) {
  return await fetch('https://localhost:8443/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(async res => {
    if(res.status ===  403){
      console.error("Wrong username or password");
      return null;
    } else {
      return await res.json();
    }
  });
}

export function fetchPayments() {
  return fetch('https://localhost:8443/payments')
    .then(data => data.json())
}

export function addPayment(item) {
  const itemString = JSON.stringify(item);
  console.log(itemString);
  return fetch('https://localhost:8443/payments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({action: "ADD", item: item})

  }).then(data=>data.json());
 }

export function fetchDeposits() {
    return fetch('https://localhost:8443/deposits')
      .then(data => data.json())
}

export function addDeposit(item) {
  return fetch('https://localhost:8443/deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    action: "ADD",
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
 }