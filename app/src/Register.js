import React from 'react'
import { Link } from 'react-router-dom';

export const Register = () => (
    <form>
    <h1> Register</h1>
    <p> First Name:</p>
    <input type="text"/>

    <p> Last Name:</p>
    <input type="text"/>

    <p> Email Address:</p>
    <input type="text"/>

    <p> Password:</p>
    <input type="text"/>

    <p> Confirm Password:</p>
    <input type="text"/>

    <button> Register</button>
    <li><Link to="/privacy">Privacy & Terms</Link></li> 

</form>

);