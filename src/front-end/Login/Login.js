import React, {useRef} from 'react'
import { login } from '../../back-end/services/services';

export default function Login({setToken, getToken}) {
  
  const usernameRef = useRef();
  const passwordRef = useRef();

  if(getToken()){
    console.log(getToken());
    window.location="/";
    return(<></>);
  }

  function handleLogin(e){
    e.preventDefault();
    const t = login({"username": usernameRef.current.value, "password": passwordRef.current.value});
    t.then(x => {
      if(!x) {
        alert("Unable to log in");
        //TODO: ERROR LOGIN MESSAGE
        return;
      }
        
      setToken(x.token);
      window.location.reload(false);
    });
  }
    return (
    <div style={{padding: "10px"}}>
        <h1>Login</h1>
        <form>
            <input ref={usernameRef} type='text' placeholder='Username'></input>
            <input ref={passwordRef} type='password' placeholder='Password'></input>
            <button type='submit' onClick={handleLogin} className="addTransaction">Login</button>
        </form>
        <div>
          <p>No Account yet? <a href='/register'>Register</a></p>
        </div>
    </div>
  )
}
