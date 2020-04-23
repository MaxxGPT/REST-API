import React, {useState} from 'react'
import { Button, FormGroup, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { request } from './services/Request';
import "./Styles/login.css"


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
        <div style={{display: "flex", justifyContent: "center"}}>       
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            required
                            autoFocus
                            type="email"
                            //value={email}
                            onChange={ onChangeHandlerFn }
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            required
                            autoFocus 
                            type="password"
                            //value={password}
                            onChange={ onChangeHandlerFn }
                        />
                        </FormGroup>

                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                              <FormCheck 
                                type={type}
                                id={`default-${type}`}
                                label={`Stay signed in`}
                              />
                            </div>
                        ))}

                        
                        <Button variant="primary" type="submit" block> Login</Button>
                        
                        <span>
                            <span>
                                <span>Don't have an account?</span>
                            </span>
                            <a href="/register" name="sign-up" class="UnsytledLink InlineLink Text-color--blue"> Sign up</a>
                        </span>
                        <ul>
                            <li><Link to="/privacy">Privacy & Terms</Link></li>
                        </ul>
                </form>
            </div>
        </div>    
    );
};