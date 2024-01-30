import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'


const PaymentSuccess = () => {

  const [orderData,setOrderData] = useState('')
  const [accountData,setAccountData] = useState('')
  const [addressData,setAddressData] = useState('')
  const [productData,setProductData] = useState('')
  const [paymentData,setPaymentData] = useState('')

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('paymentId');
  const productId = searchParams.get('productId');
  const cartId = searchParams.get('cartId');

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toISOString().split('T')[0];
    const [year, month, day] = formattedDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleDownload = () => {
    // Create a Blob containing the receipt content
    const receiptContent = generateReceiptContent(); // You need to implement this function
    const blob = new Blob([receiptContent], { type: 'text/plain' });

    // Create a download link and trigger a click to download the file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'receipt.txt';
    link.click();
  };

  const generateReceiptContent = () => {
    // Generate the content of the receipt as a string
    // You can format it based on your requirements
    const receiptContent = `

                                                        Pikwares

                                                    Payment Reciept


                Order Date: ${paymentData.timestamp}                                    ${accountData.firstname} ${accountData.lastname}
                Order Id: ${orderData._id}                        ${addressData.address}
                Payment Id: ${paymentId}                            ${addressData.district}, ${addressData.pincode} - ${addressData.pincode}
                                                                          Phone Number: ${accountData.number}


                                                  Product: ${productData.productname}
                                                  Unit Price: ₹${productData.productprice}
                                                  Quantity: ${orderData.count}
                                                  Delivery Charge: FREE
                                                  Total Paid: ₹${paymentData.amount}

    `;

    return receiptContent;
  };

  useEffect(()=>{

    
    let fetchOrder=async()=>{
        try{
        let response = await axios.get(`http://localhost:8000/findOrder/${paymentId}`,{
          headers: {
            Authorization: token
          }
        })
        console.log('order response:',response);
        if (response.data.statusDate) {
          response.data.statusDate = formatDate(response.data.statusDate);
        }
        setOrderData(response.data)
      }catch(err){
        console.log(err);
      }
    }

      let fetchAccount=async()=>{
        try{
        let response = await axios.get(`http://localhost:8000/customer/findAccount/`,{
          headers: {
              Authorization: token
            },
            params: {
              id: userId,
            },
      })
      console.log('customer response:',response);
      setAccountData(response.data)
      }catch(err){
        console.log(err);
      }
      }

      let fetchProduct=async()=>{
        try{
        let response = await axios.get(`http://localhost:8000/admin/product/findOne/${productId}`,{
          headers: {
              Authorization: token
            }
      })
      console.log('product response:',response);
      setProductData(response.data)
      }catch(err){
        console.log(err);
      }
    }

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
          console.log('address response: ',response);
          setAddressData(response.data)
        }catch(err){
          console.log(err);
      }
  }

  let fetchPayment=async()=>{
    try{
      let response = await axios.get(`http://localhost:8000/findPayment/${paymentId}`,{
        headers: {
            Authorization: token
          }
    })
    console.log('payment response:',response);
    if (response.data.timestamp) {
      response.data.timestamp = formatDate(response.data.timestamp);
    }
    setPaymentData(response.data)
    }catch(err){
      console.log(err);
    }
  }


  fetchOrder()
  fetchAccount()
  fetchProduct()
  fetchAddress()
  fetchPayment()

  },[])

  

  return (
    <div className='mt-32 w-3/5 m-auto border rounded p-10 mb-10'>

      <p className='text-center text-3xl font-bold mb-10 text-green-500'>Pikwares</p>
      <p className='text-center text-xl font-bold mb-20'>Online Reciept</p>
      
      <div className='flex flex-wrap justify-around'>

        <div className='flex justify-center gap-5'>
          <div className='flex gap-2'>
            <div>
            <p>Order Date</p>
            <p>Order Id</p>
            <p>Payment Id</p>
            </div>
            <div>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
          </div>
          <div>
            <p>{paymentData.timestamp}</p>
            <p>{orderData._id}</p>
            <p>{paymentId}</p>
          </div>
        </div>

          <div>
            <p>{accountData.firstname} {accountData.lastname}</p>
            <p>{addressData.address}</p>
            <p>{addressData.district}, {addressData.pincode} - {addressData.pincode}</p>
            <p>Phone Number: {accountData.number}</p>
          </div>
      </div>

      <div className='flex justify-center gap-20 mt-20 text-xl'>
          <div className='flex gap-5'>
            <div>
            <p className='mb-2'>Product</p>
            <p className='mb-2'>Unit Price</p>
            <p className='mb-2'>Quantity</p>
            <p className='mb-5'>Delivery Charge</p>
            <p className='text-xl font-bold'>Total Paid</p>
            </div>
            <div>
              <p className='mb-2'>:</p>
              <p className='mb-2'>:</p>
              <p className='mb-2'>:</p>
              <p className='mb-5'>:</p>
              <p className='text-xl font-bold'>:</p>
            </div>
          </div>
          <div>
            <p className='mb-2'>{productData.productname}</p>
            <p className='mb-2'>₹{productData.productprice}</p>
            <p className='mb-2'>{orderData.count}</p>
            <p className='text-green-500 mb-5'><span className='line-through text-black opacity-50'>₹40</span> FREE</p>
            <p className='text-xl font-bold'>₹{paymentData.amount}</p>
          </div>
        </div>
        <div className='text-center'>
          <button className='mt-16 bg-green-500 text-white py-2 px-4 rounded-xl h-fit' onClick={handleDownload}>
            Download Receipt
          </button>
        </div>
    </div>
  )
}

export default PaymentSuccess
