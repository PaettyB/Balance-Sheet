import React, {useRef} from 'react'
import { login } from '../../back-end/services/services';

export default function Login({setToken, getToken}) {
  
  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleLogin(e){
    e.preventDefault();
    const token = login({"username": usernameRef.current.value, "password": passwordRef.current.value});
    token.then(t => setToken(t));
  }
    return (
    <div>
        <h1>Login</h1>
        <form>
            <input ref={usernameRef} type='text' placeholder='Username'></input>
            <input ref={passwordRef} type='password' placeholder='Password'></input>
            <button type='submit' onClick={handleLogin}>Login</button>
        </form>
        <p>Token: {getToken()}</p>
    </div>
  )
}
