import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import _orderBy from 'lodash/orderBy';


const OrdersAdmin = () => {

  const [orderData,setOrderData] = useState([''])
    const [orderProducts,setOrderProducts] = useState([''])
    const [orderCustomers,setOrderCustomers] = useState([''])
    const [isProduct,setIsProduct] = useState(false)
    const navigate = useNavigate()

    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toISOString().split('T')[0];
        const [year, month, day] = formattedDate.split('-');
        return `${day}-${month}-${year}`;
      };


  useEffect(()=>{

    try{

        if(!token){
            navigate('/login')
        }

        let fetchOrders = async()=>{
            let response = await axios.get(`http://localhost:8000/admin/findOrders`,{
                headers: {
                    Authorization: token
                  },
            })
            console.log('orders response: ',response);

            const updatedOrderData = response.data.map(order => ({
                ...order,
                statusDate: formatDate(order.statusDate),
              }));
      
              const sortedOrders = _orderBy(updatedOrderData, ['statusDate'], ['asc']);
              setOrderData(sortedOrders);

            let fetchOrderProducts = async () => {
                const productsPromises = sortedOrders.map(async (order) => {
                  const productResponse = await axios.get(`http://localhost:8000/customer/orderedProducts/${order.productId}`,{
                    headers: {
                        Authorization: token
                      },
                });
                  return productResponse.data; 
                });
      
                const products = await Promise.all(productsPromises);
                setOrderProducts(products);
                console.log('ordered products response:',products);
                if (products && products.length > 0 && products[0]) {
                  setIsProduct(true); 
                } else {
                  setIsProduct(false);  
                }
              }
              fetchOrderProducts()

              // const statusDate = new Date(orderData.statusDate);
              // const formattedDate = statusDate.toString().split('T')[0];
              // console.log(formattedDate,'formatted date');

              let fetchOrderCustomers = async () => {
                const customerPromises = sortedOrders.map(async (order) => {
                  const customerResponse = await axios.get(`http://localhost:8000/admin/orderedCustomers/${order.customerId}`,{
                    headers: {
                        Authorization: token
                      },
                });
                  return customerResponse.data; 
                });
      
                const customers = await Promise.all(customerPromises);
                setOrderCustomers(customers);
                console.log('ordered customers response:',customers);
                // if (customers && customers.length > 0 && customers[0]) {
                //   setIsProduct(true); 
                // } else {
                //   setIsProduct(false);  
                // }
              }
              fetchOrderCustomers()

        }
        fetchOrders() 
    }catch(err){
        console.log(err);
    }
     
  },[])



  return (
    <div className='mt-32'>

      
      {isProduct ? (
        <div>
          {orderProducts.map((item, index) => (
            <div key={index} className='w-11/12 m-auto grid grid-cols-5 items-center border rounded p-5 px-10 mb-5'>
              <div>
                {orderCustomers[index] && (
                  <div>
                    <p className='font-bold'>{orderCustomers[index].firstname} {orderCustomers[index].lastname}</p>
                    <p>{orderCustomers[index].email}</p>
                  </div>
                )}
              </div>
              <div>
                {item.images && item.images.length > 0 && (
                  <img className='w-20 h-20 mb-10 sm:mb-0 ms-10' key={item.images[0].id} src={item.images[0]} alt="" />
                )}
              </div>
              <div>
                <p className='text-xl'>{item.productname}</p>
                <p>₹{item.productprice}</p>
                <p>Quantity: {orderData[index].count}</p>
              </div>
              <div>
                  {orderData[index] && (
                <div className='flex justify-start gap-3 items-center'>
                      <i className={`${orderData[index].orderStatus === 'Order Cancelled' ? 'text-red-500' : 'text-green-500'} text-2xl`}>
                      <GoDotFill />
                      </i>
                      <p>{orderData[index].orderStatus} on {orderData[index].statusDate}</p>
                </div>
                    )}
              </div>
            <div className='text-center'>
              {orderData[index].orderStatus === 'Order Delivered' ? (
                <p className='text-green-500 font-bold'>Amount paid ₹{item.productprice * orderData[index].count}</p>
              ) : orderData[index].orderStatus !== 'Order Cancelled' ? (
                <Link to={`/vieworderadmin/${orderCustomers[index]?._id}/${item?._id}/${orderData[index]?._id}`}>
                  <button className='bg-green-500 text-white py-2 px-3 w-2/6 text-sm rounded h-fit'>DELIVER</button>
                </Link>
              ) : null}
            </div>

            </div>
          ))}
        </div>
      ) : (
        <p className='mt-60 text-center'>no orders found</p>
      )}
    </div>
  )
}

export default OrdersAdmin
