import React, {useRef} from 'react'
import { Link } from 'react-router-dom';
import { register } from '../../back-end/services/services';

export default function Register({setToken, getToken}) {
  
  const usernameRef = useRef();
  const passwordRef = useRef();

    if(getToken()){
        console.log(getToken());
        window.location="/";
        return(<></>);
    }

  function handleRegister(e){
        e.preventDefault();
        const t = register({"username": usernameRef.current.value, "password": passwordRef.current.value});
        t.then(([err, res]) => {
        if(err) {
          alert("Unable to Register Account: " + err);
          return;
        }
        setToken(res.token);
        window.location = "/"
        });
    }

    return (
    <div style={{padding: "10px"}}>
        <h1>Register</h1>
        <form>
            <p>Username</p>
            <input ref={usernameRef} type='text' placeholder='Username'></input>
            <p>Password</p>
            <input ref={passwordRef} type='password' placeholder='Password'></input>
            <button type='submit' onClick={handleRegister} className="addTransaction">Register</button>
        </form>
        <div>
          <p><br></br>Already have an Account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}