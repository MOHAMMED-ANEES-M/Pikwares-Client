import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrAdd, GrNext, GrSubtract } from "react-icons/gr";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";




const CartCustomer = () => {

    const [cartData,setCartData] = useState([''])
    const [refresh,setRefresh] = useState(false)
    // const [count,setCount] = useState(0)
    const navigate = useNavigate()
    const sliderRef = useRef();


    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    let increment= async(e,id,pcount,pcategory,pprice,prId)=>{
      e.preventDefault()
      let count = parseInt(pcount, 10) || 1;
      if(count !==9){
        count += 1;
      
      // let productprice = count+pprice
      let category = pcategory
      try{

        console.log('prPrice:',pprice);
        console.log('count:',count);
        console.log('category:',category);
        let data = {count:count,category:category,productprice:pprice,productId:prId,role:'priceIncrement'}
        let response = await axios.put(`http://localhost:8000/updateCount/${id}`,data)
        console.log(response);
        // setCartData(response.data)
        setRefresh(!refresh)

      }  catch(err){
        console.log(err);
      }
    }
    }

    let decrement= async(e,id,pcount,pcategory,pprice,prId)=>{
      e.preventDefault()
      let count = parseInt(pcount, 10) || 1;
      if(count !== 1){
        count -= 1;
      
      // let productprice = pprice/count
      let category = pcategory
      try{

        console.log('prPrice:',pprice);
        console.log('count:',count);
        console.log('category:',category);
        let data = {count:count,category:category,productprice:pprice,productId:prId,role:'priceDecrement'}
        let response = await axios.put(`http://localhost:8000/updateCount/${id}`,data)
        console.log('countupdate response',response);
        // setCartData(response.data)
        setRefresh(!refresh)

      }  catch(err){
        console.log(err);
      }

    }
    }

    let handleCartDelete=async(e,id)=>{
      e.preventDefault()
        try{
            let response = await axios.delete(`http://localhost:8000/deleteCartProduct/${id}`)
            console.log(response);
            setRefresh(!refresh)
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }

    useEffect(()=>{

        try{

            if(!token){
              return  navigate('/login')
            }

            let fetchCart = async()=>{

                let response = await axios.get(`http://localhost:8000/findCart/${userId}`,{
                    headers:{
                        Authorization: token
                    },
                })
                console.log('cart response:',response);
                setCartData(response.data)
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
     <div className='mt-32 flex flex-wrap justify-center gap-5 mb-10'>

        {cartData&&cartData.length!==0 ? (

        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mx-10'>
            { cartData.map((item)=>(
               <Link to={`/viewproduct/${item.productId}/${item.productcategory}`}><div className=' border-2 rounded-xl flex gap-5'>
               <div className='w-1/3 ms-2 mt-4 h-32 relative'>
                    {item && item.images && (
          <Slider {...settings} ref={sliderRef} className=' w-4/5 h-2/5 m-auto'>
            {item.images.map((image, index) => (
              <div className='p-1 h-32'  key={index}>
                <img src={image} alt={`Image ${index [+ 1]}`} className='h-full w-full object-contain object-center aspect-square lg:h-full lg:w-full  rounded-xl  inline-block' />
                
              </div>
            ))}
          </Slider>
        )}
        
                </div>

                <div className='w-1/3 p-5 '>
                    <p className='text-xl mb-5'> {item && item.productname}</p>
                    <p className='text-md mb-5'>₹{item && item.productprice} <span className='ms-2 text-green-600'> ( 60% off )</span></p>
                    <div className='flex gap-3'>
                    <button onClick={(e)=>decrement(e,item._id,item.count,item.productcategory,item.productprice,item.productId)}><GrSubtract/></button>
                    <p className='border-4 px-2'>{item.count}</p>
                    <button onClick={(e)=>increment(e,item._id,item.count,item.productcategory,item.productprice,item.productId)}><GrAdd/></button>
                    </div>
                </div>

                <div className='w-1/3 mt-10'>
                <button className="  mb-1 w-32 bg-red-500 text-white py-2 px-5 text-sm  rounded-xl h-fit" onClick={(e) => handleCartDelete(e,item._id)}>REMOVE</button>
                <Link to={`/checkoutcustomer/${item.productId}/${item.productcategory}`} ><button className="mt-1 w-32 bg-green-500 text-white py-2 px-3 text-sm rounded-xl h-fit">CHECKOUT</button></Link>
                </div>

                </div></Link>
            ))}
        </div>
      
      ):(
        <p className='text-red-500 text-center mt-32 '>No product in cart</p>
      )}
    </div>
  )
}

export default CartCustomer
