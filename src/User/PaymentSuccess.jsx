import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import easyinvoice from "easyinvoice";
import { infoToast } from '../components/Toast';


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

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toISOString().split('T')[0];
    const [year, month, day] = formattedDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const downloadInvoice = async () => {
    infoToast('Reciept will be downloaded after sometime. Please wait for a while')
    const data = {
    images: {
        // The logo on top of your invoice
        // logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        // background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
    },
    // Your own data
    sender: {
        company: "Pikwares",
        address: "an@pikwares.com",
        // zip: "1234 AB",
        // city: "Sampletown",
        // country: "Samplecountry"
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    // Your recipient
    client: {
        company: `${accountData.firstname} ${accountData.lastname}`,
        address: `${addressData.address}`,
        zip: `${addressData.district}`,
        city: `${addressData.state} - ${addressData.pincode}`,
        country: `Phone Number: ${accountData.number}`
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    information: {
        number: `${paymentData.timestamp}`,
        date: `${orderData._id}`,
        dueDate: `${paymentData.paymentId}`
    },
    products: [
        {
            quantity: `${orderData.count}`,
            description: `${productData.productname}`,
            taxRate: 0,
            price: `${productData.productprice}`
        },
    ],
    // The message you would like to display on the bottom of your invoice
    // bottomNotice: "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    settings: {
        currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // marginTop: 25, // Defaults to '25'
        // marginRight: 25, // Defaults to '25'
        // marginLeft: 25, // Defaults to '25'
        // marginBottom: 25, // Defaults to '25'
        // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // height: "1000px", // allowed units: mm, cm, in, px
        // width: "500px", // allowed units: mm, cm, in, px
        // orientation: "landscape" // portrait or landscape, defaults to portrait
    },  

    translate: {
      invoice: "INVOICE",
      number: "Order ID", 
      date: "Order Date", 
      dueDate: "Payment ID"
    },


    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    // "customize": {
    //      "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    // }
};
  
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_1.pdf`, result.pdf);
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
      <p className='text-center text-xl font-bold mb-20'>Payment Reciept</p>
      
      <div className='flex flex-wrap justify-around'>

          <div>
            <p>{accountData.firstname} {accountData.lastname}</p>
            <p>{addressData.address}</p>
            <p>{addressData.district}, {addressData.pincode} - {addressData.pincode}</p>
            <p>Phone Number: {accountData.number}</p>
          </div>

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
            <p className='text-xl font-bold'>₹{productData.productprice*orderData.count}</p>
          </div>
        </div>
        <div className='text-center'>
          <button className='mt-16 bg-green-500 text-white py-2 px-4 rounded-xl h-fit' onClick={() => downloadInvoice()}>
            Download Receipt
          </button>
        </div>
    </div>
  )
}

export default PaymentSuccess
