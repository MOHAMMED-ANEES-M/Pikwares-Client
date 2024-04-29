import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { warnToast } from '../components/Toast'
import baseUrl from '../config'
import Loader from '../components/Loader/Loader'

const CustomersAdmin = () => {

    const [customersData,setCustomersData] = useState([''])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    let token = localStorage.getItem('token')

    useEffect(()=>{

        try{

            if(!token){
               return navigate('/login')
            }

            let fetchCustomers= async()=>{

                setLoading(true)
                console.log('loading 1', loading);
                let response = await axios.get(`${baseUrl}/findCustomers`,{
                    headers: {
                        Authorization: token
                      },
                })
                console.log('customers response: ',response);
                if (response.data) {
                  setCustomersData(response.data)
                  setLoading(false)
                  console.log('loading 1', loading);
                }
            }
            fetchCustomers()
        }catch(err){
            console.log(err);
            warnToast(err.message)
        }
    },[])

  return (
    
    <div >
    {loading ? (<Loader />) : (
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-40 mx-10 mb-10 min-h-[31vh]'>
      { customersData.map((item)=>(
        <Link to={`/viewcartadmin/${item._id}`}> <div className='bg-white border p-5 rounded'>
                <p className='font-bold'>{item.firstname} {item.lastname}</p>
                <p>{item.email}</p>
                <p>{item.number}</p>
            </div></Link>
        ))}
        </div>
        
      )}
        </div>
  )
}

export default CustomersAdmin
