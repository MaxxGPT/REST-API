import React from 'react'
import { Link } from 'react-router-dom';


export const Login = () => (

<form>
    <h1> Login</h1>
    <p> Email:</p>
    <input
        type="text"
    />
    <p> Password:</p>
    <input
        type="text"/>

    <input type='Submit'/>

    <li><Link to="/register">Register</Link></li>
</form>

);