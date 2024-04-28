import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorToast, successToast, warnToast } from './components/Toast';
import baseUrl from './config';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')


    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    let handleSubmit=async (e)=>{
        e.preventDefault()
        console.log('submit');
        
        try{
               
            if (email !== '' && password !== '') {
              const data = { email, password }; 
            console.log(data, 'data');
  
            let response=await axios.post(`${baseUrl}/login`,data)
            console.log(response,'response');
            console.log('token',response.data.token);
  
            if(response.data.admin){
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('userId', response.data.id)
              console.log('token: ',response.data.token);
              successToast('welcome admin')
              navigate('/homeadmin')
              return
            }
  
            if(response.data.status){
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('userId', response.data.id)
              console.log('login success');
              successToast(`Welcome ${response.data.firstname}` )
              navigate('/')
            }
            else{
              console.log('login failed');
              warnToast('incorrect email or password')
            }
  
          }
          else if(email === ''){
            warnToast('Email is Required')
          }else{
            warnToast('Password is required')
          }
  
          }catch(err){
          console.log(err.response.data.message);
          errorToast(err.response.data.message)
        }
    }


    useEffect(()=>{

      if(token){
        if(userId === 'a1b2c3'){
          navigate('/homeadmin')
          console.log('admin token');
        }else{
          navigate('/')
          console.log('token yes');
        }

      }else{
        console.log('no token');
      }

    })

  return (
    <div>
      <div className='text-center mt-40 m-auto w-3/4 md:w-1/4 bg-green-100 px-10 py-10 rounded-3xl'>
            <h1 className='font-semibold text-3xl mb-16'>Login</h1>
        <form onSubmit={handleSubmit}>
         <div className='text-start mb-2'>  <label htmlFor="email" className='text-start'>Email</label></div>
       <input className='w-full h-10 mb-5 rounded-lg border p-3' id='email' type="email" name='name' placeholder='email' onChange={handleEmailChange} /><br />
       <div className='text-start mb-2'><label htmlFor="password" >Password</label></div>
        <input className='w-full h-10 mb-10 rounded-lg border p-3' id='password' type="password" name='price' placeholder='password' onChange={handlePasswordChange} /><br />
        <button className='bg-black text-white py-2 px-4 rounded-3xl h-fit'>Login</button>
        </form>
        <div className='text-center mt-10 w-100'>
        <p>Don't have an account?<span className='text-blue-500'><Link to='/signup'> Sign Up</Link></span></p>
      </div>
        </div>
    </div>
  )
}

export default Login
