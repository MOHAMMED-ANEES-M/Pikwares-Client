import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import baseUrl from '../config'

const ViewCartAdmin = () => {

    const [profileData,setProfileData] = useState('')
    const [addressData,setAddressData] = useState('')
    const [cartData,setCartData] = useState([''])
    const [isCart,setIsCart] = useState(true)
    const navigate = useNavigate()

    let {id} = useParams()
    let token = localStorage.getItem('token')


    useEffect(()=>{

        let fetchAccount= async ()=>{
            try{

                if(!token){
                    navigate('/login')
                }

            let response = await axios.get(`${baseUrl}/customer/findAccount/`,{
                headers: {
                    Authorization: token
                  },
                  params: {
                    id: id,
                  },
            })

            console.log('customer account response: ',response);
            setProfileData(response.data)
            
        }catch(err){
            console.log(err);
        }
    }
    fetchAccount()

    let fetchAddress= async ()=>{

        try{
            let response = await axios.get(`${baseUrl}/customer/address/findAddress`,{
                headers: {
                    Authorization: token
                  },
                  params: {
                    id: id,
                  },
            })
            console.log('customer address response: ',response);
            setAddressData(response.data)
           
          }catch(err){
            console.log(err);
        }
    }
    fetchAddress()

    let fetchCart = async()=>{

        let response = await axios.get(`${baseUrl}/findCart/${id}`,{
            headers:{
                Authorization: token
            },
        })
        console.log('customer cart response:',response);
        setCartData(response.data)
        setIsCart(true)
        if(response.data && response.data.length===0){
            setIsCart(false)
        }
    }
    fetchCart()

    },[])


  return (
    <div className='w-full'>

      <div className='w-11/12 sm:w-4/5 p-4 sm:p-20 border rounded m-auto mt-28 mb-10'>

      <div className='mb-20'>
                <p className='font-bold text-xl sm:text-2xl'>{profileData.firstname} {profileData.lastname}</p>
            </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-wrap'>
            
            <div>
                <p className='opacity-60 font-semibold mb-1'>Email</p>
                <p >{profileData.email}</p>
            </div>
            <div>
                <p className='opacity-60 font-semibold mb-1'>Phone Number</p>
                <p >{profileData.number}</p>
            </div>
            <div>
                <p className='opacity-60 font-semibold mb-1'>Address</p>
                <p >{addressData.address}</p>
                <p >{addressData.city} {addressData.district}</p>
                <p>{addressData.state} - {addressData.pincode}</p>
                <p ><span className='opacity-60 font-semibold'>Landmark: </span> {addressData.landmark}</p>
            </div>
        </div>

        <div className='mt-32'>
            <h3 className=' mb-5 sm:ps-20 text-4xl font-bold'>Cart</h3>
        { isCart ? (
            <>
            {cartData.map((item) => (
                <Link to={`/viewproductadmin/${item.productId}/${item.productcategory}`}>
                <div className='mb-5 border-t-2 pt-5 sm:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-y-5 gap-x-20' key={item.id}>
                    {item.images && item.images.length > 0 && (
                    <img className='w-20 h-20' key={item.images[0].id} src={item.images[0]} alt="" />
                    )} 
                    <p>{item.productname}</p>
                    <p>₹{item.productprice}</p>
                    <p>Quantity: {item.count}</p>
                    {/* <div className='text-center'><button className='bg-green-500 text-white py-2 px-4 rounded-xl h-fit'>Deliver</button></div> */}
                </div>
                </Link>
            ))}
        </>
        ):(
            <p className='text-center mt-10'>No product in Cart</p>
            )}
            </div>
        

      </div>

    </div>
  )
}

export default ViewCartAdmin
