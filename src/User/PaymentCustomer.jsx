import React, { useEffect, useState } from 'react'
import { GrCreditCard } from 'react-icons/gr'
import { GiPayMoney } from "react-icons/gi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { successToast, warnToast } from '../components/Toast';


const PaymentCustomer = () => {

  const [confirmPayment,setConfirmPayment] = useState(false)
  const [data,setdata] = useState('')
  const [productData,setProductData] = useState('')
  const navigate = useNavigate()

  let {id} = useParams()
  let {amount} = useParams()
  let {counts} = useParams()

  let userId = localStorage.getItem('userId')
  let token = localStorage.getItem('token')

  let handleCOD= async(e)=>{
    e.preventDefault()
    try{
      let orderStatus = 'Order Placed'
      let customerId = userId
      let productId = id
      let count = counts
      let mode = 'COD'
      let productname = productData.productname
      let productprice = productData.productprice
      let images = productData.images
      let data = ({orderStatus,customerId,productId,count,mode,productname,productprice,images})
      console.log('data:',data);
      let response = await axios.post(`http://localhost:8000/orders/insert`,data)
      console.log('orders response:',response);
      if(response.data){
        successToast('Order Placed')
      }
    }catch(err){
      console.log(err);
      warnToast(err.response.data.message)
    }
  }

  let payment=()=>{
    setConfirmPayment(!confirmPayment)
  }

  let handleOnlinePayment= async(e)=>{
    try{
      console.log(amount,'amount');
      let orderResponse = await axios.post('http://localhost:8000/paymentorder',{amount})
      setdata(orderResponse.data)
      console.log('RazorPay order response:',orderResponse.data);

      var options = {
        "key": "rzp_test_tgyzb525OhQfY8", 
        "amount": orderResponse.data.amount, 
        "currency": "INR",
        "name": "Pikwares", 
        "order_id": orderResponse.data.id, 
        handler: async function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);

          const body = {
            paymentId:response.razorpay_payment_id,
            razorId:response.razorpay_order_id,
            signature:response.razorpay_signature,
            amount:orderResponse.data.amount,
          }
          console.log('body',body);
          let reciept = await axios.post('http://localhost:8000/paymentCapture',body)
          console.log('handler reciept response',reciept);
          if(reciept.data.status === 'ok'){
              const orderDatas = {
                  paymentId:response.razorpay_payment_id,
                  razorId:response.razorpay_order_id,
                  orderStatus : 'Order Placed',
                  customerId : userId,
                  productId : id,
                  count:counts,
                  mode: 'Online Payment',
                  productname : productData.productname,
                  productprice : productData.productprice,
                  images : productData.images
              }
            let orderResponse = await axios.post(`http://localhost:8000/orders/insert`,orderDatas)
            console.log('orders response:',orderResponse);
            if(orderResponse.data){
              navigate(`/paymentreciept?paymentId=${orderDatas.paymentId}&productId=${orderDatas.productId}`)
            }
            }
        }
      };

        console.log('options',options);
        const razor = new window.Razorpay(options)
        razor.on('payment.failed', function (response){
          warnToast(response.error.code);
          warnToast(response.error.description);
          warnToast(response.error.source);
          warnToast(response.error.step);
          warnToast(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        console.log(razor,'razor');
        razor.open()
        e.preventDefault();        

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{

    let fetchProduct = async ()=>{
      try{
        let response = await axios.get(`http://localhost:8000/admin/product/findOne/${id}`,{
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
        <div  className=' mt-40 m-auto w-2/5 bg-green-100 px-10 py-10 rounded-3xl'>
        <p className='text-3xl text-center mb-10 '>PAYMENT OPTIONS</p>
        <div>
          <ul className='mx-10'>
            <div className='cursor-pointer' onClick={handleOnlinePayment}><div className='text-md bg-white rounded-xl p-3 mb-1 px-5 items-center flex justify-between'><p>Online Payment</p> <i className='text-4xl'><GrCreditCard/></i></div></div>
            
            <Link onClick={payment}><li className='text-md bg-white rounded-xl p-3 mb-1 px-5 '><div className='items-center flex justify-between'><p>Cash on Delivery</p> <i className='text-4xl'><GiPayMoney/></i></div>
            { confirmPayment ? (
             <div> <button className='mt-20 sm:mt-5 bg-green-500 text-white py-2 px-3 text-sm rounded h-fit' onClick={(e)=>{handleCOD(e)}}>CONFIRM PAYMENT</button></div>
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
