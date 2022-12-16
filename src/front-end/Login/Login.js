import React, {useRef} from 'react'
import { login } from '../../back-end/services/services';

export default function Login({setToken, getToken}) {
  
  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleLogin(e){
    e.preventDefault();
    const t = login({"username": usernameRef.current.value, "password": passwordRef.current.value});
    t.then(x => {
      if(!x)
        return;
        //TODO: ERROR LOGIN MESSAGE
      setToken(x.token);
      window.location.reload(false);
    });
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
