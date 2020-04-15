import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { request } from './services/Request';

export const ProfileUser = () => {

    const [userData, setUserData] = useState({});

    useEffect(()=>{
      request('/api/users/me',{}).then((result)=>{
        setUserData({
          firstName:result.data.firstName,
          lastName:result.data.lastName,
          email:result.data.email
        });
      });
    }, []);
    
    const onChangeHandlerFn = (event) => {
          // update the state;
          let currentData = userData;
          currentData[event.target.name] = event.target.value;
          setUserData( currentData );
    }

    const handleSubmit = (event) => {
          event.preventDefault();        
          const data = JSON.stringify( userData );
          const result = request("/api/users", {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: data
          });
          result.then( (result) =>{
              console.log(result);
              if(result.error){
                  alert('There was an error while processing your data. Please try again');
              }else{
                  window.location.href="/dashboard"
              }
          });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1> Update Profile</h1>
            <p> First Name:</p>
            <input type="text" onChange={onChangeHandlerFn} name="firstName" required defaultValue={userData.firstName || ""}/>

            <p> Last Name:</p>
            <input type="text" onChange={onChangeHandlerFn} name="lastName" required defaultValue={userData.lastName || ""}/>

            <p> Email Address:</p>
            <input type="email" onChange={onChangeHandlerFn} name="email" required defaultValue={userData.email || ""}/>
            <button type="submit">Update</button>
            <li><Link to="/dashboard" className="btn btn-danger">Return</Link></li> 
        </form>
    );

};