import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GrEdit } from 'react-icons/gr'
import { Link, useNavigate, useParams } from 'react-router-dom'

const CheckoutCustomer = () => {

    const [profileData,setProfileData] = useState('')
    const [addressData,setAddressData] = useState('')
    const [productData,setProductData] = useState('')
    const navigate = useNavigate()

    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    let {id} = useParams()
    let {category} = useParams()


    useEffect(()=>{
        
        let fetchAccount= async ()=>{
            try{

                if(!token){
                    navigate('/login')
                }

            let response = await axios.get(`http://localhost:8000/customer/findAccount/`,{
                headers: {
                    Authorization: token
                  },
                  params: {
                    id: userId,
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
            let response = await axios.get(`http://localhost:8000/customer/address/findAddress`,{
                headers: {
                    Authorization: token
                  },
                  params: {
                    id: userId,
                  },
            })
            console.log('customer address response: ',response);
            setAddressData(response.data)
           
          }catch(err){
            console.log(err);
        }
    }
    fetchAddress()

    let fetchProduct= async ()=>{

        try{

            let response = await axios.get(`http://localhost:8000/findOneProduct/${id}/${category}`)
            console.log('view product response:',response);
            setProductData(response.data)
            
        }catch(err){
            console.log(err);
        }

    }
    fetchProduct()

    },[])


  return (
    <div className='mt-28 mx-10 lg:mx-0 lg:flex flex-wrap justify-evenly h-fit'>

        <div className='lg:w-3/6 border rounded p-10'>
            <h1 className='text-2xl font-bold mb-10 '>{profileData.firstname} {profileData.lastname}</h1>

            <div className=' mb-10'>
            <p className='font-bold mb-5 border-b-2 pb-1'>SHIPPING ADDRESS</p>
            <p>{addressData.address}</p>
            <p>{addressData.city} {addressData.district}</p>
            <p>{addressData.state} - {addressData.pincode}</p>
            <p>Landmark: {addressData.landmark}</p>
            <Link to={'/accountcustomer'}><button className='mt-2 bg-green-500 text-white py-2 px-3 text-sm rounded h-fit'><GrEdit/></button></Link>
            </div>

            <div>
            <p className='font-bold mb-5 border-b-2 pb-1'>ORDER SUMMARY</p>
            <div className='grid grid-cols-1 sm:grid-cols-3 px-5'>
            {productData.images && productData.images.length > 0 && (
                    <img className='w-20 h-20 mb-10 sm:mb-0' key={productData.images[0].id} src={productData.images[0]} alt="" />
                    )} 
                <div>
                <p className='text-2xl mb-1'>{productData.productname}</p>
                <p className='text-lg font-semibold mt-1'>₹{productData.productprice}</p>
                </div>
               <Link to={`/paymentcustomer/${productData._id}`}><div className='sm:text-end'><button className='mt-10 sm:mt-5 bg-green-500 text-white py-2 px-3 text-sm rounded h-fit'>PLACE ORDER</button></div></Link>
            </div>
            </div>

        </div>

        <div className='w-11/12 sm:w-3/6 lg:w-2/6'>
            <div className='border my-10 lg:my-0 rounded p-5 sm:p-10'>
            <p className='font-bold mb-5 border-b-2 pb-1'>PRICE DETAILS</p>
            <div className='flex justify-between'>   
            <div>
            <p className='text-lg mb-5'>Price</p>
            <p className='text-lg mb-5'>Delivery Charge </p>
            <p className='text-lg font-bold'>Total Payable </p>
            </div>
            <div className='text-end'>
            <p className='text-lg mb-5'>₹{productData.productprice}</p>
            <p className='text-lg mb-5 text-green-500'><span className='line-through text-black opacity-40'>₹40</span> FREE</p>
            <p className='text-lg font-bold'>₹{productData.productprice}</p>
            </div>
            </div>
        </div>
        </div>

    </div>
  )
}

export default CheckoutCustomer
