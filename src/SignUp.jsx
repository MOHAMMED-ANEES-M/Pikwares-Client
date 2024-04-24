import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorToast, successToast, warnToast } from './components/Toast'
import baseUrl from './config'

const SignUp = () => {

  const [data,setData] = useState('')
  const [conPass,setConPass] = useState('')
  const navigate = useNavigate()

  let handleChange=(e)=>{
      setData({...data,[e.target.name]:e.target.value})
  }

  let handleConPassChange=(e)=>{
    setConPass(e.target.value)
  }

  let handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      console.log(data.password,'dpass');
      if(conPass === data.password){

        let response=await axios.post(`${baseUrl}/customer/insert`,data)
        console.log(response,'res');
        if(response.data){
          successToast('Registration Successfull')
          navigate('/login')
        }
      }else{
        console.log('Password not matching');
        warnToast('Password not matching')
      }
    }
    catch(err){
      console.log(err && err.response && err.response.data && err.response.data.message);
      errorToast(err.response.data.message)
    }
}


  return (
    <div>
        <div className='text-center mt-32 m-auto w-2/4 bg-green-100 px-10 py-10 mb-10 rounded-3xl'>
            <h1 className='font-semibold text-3xl mb-16'>Sign Up</h1>
        <form onSubmit={handleSubmit}>

          <div className='flex flex-wrap gap-5 justify-center'>
            <div className='w-2/5'>
        <div className='text-start mb-2'>  <label htmlFor="firstname" className='text-start'>First Name</label></div>
       <input className='w-full h-10 mb-5 rounded-lg border p-3' id='firstname' type="text" name='firstname' placeholder='first name' onChange={handleChange} /><br />
       </div>
       <div className='w-2/5'>
       <div className='text-start mb-2'>  <label htmlFor="lastname" className='text-start'>Last Name</label></div>
       <input className='w-full h-10 mb-5 rounded-lg border p-3' id='lastname' type="text" name='lastname' placeholder='last name' onChange={handleChange} /><br />
       </div>
       </div>

       <div className='flex flex-wrap gap-5 justify-center'>
            <div className='w-2/5'>
       <div className='text-start mb-2'>  <label htmlFor="number" className='text-start'>Phone Number</label></div>
       <input className='w-full h-10 mb-5 rounded-lg border p-3' id='number' type="number" name='number' placeholder='phone number' onChange={handleChange} /><br />
       </div>
       <div className='w-2/5'>
         <div className='text-start mb-2'>  <label htmlFor="email" className='text-start'>Email</label></div>
       <input className='w-full h-10 mb-5 rounded-lg border p-3' id='email' type="email" name='email' placeholder='email' onChange={handleChange} /><br />
       </div>
       </div>

       <div className='flex flex-wrap gap-5 justify-center'>
            <div className='w-2/5'>
       <div className='text-start mb-2'><label htmlFor="password" >Password</label></div>
        <input className='w-full h-10 mb-10 rounded-lg border p-3' id='password' type="password" name='password' placeholder='password' onChange={handleChange} /><br />
        </div>
       <div className='w-2/5'>
        <div className='text-start mb-2'><label htmlFor="confirmpassword" >Confirm Password</label></div>
        <input className='w-full h-10 mb-10 rounded-lg border p-3' id='confirmpassword' type="password" name='confirmpassword' placeholder='confirm password' onChange={handleConPassChange} /><br />
        </div></div>

        <button className='bg-black text-white py-2 px-4 rounded-3xl h-fit'>Sign Up</button>
        </form>
        <div className='text-center mt-10 w-100'>
        <p>Already have an account?<span className='text-blue-500'><Link to='/login'> Login</Link></span></p>
      </div>
        </div>
    </div>
  )
}

export default SignUp
