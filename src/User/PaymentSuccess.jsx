import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const PaymentSuccess = () => {

    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('paymentId');
  const productId = searchParams.get('productId');
  const cartId = searchParams.get('cartId');

  console.log('Payment ID:', paymentId);
  console.log('Product ID:', productId);
  console.log('Cart ID:', cartId);

  return (
    <div className='mt-40 w-2/4 m-auto'>

      <p className='text-center text-xl font-bold mb-20'>Online Reciept</p>
      
      <div className='flex justify-evenly ms-32'>

        <div>
            <p>Payment Id:</p>
            <p>Product Id:</p>
            <p>Cart Id:</p>
        </div>
        <div>
            <p>{paymentId}</p>
            <p>{productId}</p>
            <p>{cartId}</p>
        </div>

      </div>
      
    </div>
  )
}

export default PaymentSuccess
