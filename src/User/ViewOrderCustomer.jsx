import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoStarFill } from 'react-icons/go'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { errorToast } from '../components/Toast'
import baseUrl from '../config'
import Loader from '../components/Loader/Loader'

const ViewOrderCustomer = () => {

    const [orderData,setOrderData] = useState('')
    // const [productData,setProductData] = useState('')
    const [customerData,setCustomerData] = useState('')
    const [addressData,setAddressData] = useState('')
    const [refresh,setRefresh] = useState(false)
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    // let {productId} = useParams()
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

    let handleCancel=async (id)=>{
      try{
        setLoading(true)
        const data = {orderStatus: 'Order Cancelled'}
        let response = await axios.put(`${baseUrl}/cancelOrder/${id}`,data)
        console.log('order cancel response:',response);
        setLoading(false)
        errorToast('Order Cancelled')
        setRefresh(!refresh)
      }catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{

        try{

            if(!token){
               return navigate('/login')
            }
            
            let fetchOrderData = async()=>{
                setLoading(true)
                let response = await axios.get(`${baseUrl}/admin/order/findOne/${orderId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('orderData response:',response.data);
        
                if (response.data.statusDate) {
                  response.data.statusDate = formatDate(response.data.statusDate);
                }
        
                setOrderData(response.data)
                setLoading(false)
              }
              fetchOrderData()

              let fetchCustomerData = async()=>{
                setLoading(true)
                let response = await axios.get(`${baseUrl}/admin/findOneCustomer/${userId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('customerData response;',response);
                setCustomerData(response.data)
                setLoading(false)
              }
              fetchCustomerData()
        
              let fetchAddressData = async()=>{
                setLoading(true)
                let response = await axios.get(`${baseUrl}/admin/findAddress/${userId}`,{
                  headers: {
                    Authorization: token,
                  }
                })
                console.log('addressData response;',response);
                setAddressData(response.data)
                setLoading(false)
              }
              fetchAddressData()

        }catch(err){
            console.log(err);
        }
    },[refresh])


  return (
  <div className='mt-32 min-h-screen'>
    {loading ? (<Loader />) : (
    <div className='border rounded w-4/5 m-auto p-3 sm:p-10'>

      <div className='flex flex-wrap justify-around gap-10 gap-x-20 items-center mb-0 sm:mb-20'>
        <div className=''>
          <h1 className='text-xl font-bold mb-5'>Shipping Address</h1>
          <p>{customerData.firstname} {customerData.lastname}</p>
          <p>{addressData.address} {addressData.city}</p>
          <p>{addressData.district} {addressData.state} - {addressData.pincode}</p>
          <p><span className='mr-2 font-bold'>Landmark:</span> {addressData.landmark}</p>
          <p><span className='mr-2 font-bold'>Phone Number:</span>{customerData.number}</p>
        </div>

        <div className='mb-20'>
          
          {orderData.mode !== 'COD'?(
            <>
            <button className='text-green-500 border mb-5 py-1 px-4 rounded-xl h-fit' onClick={handleReciept}>Payment Receipt</button> 
            <p className='text-green-500 font-bold'>Amount paid ₹{orderData.productprice}</p>
            </>
          ):(
            <>
            { orderData.orderStatus === 'Order Delivered' ? (
              <p className='text-green-500 font-bold'>Amount paid ₹{orderData.productprice}</p>
              ):(
                <>
                { orderData.orderStatus === 'Order Cancelled' ?(
                  <p className='text-red-500 font-bold'>Order Cancelled</p>
                ):(
                  <>
                <button className="mb-5 ms-7 bg-red-500 text-white py-2 px-5 text-sm  rounded-xl h-fit" onClick={()=>handleCancel(orderData._id)}>CANCEL ORDER</button>
                <p className='text-red-500 font-bold'>Amount to be paid ₹{orderData.productprice}</p>
                </>
                )}
                </>
            )}
            </>
          )}
        </div>

      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 flex-wrap text-center place-items-center '>
        {orderData && orderData.images && orderData.images[0] && (
          <img className='w-20 h-20 mb-10 sm:mb-0 ' src={orderData.images[0]} alt="image not found" />
        )}
          <div>
              <p className='mb-1 text-xl'>{orderData.productname}</p>
              <p className='font-bold'>₹{orderData.productprice}</p>
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
              <Link to={`/rateproduct/${orderData.productId}/${userId}`}><button className='text-green-500'>Rate & Review Product</button></Link>
              </>
              ):(
                null
              )}
          </div>
            
      </div>

    </div>
    )}
  </div>
  )
}

export default ViewOrderCustomer
