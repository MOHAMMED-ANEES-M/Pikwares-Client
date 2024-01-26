import React, { useState } from 'react'
import { GrCreditCard } from 'react-icons/gr'
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { GiPayMoney } from "react-icons/gi";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const PaymentCustomer = () => {

  const [confirmPayment,setConfirmPayment] = useState(false)

  let {id} = useParams()
  let {amount} = useParams()
  let userId = localStorage.getItem('userId')

  let handlePayment= async(e)=>{
    e.preventDefault()
    try{
      let orderStatus = 'Order Placed'
      let customerId = userId
      let productId = id
      let data = ({orderStatus,customerId,productId})
      console.log('data:',data);
      let response = await axios.post(`http://localhost:8000/orders/insert`,data)
      console.log('orders response:',response);
      if(response.data){
        alert('Order Placed')
      }
    }catch(err){
      console.log(err);
      alert(err.response.data.message)
    }
  }

  let payment=()=>{
    setConfirmPayment(!confirmPayment)
  }

  let handleOnlinePayment= async()=>{
    try{
      console.log(amount,'amount');
      let response = await axios.post('http://localhost:8000/paymentorder',{amount})
      console.log('RazPay order response:',response.data);
      var options = {
        "key": "rzp_test_tgyzb525OhQfY8", 
        "amount": response.data.amount, 
        "currency": "INR",
        "name": "Pikwares", 
        "order_id": response.data.id, 
        "callback_url": "http://localhost:8000/paymentCapture",
        // "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        //     "name": "Gaurav Kumar", //your customer's name
        //     "email": "gaurav.kumar@example.com",
        //     "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        // },
        // "notes": {
        //     "address": "Razorpay Corporate Office"
        // },
        // "theme": {
        //     "color": "#3399cc"
        // }
      };
      console.log(options,'onlineoptions');
        const razor = new window.Razorpay(options)
        razor.open()

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
        <div  className=' mt-40 m-auto w-2/5 bg-green-100 px-10 py-10 rounded-3xl'>
        <p className='text-3xl text-center mb-10 '>PAYMENT OPTIONS</p>
        <div>
          <ul className='mx-10'>
            <div onClick={handleOnlinePayment}><div className='text-md bg-white rounded-xl p-3 mb-1 px-5 items-center flex justify-between'><p>Online Payment</p> <i className='text-4xl'><GrCreditCard/></i></div></div>
            {/* <li className='text-md bg-white rounded-xl p-3 mb-1 px-5 items-center flex justify-between'><p>Google Pay</p> <i className='text-4xl'><FaGooglePay/></i></li>
            <li className='text-md bg-white rounded-xl p-3 mb-1 pl-5 pr-4 items-center flex justify-between'><p>Phone Pay</p> <i className='text-4xl'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 24 24">
              <path d="M 5.0097656 3 C 3.9117417 3 3 3.9117417 3 5.0097656 L 3 18.970703 C 3 19.506558 3.2136515 20.02321 3.5957031 20.404297 C 3.9767904 20.786348 4.4934421 21 5.0292969 21 L 18.990234 21 C 19.521034 21 20.032825 20.790427 20.410156 20.412109 L 20.412109 20.410156 C 20.79038 20.032872 21 19.521034 21 18.990234 L 21 5.0214844 C 21 4.4848017 20.786571 3.9721357 20.410156 3.59375 A 1.0001 1.0001 0 0 0 20.40625 3.5898438 C 20.027858 3.2134325 19.515198 3 18.978516 3 L 5.0097656 3 z M 11.0625 6 C 11.347828 6.0000469 11.612672 6.109125 11.794922 6.328125 L 14.46875 9.453125 L 15.636719 9.453125 C 15.976719 9.453125 16.268578 9.7459375 16.267578 10.085938 L 16.267578 10.740234 C 16.267578 10.886234 16.169437 10.984375 16.023438 10.984375 L 14.617188 10.984375 L 14.617188 17.707031 C 14.617188 17.853031 14.472172 18 14.326172 18 L 13.933594 18 C 13.495594 18 13.154297 17.659656 13.154297 17.222656 L 13.154297 15.666016 C 12.668297 15.860016 12.466469 15.908203 11.980469 15.908203 C 10.424469 15.908203 9.6171875 14.887719 9.6171875 13.136719 L 9.6171875 10.984375 L 8.6328125 10.984375 C 8.2928125 10.984375 8 10.571469 8 10.230469 L 8 9.7441406 C 8 9.5981406 8.0961875 9.5019531 8.2421875 9.5019531 L 12.669922 9.5019531 L 9.7519531 6.6699219 C 9.6549531 6.5719219 9.7016562 6.377125 9.8476562 6.328125 L 10.771484 6.0351562 C 10.868984 6.0109062 10.967391 5.9999844 11.0625 6 z M 11.134766 10.982422 L 11.134766 13.136719 C 11.134766 14.012719 11.405594 14.400391 12.183594 14.400391 C 12.475594 14.400391 12.86425 14.351078 13.15625 14.205078 L 13.15625 10.982422 L 11.134766 10.982422 z"></path>
              </svg></i>
            </li>
            <li className='text-md bg-white rounded-xl p-3 mb-1 px-5 items-center flex justify-between'><p>Paytm</p> <i className='text-4xl'><SiPaytm/></i></li>
             */}
            <Link onClick={payment}><li className='text-md bg-white rounded-xl p-3 mb-1 px-5 '><div className='items-center flex justify-between'><p>Cash on Delivery</p> <i className='text-4xl'><GiPayMoney/></i></div>
            { confirmPayment ? (
             <div> <button className='mt-20 sm:mt-5 bg-green-500 text-white py-2 px-3 text-sm rounded h-fit' onClick={(e)=>{handlePayment(e)}}>CONFIRM PAYMENT</button></div>
            ):(
              null
            )}
            </li></Link>

          </ul>
        </div>
        </div>
    </div>
  )
}

export default PaymentCustomer
