import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CustomersAdmin = () => {

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
            alert(err.message)
        }
    },[])

  return (
    <div >

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-40 mx-10 mb-10'>
        { customersData.map((item)=>(
           <Link to={`/viewcartadmin/${item._id}`}> <div className='bg-white border p-5 rounded'>
                <p className='font-bold'>{item.firstname} {item.lastname}</p>
                <p>{item.email}</p>
                <p>{item.number}</p>
            </div></Link>
        ))}
      </div>
      
    </div>
  )
}

export default CustomersAdmin
