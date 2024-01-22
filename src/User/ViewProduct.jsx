import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrNext } from "react-icons/gr";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrPrevious } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";


const ViewProduct = () => {

    const [productData,setProductData] =useState('')
    const [isCart,setIsCart] =useState(false)
    const [refresh,setRefresh] =useState(false)
    const sliderRef = useRef();
    const navigate = useNavigate()


    let {id} = useParams()
    console.log(id,'id');
    let {category} =useParams()
    console.log(category,'category');

    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');

    let handleCart= async ()=>{

      try{

        if(!token){
          navigate('/login')
        }

        if(token){
        let response = await axios.post(`http://localhost:8000/insertCart/${userId}`,productData)
        console.log(response);
          if(response.data){
          console.log('added to cart');
          alert('Added to Cart')
          setRefresh(!refresh)
          }
        }
      }catch(err){
        console.log(err);
        alert(err.message)
      }

    }

    useEffect(()=>{

        try{


            let fetchProduct= async ()=>{

                let response = await axios.get(`http://localhost:8000/findOneProduct/${id}/${category}`)
                console.log('view product response:',response);
                setProductData(response.data)

                if(token){
                  let fetchCart = async()=>{
          
                    try{
          
                      let Cartresponse = await axios.get(`http://localhost:8000/findCart/${userId}`,{
                        headers:{
                          Authorization: token
                        },
                      })
                      console.log('cart response:',Cartresponse);
                      
                      const isProductInCart = Cartresponse.data.some(cartItem => cartItem.productId === response.data._id);
                      setIsCart(isProductInCart);
                      console.log('iscart',isProductInCart);
          
                    }catch(err){
                      console.log(err);
                      alert(err.message)
                  }
          
                }
                fetchCart()
              }

            }
            fetchProduct()

        }catch(err){
            console.log(err);
            alert(err.message)
        }

        

    },[id,category,refresh])


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

      <div className='w-2/5 text-center relative'>
      {productData && productData.images && (
          <Slider {...settings} ref={sliderRef} className=' w-4/5 h-2/5 m-auto'>
            {productData.images.map((image, index) => (
              <div  key={index}>
                <img src={image} alt={`Image ${index + 1}`} className='h-full w-full object-contain object-center aspect-square lg:h-full lg:w-full border rounded-xl  inline-block' />
                
              </div>
            ))}
          </Slider>
        )}
        { productData && productData.images && productData.images.length > 1 ? (
        <>
        <button className='slider-btn  absolute top-1/2 left-2 z-10' onClick={prevSlide}>
        <GrPrevious className='w-5 h-5'/>
        </button>
        <button className='slider-btn  absolute top-1/2 right-2 z-10' onClick={nextSlide}>
        <GrNext className='w-5 h-5'/>
        </button>
        </>
        ):(
          null
        )}
      </div>

      <div className='w-2/5 mt-10 ms-20'>
        <p className='text-3xl mb-10'> {productData && productData.productname}</p>
        <p className='text-2xl mb-10'>₹{productData && productData.productprice} <span className='ms-2 text-green-600'> ( 60% off )</span></p>
        <div className='flex flex-wrap justify-between mb-20'>
        <p className='mt-2 text-sm opacity-60 font-semibold'>Description</p>
        <p className='mt-2 text-xl w-3/4'>{productData && productData.productdescription}</p>
      </div>
        <div className='flex items-center gap-10'>
          { isCart ? (
              <Link to={'/cartcustomer'}><button className=" mr-2 bg-black text-white py-2 px-4 rounded-xl h-fit">GO TO CART</button></Link>
            ):(
              <button className=" mr-2 bg-black text-white py-2 px-4 rounded-xl h-fit" onClick={handleCart}>ADD TO CART</button>
              )}
          <Link to={`/checkoutcustomer/${productData._id}/${productData.productcategory}`} ><button className=" ml-2 text-green-500 py-2 rounded-xl h-fit"><FaRegHeart className='text-3xl'/></button></Link>
        </div>
      </div>

    </div>
  )
}

export default ViewProduct
