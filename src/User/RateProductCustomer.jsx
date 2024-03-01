import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { successToast, warnToast } from '../components/Toast';

const RateProductCustomer = () => {

    const [productData,setProductData] = useState('')
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const { productId, customerId } = useParams();

    let token = localStorage.getItem('token')

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Review:', review);
    
    try{
      if(productId==='' || customerId==='' || review==='' || rating===''){
        return warnToast('All fields are required')
      }
      const data = {productId,customerId,review,rating}
        let response = await axios.post(`http://localhost:8000/review/insert`,data)
        console.log(response);
        successToast('Review added')
    }catch(err){
        console.log(err);
        warnToast(err && err.response.data)
    }
    
  };

  const starComponents = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Full star
      starComponents.push(
        <FaStar
          key={i}
          color="#FFD700"
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else if (i - 0.5 <= rating) {
      // Half star
      starComponents.push(
        <FaStarHalfAlt
          key={i}
          color="#FFD700"
          onClick={() => handleRatingChange(i - 0.5)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else {
      // Empty star
      starComponents.push(
        <FaRegStar
          key={i}
          color="#FFD700"
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
  }

  useEffect(()=>{

    let fetchProduct = async ()=>{
      try{
        let response = await axios.get(`http://localhost:8000/admin/product/findOne/${productId}`,{
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
    <div className='mt-32 border rounded w-10/12 sm:w-4/5 lg:w-2/4 m-auto p-3 sm:p-10 mb-10'>
      <h2 className='text-center text-xl sm:text-3xl font-bold mb-20'>Rate and Review Product</h2>
      <div className='grid grid-cols-3 items-center mb-20 border rounded p-3 sm:p-5'>
      {productData.images && productData.images.length > 0 && (
        <img className='w-20 h-20 mb-10 sm:mb-0 sm:ms-16 md:ms-20 lg:ms-28' key={productData.images[0].id} src={productData.images[0]} alt='' />
      )}
      <p className='text-center'>{productData.productname}</p>
      <p>{productData.productprice}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap gap-7 mb-10'>
          <p className='text-xl sm:text-3xl'>Rating:</p>
          <div className='flex text-3xl'>
          {starComponents}
          </div>
        </div>
        <div className='flex flex-wrap gap-5'>
          <p className='text-xl sm:text-3xl '>Review:</p>
          <textarea className='border rounded text-xl w-full h-60 p-5' value={review} onChange={handleReviewChange} />
        </div>
        <div className='mt-10 text-center'>
          <button className='bg-green-500 text-white py-2 px-5 rounded h-fit' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RateProductCustomer;
