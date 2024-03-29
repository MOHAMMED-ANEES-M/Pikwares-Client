import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { warnToast } from '../components/Toast'

const ChatListAdmin = () => {

    const [customersData,setCustomersData] = useState([''])
    const navigate = useNavigate()

    let token = localStorage.getItem('token')

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
                setCustomersData(response.data)
            }
            fetchCustomers()
        }catch(err){
            console.log(err);
            warnToast(err.message)
        }
    },[])

  return (
    <div className='mt-32'>

      <div className='w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 m-auto mb-5 border rounded'>
      <p className='text-2xl text-center p-3 bg-green-400 rounded-t'>Customers</p>
      <div className=' h-3/4 overflow-scroll pt-5 px-5'>
        { customersData.map((customer)=>(
           <Link to={`/chatadmin/${customer._id}`}
           key={customer._id}
           state={{ firstname: customer.firstname, lastname: customer.lastname }}
           >
            <div className='bg-white '>
                <p className='text-lg border rounded p-5 mb-1'>{customer.firstname} {customer.lastname}</p>
            </div></Link>
        ))}
      </div>
      </div>

    </div>
  )
}

export default ChatListAdmin
