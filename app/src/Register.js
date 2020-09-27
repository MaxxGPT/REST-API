import React, { useState } from 'react'
import authSvg from '../assets/login logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from './helpers/auth';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { request } from './services/Request';
import { Button, FormGroup, FormControl, FormLabel, FormCheck } from 'react-bootstrap';
//import { FormRow } from 'react-bootstrap/Form';
//import "./Styles/register.css"

export const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { email, name, password, password2 } = userData

    //handle change from inputs

    const handleChange = text => (event) => {
        console.log(name, email, password, password2)
        setUserData({...userData, [text]: event.target.value})
    }
    
    const onChangeHandlerFn = (event) => {
          // update the state;
          let currentData = userData;
          currentData[event.target.name] = event.target.value;
          setUserData( currentData );
    }

    //submit data to the backend
    const handleSubmit = (event) => {
          event.preventDefault();
          if(name && email && password){
            if(userData.password !== userData.password2){
                axios.post(`${process.env.REACT_APP_API_URL}/register`,{
                    name, email, password: password2
                }).then(res =>{
                    setUserData({
                        ...userData,
                        name: '',
                        email: '',
                        password: '',
                        password2: '',
                    })

                    toast.success(res.data.messages)
                }).catch(err => {
                    toast.error(err.response.data.error)
                })
            }else{
              toast.error('Password does not match');
          }
         //}else{
             toast.error('Please fill all the fields');

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
                      toast.error('There was an error while processing your data. Please try again');
                  }else{
                      window.location.href="/login"
                  }
              });
          }
    }

    return <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {isAuth()? <Redirect to='/'/> :null}
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                <div className='mt-12 flex flex-col items-center'>
                    <h1 className='text-2xl xl:text-3xl font-extrabold'>
                    Register
                    </h1>
                    <form 
                     className='w-full flex-1 mt-8 text-indigo-500'
                     onSubmit={handleSubmit}
                    >
                    <div className='mx-auto max-w-xs relative'>
                     <input
                      type='text'
                      placeholder='Name'
                      onChange={handleChange('name')}
                      value={name}
                      className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    />
                    <input
                     type='email'
                     placeholder='Email'
                     onChange={handleChange('email')}
                     value={email}
                     className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    /> 
                    <input
                     type='password'
                     placeholder='Password'
                     onChange={handleChange('Password')}
                     value={password}
                     className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />
                    <input
                     type='password'
                     placeholder='Confirm Password'
                     onChange={handleChange('Password2')}
                     value={password2}
                     className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    /> 
                    <button
                     type='submit'
                     className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                     Register
                    </button>
                    <div className='my-12 border-b text-center'>
                     <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                        Or sign with email
                     </div>
                    </div> 
                    <div className='flex flex-col items-center'>
                    <a
                     href='/login'
                     className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
             bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  >Sign In</a>                    
                </div>
                </div>               
                </form>
            </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
        ></div>
        </div>
        </div>
        
        </div>
    );
};    



export default Register;