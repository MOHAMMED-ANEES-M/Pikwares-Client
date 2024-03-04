import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { successToast, warnToast } from '../components/Toast'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyOtp = () => {

    const [otp, setOtp] = useState('')
    const [productData, setProductData] = useState('')

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const count = searchParams.get('count');
    const productprice = searchParams.get('productprice');

    console.log('id',productId);
    console.log('count',count);
    console.log('price',productprice);

    const navigate = useNavigate()   

    const handleChange =(e)=>{
        setOtp({...otp,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const data = {userId, otp}
            let verifyOTP = await axios.post(`http://localhost:8000/verifyotp`,data)
            console.log('verify otp',verifyOTP.data);
            if (verifyOTP.data.success===true) {
                const orderData = {
                    orderStatus:'Order Placed',
                    customerId:userId,
                    productId:productId,
                    count:count,
                    mode:'COD',
                    productname:productData.productname,
                    productprice:productprice,
                    images:productData.images
                }
                console.log('oredrdata',orderData);
                let response = await axios.post(`http://localhost:8000/orders/insert`,orderData)
                console.log('orders response:',response);
                if(response.data){
                    successToast('Order Placed')
                    navigate('/orderscustomer')
                
            }
            }
        }catch(err){
            console.log(err);
            warnToast(err.response.data.msg)
        }
    }

    useEffect(()=>{

        let fetchProduct = async ()=>{
          try{
            let response = await axios.get(`http://localhost:8000/admin/product/findOne/${productId}`,{
              headers: {
                Authorization: token,
              }
            })
            console.log('rating product reponse:',response);
            setProductData(response.data)
          }catch(err){
            console.log(err);
          }
        }
        fetchProduct()
      },[])

  return (
    <div>
       <div>
        <div  className=' mt-40 m-auto w-2/4 min-[400px]:w-3/4 sm:w-2/6 lg:w-2/6 bg-green-100 px-5 sm:px-10 py-10 rounded-3xl'>
        <p className=' text-lg sm:text-3xl text-center mb-10 sm:mb-16 '>Verify OTP</p>
        <div>
            <form onSubmit={handleSubmit} className='text-center'>
                {/* <label htmlFor="otp" className='text-start'>Enter OTP</label><br /> */}
                <input className='p-1 py-2 sm:p-3 text-center mt-3 rounded w-11/12 sm:w-4/5 text-lg' type="number" id='otp' placeholder='Enter OTP' name='otp' onChange={handleChange} /><br />
                <input className='mt-10  sm:mt-5 bg-green-500 text-white py-2 px-3 text-sm rounded h-fit' type="submit" value='Submit' />
            </form>
        </div>
        </div>
    </div>
    </div>
  )
}

export default VerifyOtp
