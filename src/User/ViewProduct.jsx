import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrNext } from "react-icons/gr";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrPrevious } from "react-icons/gr";
import { FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from 'react-icons/fa';


const renderStarRating = (rating) => {
  const stars = [];
  const floorRating = Math.floor(rating);

  for (let i = 0; i < floorRating; i++) {
    stars.push(<FaStar key={i} color="#FFD700" />);
  }

  if (rating % 1 !== 0) {
    stars.push(<FaStarHalfAlt key='half' color="#FFD700" />);
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FaRegStar key={`empty${i}`} color="#FFD700" />);
  }

  return <>{stars}</>;
};

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 0; // Default to 0 if there are no reviews
  }

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
};


const ViewProduct = () => {

    const [productData,setProductData] =useState('')
    const [reviewData,setReviewData] =useState([''])
    const [reviewedCustomers,setReviewedCustomers] =useState([''])
    const [isCart,setIsCart] =useState(false)
    const [isWishlist,setIsWishlist] =useState(false)
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
          return navigate('/login')
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

    let handleAddWishlist= async ()=>{

      try{

        if(!token){
          return navigate('/login')
        }

        if(token){
        let response = await axios.post(`http://localhost:8000/insertWishlist/${userId}`,productData)
        console.log(response);
          if(response.data){
          console.log('added to wishlist');
          setIsWishlist(true)
          setRefresh(!refresh)
          alert('Added to Wishlist')
          }
        }
      }catch(err){
        console.log(err);
        alert(err.message)
      }

    }

    let handleDeleteWishlist= async ()=>{

      try{

        if(!token){
          return navigate('/login')
        }

        if(token){
          let response = await axios.delete(`http://localhost:8000/viewProduct/deleteWishlist/${id}`)
          console.log(response);
          if(response.data){
            console.log('removed from wishlist');
            setIsWishlist(false)
            setRefresh(!refresh) 
            alert('Removed from Wishlist')
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

                let fetchReview = async()=>{
                  let reviewResponse = await axios.get(`http://localhost:8000/findReview/${id}`)
                  console.log('review response:',reviewResponse);
                  setReviewData(reviewResponse.data)

                  let fetchReviewedCustomers = async () => {
                    const customerPromises = reviewResponse.data.map(async (review) => {
                      const customerResponse = await axios.get(`http://localhost:8000/review/customers/${review.customerId}`,{
                        headers: {
                            Authorization: token
                          },
                    });
                      return customerResponse.data; 
                    });
          
                    const customer = await Promise.all(customerPromises);
                    setReviewedCustomers(customer);
                    console.log('reviewed customers response:',customer);
                    
                  }
                  fetchReviewedCustomers()

                }
                fetchReview()

                

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

                let fetchWishlist = async()=>{
          
                  try{
        
                    let Wishlistresponse = await axios.get(`http://localhost:8000/findWishlist/${userId}`,{
                      headers:{
                        Authorization: token
                      },
                    })
                    console.log('wishlist response:',Wishlistresponse);
                    
                    const isProductInWishlist = Wishlistresponse.data.some(wishlistItem => wishlistItem.productId === response.data._id);
                    setIsWishlist(isProductInWishlist);
                    console.log('iswishlist',isProductInWishlist);
        
                  }catch(err){
                    console.log(err);
                    alert(err.message)
                }
        
              }
              fetchWishlist()

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
              {isWishlist ? (
                <button className=" ml-2 text-green-500 py-2 rounded-xl h-fit" onClick={handleDeleteWishlist}><FaHeart className='text-3xl'/></button>
              ):(
                <button className=" ml-2 text-green-500 py-2 rounded-xl h-fit" onClick={handleAddWishlist}><FaRegHeart className='text-3xl'/></button>
              )}
        </div>
        <div>
          <p className='font-bold text-xl mt-20'>Ratings and Reviews</p>
          <div className=' mt-2 mb-5 flex gap-2 items-center'>
           <p>Average Rating: </p> 
           <p className='flex items-center gap-1 font-bold text-xl bg-green-500 text-white p-1 rounded'><span>{Math.round(calculateAverageRating(reviewData))}</span> <i><FaStar color="#FFFFFF" /></i></p> 
            <p>( {reviewData.length} Reviews) </p>
            </div>
          <div>
            {reviewData.map((review, index) => (
              <div key={review._id} className='border p-5 rounded mb-1'>
                <p className='flex mb-3'>{renderStarRating(review.rating)}</p>
                <p>{review.review}</p>
                <div className='flex gap-10 opacity-70 mt-3'>
                  {reviewedCustomers[index] && (
                    <p>{reviewedCustomers[index].firstname} {reviewedCustomers[index].lastname}</p>
                    )}
                  <p>{new Date(review.reviewDate).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
      </div>
    </div>
  )
}

export default ViewProduct
