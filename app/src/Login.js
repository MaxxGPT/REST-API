import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { request } from './services/Request';

export const Login = () => {

    const [loginData,setLoginData] = useState({});

    const onChangeHandlerFn = (event) => {
          // update the state;
          let currentLoginData = loginData;
          currentLoginData[event.target.name] = event.target.value;
          setLoginData( currentLoginData );
    }

    const handleSubmit = (event) => {
          event.preventDefault();
          const data = JSON.stringify( loginData );
          const result = request("/api/register/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
          });
          result.then( (result) =>{
              if(result.error){
                  alert('There was an error while processing your data. Please try again');
              }else{
                  window.location.href="/dashboard";
              }
          });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1> Login</h1>
            <p> Email:</p>
            <input
                type="email"
                name="email"
                onChange={ onChangeHandlerFn }
            />
            <p> Password:</p>
            <input
                type="password"
                name="password"
                onChange={ onChangeHandlerFn }
            />
            <button type="submit"> Login</button>

            <li><Link to="/register">Register</Link></li>
            <li><Link to="/privacy">Privacy & Terms</Link></li>
        </form>
    );
};