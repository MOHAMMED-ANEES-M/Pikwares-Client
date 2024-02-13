import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'
import { successToast, warnToast } from '../components/Toast'

const ViewOrderAdmin = () => {

  const [orderData,setOrderData] = useState('')
  const [productData,setProductData] = useState('')
  const [customerData,setCustomerData] = useState('')
  const [addressData,setAddressData] = useState('')
  const [isStatusUpdate,setIsStatusUpdate] = useState(false)
  const [selectedValue, setSelectedValue] = useState('');
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate()

  let token = localStorage.getItem('token')

  let {customerId} = useParams()
  // let {productId} = useParams()
  let {orderId} = useParams()


  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toISOString().split('T')[0];
    const [year, month, day] = formattedDate.split('-');
    return `${day}-${month}-${year}`;
  };

  let handleStatus=()=>{
    setIsStatusUpdate(true)
  }

  let handleStatusCancel=()=>{
    setIsStatusUpdate(false)
  }

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  let handleStatusSubmit= async()=>{
    try{

      if(selectedValue){
        console.log('sel',selectedValue);
        let data = { orderSatus: selectedValue }
        let response = await axios.put(`http://localhost:8000/admin/order/updateStatus/${orderId}`,data,{
          headers: {
            Authorization: token,
          }
        })
        console.log('updated orderData:',response);
        successToast('Status updated')
        setOrderData(response.data)
        setIsStatusUpdate(false)
        setRefresh(!refresh)
      }
    }catch(err){
      console.log(err);
      warnToast(err.message)
    }
  }

  useEffect(()=>{

    try{

      if(!token){
       return navigate('/login')
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

      // let fetchProductData = async()=>{
        
      //   let response = await axios.get(`http://localhost:8000/admin/product/findOne/${productId}`,{
      //     headers: {
      //       Authorization: token,
      //     }
      //   })
      //   console.log('productData response;',response);
      //   setProductData(response.data)

      // }
      // fetchProductData()

      let fetchCustomerData = async()=>{
        
        let response = await axios.get(`http://localhost:8000/admin/findOneCustomer/${customerId}`,{
          headers: {
            Authorization: token,
          }
        })
        console.log('customerData response;',response);
        setCustomerData(response.data)

      }
      fetchCustomerData()

      let fetchAddressData = async()=>{

        let response = await axios.get(`http://localhost:8000/admin/findAddress/${customerId}`,{
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
      alert(err.message)
    }

     

  },[refresh])
  
  return (
    <div className='mt-32'>
      
      <div className='border rounded w-4/5 m-auto p-10'>
        <div className='flex flex-wrap justify-between'>

        <div className='mb-32'>
        <h1 className='text-xl font-bold mb-5'>Shipping Address</h1>
        <p>{customerData.firstname} {customerData.lastname}</p>
          <p>{addressData.address} {addressData.city}</p>
          <p>{addressData.district} {addressData.state} - {addressData.pincode}</p>
          <p><span className='mr-2'>Landmark:</span> {addressData.landmark}</p>
          <p><span className='mr-2'>Phone Number:</span>{customerData.number}</p>
      </div>
      
      <div className=' mt-16 mr-32'>
        {orderData.mode === 'COD' ? (
          <>
            {orderData.orderSatus === 'Order Delivered' ? (
              <>
                <p className='mb-3'>Payment mode: {orderData.mode}</p>
                <p className='text-green-500 font-bold'>Amount paid ₹{orderData.productprice * orderData.count}</p>
              </>
            ) : (
              <>
                <p className='mb-3'>Payment mode: {orderData.mode}</p>
                <p className='text-red-500 font-bold'>Amount to be paid ₹{orderData.productprice * orderData.count}</p>
              </>
            )}
          </>
        ) : (
          <>
            <p className='mb-3'>{orderData.mode}</p>
            <p className='text-green-500 font-bold'>Amount paid ₹{orderData.productprice * orderData.count}</p>
          </>
        )}
      </div>


      </div>

      <div className='grid grid-cols-4 flex-wrap '>
        {orderData && orderData.images && orderData.images[0] && (
          <img className='w-20 h-20 mb-10 sm:mb-0 ms-24' src={orderData.images[0]} alt="image not found" />
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
          
            <div className='flex justify-center items-center'>
              { isStatusUpdate?(
                <div className="text-center">
                {/* <label htmlFor="orderStatusDropdown" className=" mb-2">Select Order Status:</label> */}
                <select id="orderStatusDropdown" onChange={handleChange} className="px-4 mb-2 py-2 flex justify-center border border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition duration-300">
                  <option >Select Status</option>
                  <option value="Order Shipped">Order Shipped</option>
                  <option value="Out For Delivery">Out for Delivery</option>
                  <option value="Order Delivered">Order Delivered</option>
                </select>
                <button className='bg-red-500 mr-2 text-white py-2 px-3 w-5/12 text-sm rounded h-fit' onClick={handleStatusCancel}>Cancel</button>
                <button className='bg-green-500 text-white py-2 px-3 w-5/12 text-sm rounded h-fit' onClick={handleStatusSubmit}>Submit</button>
        
              </div>
              ):(
                <button className='bg-green-500 text-white py-2 px-3 w-2/6 text-sm rounded h-fit' onClick={handleStatus}>Update</button>
              )}
            </div>
            
      </div>

      </div>
    </div>
  )
}

export default ViewOrderAdmin
