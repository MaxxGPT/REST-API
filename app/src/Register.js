import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { request } from './services/Request';
import { Button, FormGroup, FormControl, FormLabel, Col, FormRow } from 'react-bootstrap';
//import { FormRow } from 'react-bootstrap/Form';
import "./Styles/register.css"

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
        <div style={{display: "flex", justifyContent: "center"}}> 
        <h1> Register </h1>
            <div className="Register">
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <FormGroup as={Col} controlId="FirstName">
                            <FormLabel>First Name</FormLabel>
                            <FormControl 
                                autofocus
                                type="text"
                                onChange={onChangeHandlerFn}
                            />
                        </FormGroup>

                        <FormGroup as={Col} controlId="LastName">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl
                                autofocus
                                type="text"
                                onChange={onChangeHandlerFn}
                            />
                        </FormGroup>
                    </FormRow>

                    <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        //value={email}
                        onChange={ onChangeHandlerFn }
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl 
                        type="password"
                        //value={password}
                        onChange={ onChangeHandlerFn }
                    />
                    </FormGroup>

                    <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl 
                        type="password"
                        //value={password}
                        onChange={ onChangeHandlerFn }
                    />
                    </FormGroup>

                    <Button variant="primary" type="submit">Register</Button>

                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/privacy">Privacy & Terms</Link></li>
                    </ul>
                </form>
            </div>
        </div>
    );

};