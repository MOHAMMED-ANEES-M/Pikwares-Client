import React from 'react'

const PaymentCustomer = () => {
  return (
    <div>
        <div  className=' mt-40 m-auto w-2/5 bg-green-100 px-10 py-10 rounded-3xl'>
        <p className='text-3xl text-center mb-10 '>PAYMENT OPTIONS</p>
        <div>
          <ul className='mx-10 list-'>
            <li>Debit Card</li>
            <li>Credit Card</li>
            <li>Google Pay</li>
            <li>Phone Pay</li>
            <li>Paytm</li>
            <li>Cash on Delivery</li>
          </ul>
        </div>
        </div>
    </div>
  )
}

export default PaymentCustomer
