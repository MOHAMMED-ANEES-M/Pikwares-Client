import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GrAdd, GrEdit, GrSubtract } from 'react-icons/gr'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { warnToast } from '../components/Toast'
import baseUrl from '../config'
import Loader from '../components/Loader/Loader'

const CheckoutCustomer = () => {

    const [profileData,setProfileData] = useState('')
    const [addressData,setAddressData] = useState('')
    const [productData,setProductData] = useState('')
    const [cartData,setCartData] = useState('')
    const [refresh,setRefresh] = useState(false)
    const [waiting,setWaiting] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    let {id} = useParams()
    let {category} = useParams()


    let increment= async(id,pcount,pcategory,pprice,prId,stock)=>{
      let count = parseInt(pcount, 10) || 1;
      if(stock>count){
          setWaiting(true)
          count += 1;
        
        // let productprice = count+pprice
        let category = pcategory
        try{
  
          let data = {count:count,category:category,productprice:pprice,productId:prId,role:'priceIncrement'}
          let response = await axios.put(`${baseUrl}/updateCount/${id}`,data)
          console.log(response);
          const updatedCartData = { ...cartData, count: cartData.count + 1 };
          setCartData(updatedCartData)
          setWaiting(false)
          // setRefresh(!refresh)
        }  catch(err){
          console.log(err);
        }
      }
      }
  
      let decrement= async(id,pcount,pcategory,pprice,prId)=>{
        let count = parseInt(pcount, 10) || 1;
        if(count !== 1){
          setWaiting(true)
          count -= 1;
        
        // let productprice = pprice/count
        let category = pcategory
        try{
  
          let data = {count:count,category:category,productprice:pprice,productId:prId,role:'priceDecrement'}
          let response = await axios.put(`${baseUrl}/updateCount/${id}`,data)
          console.log('countupdate response',response);
          const updatedCartData = { ...cartData, count: cartData.count - 1 };
          setCartData(updatedCartData)
          setWaiting(false)
          // setRefresh(!refresh)
        }  catch(err){
          console.log(err);
        }
  
      }
      }

      const handlePlaceOrderClick = () => {
        if (!addressData) {
            warnToast('Please provide a shipping address before placing the order.');
        } else {
            navigate(`/paymentcustomer/${productData._id}/${totalAmount}/${cartData.count}`);
        }
    };


    useEffect(()=>{
        
        let fetchAccount= async ()=>{
            try{

                if(!token){
                    navigate('/login')
                }

                setLoading(true)
            let response = await axios.get(`${baseUrl}/customer/findAccount/`,{
                headers: {
                    Authorization: token
                  },
                  params: {
                    id: userId,
                  },
            })

            console.log('customer account response: ',response);
            setProfileData(response.data)
            setLoading(false)
        }catch(err){
            console.log(err);
        }
    }
    fetchAccount()


    let fetchAddress= async ()=>{

        try{
          setLoading(true)
            let response = await axios.get(`${baseUrl}/customer/address/findAddress`,{
                headers: {
                    Authorization: token
                  },
                  params: {
                    id: userId,
                  },
            })
            console.log('customer address response: ',response);
            setAddressData(response.data)
           setLoading(false)
          }catch(err){
            console.log(err);
        }
    }
    fetchAddress()

    let fetchProduct= async ()=>{

        try{
          setLoading(true)
            let response = await axios.get(`${baseUrl}/findOneProduct/${id}/${category}`)
            console.log('view product response:',response);
            setProductData(response.data)
            setLoading(false)
        }catch(err){
            console.log(err);
        }

    }
    fetchProduct()

    let fetchCart = async()=>{
      setLoading(true)
        let response = await axios.get(`${baseUrl}/findOneCart/${id}/${userId}`,{
            headers:{
                Authorization: token
            },
        })
        console.log('cart response:',response);
        
        setCartData(response.data)
        setLoading(false)
    }
    fetchCart()

    },[refresh])

    const totalAmount = parseInt(cartData.productprice,10)+parseInt(productData.deliverycharge,10)


  return (
    <div className='min-h-screen'>
      {waiting && <Loader />}
      {loading ? (<Loader />) : (

    <div className='mt-28 mx-3 sm:mx-10 lg:flex flex-wrap justify-evenly h-fit'>

        <div className='lg:w-3/6 border rounded p-3 sm:p-10'>
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
            <div className='grid grid-cols-1 sm:grid-cols-4 px-5'>
            {productData.images && productData.images.length > 0 && (
                    <img className='w-20 h-20 mb-10 sm:mb-0' key={productData.images[0].id} src={productData.images[0]} alt="" />
                    )} 
                <div>
                <p className='text-2xl mb-1'>{productData.productname}</p>
                <p className='text-lg font-semibold mt-1'>₹{cartData.productprice}</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <button onClick={()=>decrement(cartData._id,cartData.count,cartData.productcategory,cartData.productprice,cartData.productId)}><GrSubtract/></button>
                    <p className='border-4 py-0 px-2'>{cartData.count}</p>
                    <button onClick={()=>increment(cartData._id,cartData.count,cartData.productcategory,cartData.productprice,cartData.productId,productData.stock)}><GrAdd/></button>
                    </div>
              <div className='sm:text-end'>
                  <button
                      className='mt-10 sm:mt-5 bg-green-500 text-white py-2 px-3 text-sm rounded h-fit'
                      onClick={handlePlaceOrderClick}
                  >
                      PLACE ORDER
                  </button>
              </div>

            </div>
            </div>

        </div>

        <div className='w-11/12 md:w-4/6 lg:w-2/6 mx-auto'>
            <div className='border my-10 lg:my-0 rounded p-5 sm:p-10'>
            <p className='font-bold mb-5 border-b-2 pb-1'>PRICE DETAILS</p>
            <div className='flex justify-between'>   
            <div>
            <p className='text-lg mb-5'>Price</p>
            <p className='text-lg mb-5'>Quantity</p>
            <p className='text-lg mb-5'>Delivery Charge </p>
            <p className='text-lg font-bold'>Total Payable </p>
            </div>
            <div className='text-end'>
            <p className='text-lg mb-5'>₹{productData.productprice}</p>
            <p className='text-lg mb-5'>₹{cartData.count}</p>
            <p className='text-lg mb-5'>₹{productData.deliverycharge}</p>
            <p className='text-lg font-bold'>₹{totalAmount}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
  )}
    </div>

  )
}

export default CheckoutCustomer
