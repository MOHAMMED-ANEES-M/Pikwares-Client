import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoDot, GoDotFill, GoStar, GoStarFill } from 'react-icons/go'
import { Link, useNavigate, useParams } from 'react-router-dom'

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

    let handleReciept=()=>{
      navigate(`/paymentreciept?paymentId=${orderData.paymentId}&productId=${orderData.productId}`)
    }

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

        <div className='mr-10'>
          {orderData.mode !== 'COD'?(
            <button className='text-green-500 border py-1 px-4 rounded-xl h-fit' onClick={handleReciept}>Payment Receipt</button> 
          ):(
            <>
            { orderData.orderStatus === 'Order Delivered' ? (
              <p className='text-green-500 font-bold'>Amount paid ₹{productData.productprice*orderData.count}</p>
              ):(
                <p className='text-red-500 font-bold'>Amount to be paid ₹{productData.productprice*orderData.count}</p>
            )}
            </>
          )}
        </div>

      </div>

      <div className='grid grid-cols-4 flex-wrap mt-20'>
        {productData && productData.images && productData.images[0] && (
          <img className='w-20 h-20 mb-10 sm:mb-0 ms-24' src={productData.images[0]} alt="image not found" />
        )}
          <div>
              <p className='mb-1 text-xl'>{productData.productname}</p>
              <p className='font-bold'>₹{productData.productprice}</p>
              <p>Quantity: {orderData.count}</p>
              </div>
              
          <div className='text-center'>
            <p className='font-bold mb-3'>Status</p>
          <p>{orderData.orderStatus} on {orderData.statusDate}</p>
          </div>
          
            <div className='flex gap-1 justify-center items-center mt-5'>
            {orderData.orderStatus === 'Order Delivered'?(
               <>
              <div className='text-green-500 text-xl'><GoStarFill/></div>
              <Link to={`/rateproduct/${productId}/${userId}`}><button className='text-green-500'>Rate & Review Product</button></Link>
              </>
              ):(
                null
              )}
          </div>
            
      </div>

    </div>

  </div>
  )
}

export default ViewOrderCustomer
