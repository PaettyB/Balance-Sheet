import React, {useRef} from 'react'
import { Link } from 'react-router-dom';
import { login } from '../../back-end/services/services';

export default function Login({setToken, getToken}) {
  
  const usernameRef = useRef();
  const passwordRef = useRef();

  if(getToken()){
    window.location="/";
    return(<></>);
  }

  function handleLogin(e){
    e.preventDefault();
    const t = login({"username": usernameRef.current.value, "password": passwordRef.current.value});
    t.then(([err, res]) => {
      if(err) {
        alert("Unable to log in: " + err);
        return;
      }
        
      setToken(res.token);
      // window.location.reload(false);
      window.location = "/";
    });
  }
    return (
    <div style={{padding: "10px"}}>
        <h1>Login</h1>
        <form>
            <p>Username</p>
            <input ref={usernameRef} type='text' placeholder='Username'></input>
            <p>Password</p>
            <input ref={passwordRef} type='password' placeholder='Password'></input>
            <button type='submit' onClick={handleLogin} className="addTransaction">Login</button>
        </form>
        <div>
          {/* 
          This is to fix the non-working routes on apache:
          <p><br></br>No Account yet? <a href='/register'>Register</a></p> */}
          <p><br></br>No Account yet? <Link to='/register'>Register</Link></p>
        </div>
    </div>
  )
}
