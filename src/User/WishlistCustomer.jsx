import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { errorToast, warnToast } from '../components/Toast'
import DiscountCalculator from '../utils/DiscountCalculator'
import baseUrl from '../config'
import Loader from '../components/Loader/Loader'

const WishlistCustomer = () => {

    const [wishlistData,setWishlistData] = useState([''])
    const [refresh,setRefresh] = useState(false)
    const [loading,setLoading] = useState(false)
    const [waiting,setWaiting] = useState(false)
    const sliderRef = useRef();
    const navigate = useNavigate()

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    let handleDeleteWishlist= async (e,id)=>{
        e.preventDefault()
        try{
  
          if(!token){
            return navigate('/login')
          }
  
          if(token){
            setWaiting(true)
            let response = await axios.delete(`${baseUrl}/deleteWishlist/${id}`)
            console.log(response);
            if(response.data){
              console.log('removed from wishlist',response);
              fetchWishlist()
              setWaiting(false)
              errorToast('Removed from Wishlist')
              // setRefresh(!refresh) 
            }
          }
        }catch(err){
          console.log(err);
          warnToast(err.message)
        }
  
      }

      let fetchWishlist = async()=>{
        let response = await axios.get(`${baseUrl}/findWishlist/${userId}`,{
            headers:{
                Authorization: token
            },
        })
        console.log('wishlist response:',response);
        setWishlistData(response.data)
    }

    useEffect(()=>{

        try{

            if(!token){
              return  navigate('/login')
            }

            let fetchWishlist = async()=>{
                setLoading(true)
                let response = await axios.get(`${baseUrl}/findWishlist/${userId}`,{
                    headers:{
                        Authorization: token
                    },
                })
                console.log('wishlist response:',response);
                setWishlistData(response.data)
                setLoading(false)
            }
            fetchWishlist()

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
        <>
        <div className='mt-32 flex flex-wrap justify-center gap-5 mb-10 '>
      <ToastContainer/>

    {wishlistData&&wishlistData.length!==0 ? (

    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mx-10'>
        { wishlistData.map((item)=>(
           <Link to={`/viewproduct/${item.productId}/${item.productcategory}`}>
            <div className='  border-2 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-5 items-center'>
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
    
            </div>

            <div className='m-auto sm:text-start p-0 '>

                    <p className='text-xl mb-3'> {item && item.productname}</p>
                    
                    <div className=" items-center mb-3">
                    <p className='text-lg  '>₹{item.productprice} 
                    <span className='ms-2 line-through opacity-50'>₹{item.productactualprice}</span> </p>
                    <DiscountCalculator actualPrice={item.productactualprice} offerPrice={item.productprice} />
                    </div>

                    

                </div>

            <div className='text-center mb-5 sm:mb-0 sm:mt-10'>
            <button className="  mb-1 w-32 bg-red-500 text-white py-2 px-5 text-sm  rounded-xl h-fit" onClick={(e) => handleDeleteWishlist(e,item._id)}>REMOVE</button>
            </div>

            </div></Link>
            ))}
        </div>
    
    ):(
        <p className='text-red-500 text-center mt-32 '>No product in wishlist</p>
    )}
    </div>
    </>
     )}
    </div>
  )
}

export default WishlistCustomer
