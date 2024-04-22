import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";
import _orderBy from 'lodash/orderBy';
import baseUrl from '../config';


const OrdersCustomer = () => {

    const [orderData,setOrderData] = useState([''])
    // const [orderProducts,setOrderProducts] = useState([''])
    const [isProduct,setIsProduct] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [isCancelled,setIsCancelled] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const navigate = useNavigate()

    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toISOString().split('T')[0];
        const [year, month, day] = formattedDate.split('-');
        return `${day}-${month}-${year}`;
      };


      // let handleCancel=async (id)=>{
      //   try{
      //     const data = {orderStatus: 'Order Cancelled'}
      //     let response = await axios.put(`http://localhost:8000/cancelOrder/${id}`,data)
      //     console.log('deleted cart response:',response);
      //     setRefresh(!refresh)
      //   }catch(err){
      //     console.log(err);
      //   }
      // }

      const sortOrdersByDate = (orders) => {
        return _orderBy(orders, ['statusDate'], ['desc']);
      };

    useEffect(()=>{

        try{

            if(!token){
               return navigate('/login')
            }

            let fetchOrders = async()=>{
                let response = await axios.get(`${baseUrl}/customer/findOrders/${userId}`,{
                    headers: {
                        Authorization: token
                      },
                })
                console.log('orders response: ',response);

                const updatedOrderData = response.data.map(order => ({
                    ...order,
                    statusDate: formatDate(order.statusDate),
                  }));

                  updatedOrderData.sort((a, b) => new Date(b.statusDate) - new Date(a.statusDate));

                  setOrderData((prevOrderData) => sortOrdersByDate(updatedOrderData));
                  console.log('updateddata ;',orderData);
                  if (updatedOrderData && updatedOrderData.length > 0 && updatedOrderData[0]) {
                      setIsProduct(true);
                  } else {
                      setIsProduct(false);
                  }

                  // const statusDate = new Date(orderData.statusDate);
                  // const formattedDate = statusDate.toString().split('T')[0];
                  // console.log(formattedDate,'formatted date');

            }
            fetchOrders() 
        }catch(err){
            console.log(err);
        }
    },[refresh])


    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='mt-32'>
    {isProduct ? (
      <div>
       {currentOrders.map((item, index) => {
      const orderIndex = indexOfFirstOrder + index;
      const currentOrderData = orderData[orderIndex];

      return (
          <Link to={`/viewordercustomer/${item._id}`} key={index}>
            <div className='w-11/12 m-auto text-center sm:text-start grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-5 items-center border rounded p-5 px-10 mb-5'>
              <div className='flex justify-center sm:justify-start'>
                {item.images && item.images.length > 0 && (
                  <img className='w-20 h-20 mb-10 sm:mb-0 ms-10 mt-10 sm:mt-0' key={item.images[0].id} src={item.images[0]} alt='' />
                )}
              </div>
              <div className='sm:text-center lg:text-start'>
                <p className='text-xl'>{item.productname}</p>
                <p className='text-xl'>₹{item.productprice}</p>
              </div>
              <div>
                <p>Quantity: {currentOrderData.count}</p>
              </div>
              <div>
                <div className='flex justify-center sm:justify-start gap-3 items-center mt-10 lg:mt-0'>
                  <i className={`${item.orderStatus === 'Order Cancelled' ? 'text-red-500' : 'text-green-500'} text-2xl`}>
                    <GoDotFill />
                  </i>
                  {item && <p>{item.orderStatus} {item.statusDate}</p>}
                </div>
              </div>
              <div className='text-center sm:mt-0 mt-10'>
                {item.orderStatus === 'Order Cancelled' ? null : (
                  <>
                    {item && item.mode === 'COD' ? (
                      <>
                        <p>{item.mode}</p>
                        {item.orderStatus === 'Order Delivered' ? (
                          <p className='text-green-500 font-bold'>Amount paid ₹{item.productprice}</p>
                        ) : (
                          <p className='text-red-500 font-bold'>Amount to be paid ₹{item.productprice}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <p>{item.mode}</p>
                        <p className='text-green-500 font-bold'>Amount paid ₹{item.productprice}</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </Link>
          );
        })}
        <div className='flex justify-center mt-10 mb-10'>
          {Array.from({ length: Math.ceil(orderData.length / ordersPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} 
            className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border-2'}`}>
            {index + 1}
            </button>
          ))}
        </div>
      </div>
    ) : (
      <p className='mt-60 text-center'>no orders found</p>
    )}
  </div>
  )
}

export default OrdersCustomer
