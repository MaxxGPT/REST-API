import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { request } from './services/Request';

export const Register = () => {

    const [userData, setUserData] = useState({});
    
    const onChangeHandlerFn = (event) => {
          // update the state;
          let currentData = userData;
          currentData[event.target.name] = event.target.value;
          setUserData( currentData );
    }

    const handleSubmit = (event) => {
          event.preventDefault();
          if(userData.password !== userData.password2){
              alert('Password does not coincide');
          }else{              
              const data = JSON.stringify( userData );
              const result = request("/api/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data
              });
              result.then( (result) =>{
                  console.log(result);
                  if(result.error){
                      alert('There was an error while processing your data. Please try again');
                  }else{
                      window.location.href="/login"
                  }
              });
          }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1> Register</h1>
            <p> First Name:</p>
            <input type="text" onChange={onChangeHandlerFn} name="firstName" required/>

            <p> Last Name:</p>
            <input type="text" onChange={onChangeHandlerFn} name="lastName" required/>

            <p> Email Address:</p>
            <input type="email" onChange={onChangeHandlerFn} name="email" required/>

            <p> Password:</p>
            <input type="password" onChange={onChangeHandlerFn} name="password" required/>

            <p> Confirm Password:</p>
            <input type="password" onChange={onChangeHandlerFn} name="password2" required/>

            <button type="submit"> Register</button>
            <li><Link to="/privacy">Privacy & Terms</Link></li> 
        </form>
    );

};