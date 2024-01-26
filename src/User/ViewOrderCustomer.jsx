import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoDot, GoDotFill, GoStar, GoStarFill } from 'react-icons/go'
import { useNavigate, useParams } from 'react-router-dom'

const ViewOrderCustomer = () => {

    const [orderData,setOrderData] = useState('')
    const [productData,setProductData] = useState('')
    const [customerData,setCustomerData] = useState('')
    const [addressData,setAddressData] = useState('')

    const navigate = useNavigate()
    let {productId} = useParams()
    let {orderId} = useParams()

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toISOString().split('T')[0];
        const [year, month, day] = formattedDate.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(()=>{

        try{

            if(!token){
                navigate = ('/login')
            }

            let fetchOrderData = async()=>{
        
                let response = await axios.get(`http://localhost:8000/admin/order/findOne/${orderId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('orderData response:',response.data);
        
                if (response.data.statusDate) {
                  response.data.statusDate = formatDate(response.data.statusDate);
                }
        
                setOrderData(response.data)
        
              }
              fetchOrderData()
        
              let fetchProductData = async()=>{
                
                let response = await axios.get(`http://localhost:8000/admin/product/findOne/${productId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('productData response;',response);
                setProductData(response.data)
        
              }
              fetchProductData()

              let fetchCustomerData = async()=>{
        
                let response = await axios.get(`http://localhost:8000/admin/findOneCustomer/${userId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('customerData response;',response);
                setCustomerData(response.data)
        
              }
              fetchCustomerData()
        
              let fetchAddressData = async()=>{
        
                let response = await axios.get(`http://localhost:8000/admin/findAddress/${userId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('addressData response;',response);
                setAddressData(response.data)
        
              }
              fetchAddressData()

        }catch(err){
            console.log(err);
        }
    },[])


  return (
  <div className='mt-32'>

    <div className='border rounded w-4/5 m-auto p-10'>

      <div className='flex flex-wrap justify-between items-center pr-32'>
        <div>
          <h1 className='text-xl font-bold mb-5'>Shipping Address</h1>
          <p>{customerData.firstname} {customerData.lastname}</p>
          <p>{addressData.address} {addressData.city}</p>
          <p>{addressData.district} {addressData.state} - {addressData.pincode}</p>
          <p><span className='mr-2 font-bold'>Landmark:</span> {addressData.landmark}</p>
          <p><span className='mr-2 font-bold'>Phone Number:</span>{customerData.number}</p>
        </div>

        <div className='flex gap-1 items-center'>
          <div className='text-green-500 text-xl'><GoStarFill/></div>
          <button className='text-green-500 text-xl'>Rate & Review Product</button>
        </div>

      </div>

      <div className='flex items-center flex-wrap mt-20 '>

        <div className='flex justify-start w-4/12'>
          {productData && productData.images && productData.images[0] && (
            <img className='w-32 h-32' src={productData.images[0]} alt="image not found" />
          )}
            <div className='p-10'>
              <p className='mb-3 text-xl'>{productData.productname}</p>
              <p className='font-bold'>₹{productData.productprice}</p>
            </div>
        </div>

          <div className='w-8/12'>

          <div className=' grid grid-cols-4 text-center pb-4'>
                <div className='relative'><p>order placed</p> <GoDotFill className='absolute top-7 right-1/2 text-2xl text-green-500'/></div>
                <div className='relative'><p>order shipped</p> <GoDotFill className='absolute top-7 right-1/2 text-2xl text-gray-500'/></div>
                <div className='relative'><p>out for delivery</p> <GoDotFill className='absolute top-7 right-1/2 text-2xl text-gray-500'/></div>
                <div className='relative'><p>order delivered</p> <GoDotFill className='absolute top-7 right-1/2 text-2xl text-gray-500'/></div>
        </div>
              <div className='border-t-2 border-green-500 mx-24 ml-20 mr-28'></div>
        <div className=' grid grid-cols-4 text-center pt-5 '>
                <p> {orderData.statusDate}</p>
                <p> {orderData.statusDate}</p>
                <p> {orderData.statusDate}</p>
                <p> {orderData.statusDate}</p>
        </div>
            
          </div>
      </div>

    </div>

  </div>
  )
}

export default ViewOrderCustomer
