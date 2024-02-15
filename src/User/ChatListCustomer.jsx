import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { warnToast } from '../components/Toast'

const ChatListCustomer = () => {

    const [customersData,setCustomersData] = useState([''])
    const navigate = useNavigate()

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    const adminId = 'a1b2c3'

    useEffect(()=>{

        try{

            if(!token){
               return navigate('/login')
            }

            let fetchCustomers= async()=>{

                let response = await axios.get('http://localhost:8000/findCustomers',{
                    headers: {
                        Authorization: token
                      },
                })
                console.log('customers response: ',response);

                const filteredCustomers = response.data.filter((customer) => customer._id !== userId);
                setCustomersData(filteredCustomers);

            }
            fetchCustomers()

        }catch(err){
            console.log(err);
            warnToast(err.message)
        }
    },[])


  return (
    <div className='mt-32'>

      <div className='w-1/3 m-auto mb-5 border rounded'>
      <p className='text-2xl text-center p-3 bg-green-400 rounded-t'>User</p>
        <div className=' h-3/4 overflow-scroll'>
        <div className='bg-white  p-5'>
        <Link to={`/chatcustomer/${adminId}`}><p className='text-lg shadow p-5'>Admin</p></Link>
            { customersData.map((customer)=>(
                <Link to={`/chatcustomer/${customer._id}`}>
                        <p className='text-lg shadow p-5'>{customer.firstname} {customer.lastname}</p>
                </Link>
            ))}
        </div>
        </div>
      </div>

    </div>
  )
}

export default ChatListCustomer
