import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrAdd, GrNext, GrSubtract } from "react-icons/gr";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { errorToast, warnToast } from '../components/Toast';
import DiscountCalculator from '../utils/DiscountCalculator';
import baseUrl from '../config';
import Loader from '../components/Loader/Loader';
import { set } from 'lodash';




const CartCustomer = () => {

    const [cartData,setCartData] = useState([''])
    const [productData,setProductData] = useState([''])
    const [refresh,setRefresh] = useState(false)
    const [loading,setLoading] = useState(false)
    const [waiting,setWaiting] = useState(false)
    // const [count,setCount] = useState(0)
    const navigate = useNavigate()
    const sliderRef = useRef();


    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    


    let increment= async(e,id,pcount,pcategory,pprice,prId,stock,pactualprice)=>{
      e.preventDefault()
      let count = parseInt(pcount, 10) || 1;
      console.log('stock',stock);
      console.log('count',count);
      if(stock>count){
        setWaiting(true)
        count += 1;
      
      // let productprice = count+pprice
      let category = pcategory
      try{

        console.log('pactPrice:',pactualprice);
        console.log('count:',count);
        console.log('category:',category);
        let data = {count:count,category:category,productprice:pprice,productId:prId,productactualprice:pactualprice,role:'priceIncrement'}
        let response = await axios.put(`${baseUrl}/updateCount/${id}`,data)
        console.log(response);
        const updatedCartData = cartData.map(item => {
          if (item.productId === prId) {
            return { ...item, count: item.count + 1 };
          }
          return item; 
        });
        setCartData(updatedCartData)
        // setRefresh(!refresh)
        setWaiting(false)
        
      }  catch(err){
        console.log(err);
      }
    }
    }

    let decrement= async(e,id,pcount,pcategory,pprice,prId,pactualprice)=>{
      e.preventDefault()
      let count = parseInt(pcount, 10) || 1;
      if(count !== 1){
        setWaiting(true)
        count -= 1;
      
      // let productprice = pprice/count
      let category = pcategory
      try{

        console.log('prPrice:',pprice);
        console.log('count:',count);
        console.log('category:',category);
        let data = {count:count,category:category,productprice:pprice,productId:prId,productactualprice:pactualprice,role:'priceDecrement'}
        let response = await axios.put(`${baseUrl}/updateCount/${id}`,data)
        console.log('countupdate response',response);
        const updatedCartData = cartData.map(item => {
          if (item.productId === prId) {
            return { ...item, count: item.count - 1 };
          }
          return item; 
        });
        setCartData(updatedCartData)
        setWaiting(false)
        // setRefresh(!refresh)
      }  catch(err){
        console.log(err);
      }
      
    }
    }

    let handleCartDelete=async(e,id)=>{
      e.preventDefault()
        try{
          setWaiting(true)
            let response = await axios.delete(`${baseUrl}/deleteCartProduct/${id}`)
            console.log(response);
            const updatedCartData = cartData.filter(item => item._id !== id);
            setCartData(updatedCartData);
            setWaiting(false)
            errorToast('Product deleted from cart')
        }catch(err){
            console.log(err);
            warnToast(err.message)
        }
    }

    useEffect(()=>{

        try{

            if(!token){
              return  navigate('/login')
            }

            let fetchCart = async()=>{
              setLoading(true)
                let response = await axios.get(`${baseUrl}/findCart/${userId}`,{
                    headers:{
                        Authorization: token
                    },
                })
                console.log('cart response:',response);
                setCartData(response.data)
                setLoading(false)

                let fetchProducts = async () => {
                  setLoading(true)
                  const productPromises = response.data.map(async (product) => {
                    const productResponse = await axios.get(`${baseUrl}/findOneProduct/${product.productId}/${product.productcategory}`,{
                      headers: {
                          Authorization: token
                        },
                  });
                    return productResponse.data; 
                  });
        
                  const products = await Promise.all(productPromises);
                  setProductData(products);
                  setLoading(false)
                  console.log('products response:',products);
                }
                fetchProducts()

            }
            fetchCart()

        }catch(err){
            console.log(err);
            alert(err.message)
        }

    },[refresh])


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    
      const nextSlide = () => {
        sliderRef.current.slickNext();
      };
    
      const prevSlide = () => {
        sliderRef.current.slickPrev();
      };
    

  return (
    <div className='min-h-screen'>
      {waiting && <Loader />}
    {loading ? (<Loader />) : (
      <div className='mt-32 flex flex-wrap justify-center gap-5 mb-10'>
        {cartData&&cartData.length!==0 ? (

        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mx-10'>
            { cartData.map((item, index)=>(
               <div className=' border-2 rounded-xl grid grid-cols-1  sm:grid-cols-3 gap-5'>
               <Link to={`/viewproduct/${item.productId}/${item.productcategory}`}>
               <div className=' ms-2 mt-4 h-32 relative'>
                    {item && item.images && (
          <Slider {...settings} ref={sliderRef} className=' w-4/5 h-2/5 m-auto'>
            {item.images.map((image, index) => (
              <div className='p-1 h-32'  key={index}>
                <img src={image} alt={`Image ${index [+ 1]}`} className='h-full w-full object-contain object-center aspect-square lg:h-full lg:w-full  rounded-xl  inline-block' />
                
              </div>
            ))}
          </Slider>
        )}
                </div></Link>

                <div className='m-auto sm:text-start p-5 '>

                    <p className='text-xl mb-3'> {item && item.productname}</p>
                    
                    <div className=" items-center mb-3">
                    <p className='text-lg  '>₹{item.productprice} 
                    <span className='ms-2 line-through opacity-50'>₹{item.productactualprice}</span> </p>
                    <DiscountCalculator actualPrice={item.productactualprice} offerPrice={item.productprice} />
                    </div>

                    {productData[index] && productData[index].stock === '0' ? (
                    <p className='text-lg text-red-500'>Out of Stock</p>
                    ):(
                    <div className='flex gap-3'>
                    <button onClick={(e)=>decrement(e,item._id,item.count,item.productcategory,item.productprice,item.productId,item.productactualprice)}><GrSubtract/></button>
                    <p className='border-4 px-2'>{item.count}</p>
                    <button onClick={(e)=>increment(e,item._id,item.count,item.productcategory,item.productprice,item.productId,productData[index].stock,item.productactualprice)}><GrAdd/></button>
                    </div>
                     )}

                </div>

                <div className='text-center mb-5 sm:mb-0 sm:mt-10'>
                <button className={`mb-1 w-32 bg-red-500 text-white py-2 px-5 text-sm rounded-xl h-fit ${productData[index]?.stock === '0' ? 'mt-8' : ''}`} onClick={(e) => handleCartDelete(e,item._id)}>REMOVE</button><br />
                {productData[index] && productData[index].stock !== '0' &&
                <Link to={`/checkoutcustomer/${item.productId}/${item.productcategory}`} ><button className="mt-1 w-32 bg-green-500 text-white py-2 px-3 text-sm rounded-xl h-fit">CHECKOUT</button></Link>
                }
                </div>

                </div>
            ))}
        </div>
      
      ):(
        <p className='text-red-500 text-center mt-32 '>No product in cart</p>
      )}
    </div>
      )}
      </div>
  )
}

export default CartCustomer
