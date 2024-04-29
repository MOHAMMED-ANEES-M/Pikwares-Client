import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import _orderBy from 'lodash/orderBy';
import baseUrl from '../config';
import Loader from '../components/Loader/Loader';


const OrdersAdmin = () => {

    const [orderData,setOrderData] = useState([''])
    const [orderProducts,setOrderProducts] = useState([''])
    const [orderCustomers,setOrderCustomers] = useState([''])
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [isProduct,setIsProduct] = useState(false)
    const [loading,setLoading] = useState(false)
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
          setLoading(true)
            let response = await axios.get(`${baseUrl}/admin/findOrders`,{
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
              if (sortedOrders && sortedOrders.length > 0 && sortedOrders[0]) {
                    setIsProduct(true); 
                  } else {
                    setIsProduct(false);  
                  }

              let fetchOrderCustomers = async () => {
                const customerPromises = sortedOrders.map(async (order) => {
                  const customerResponse = await axios.get(`${baseUrl}/admin/orderedCustomers/${order.customerId}`,{
                    headers: {
                        Authorization: token
                      },
                });
                  return customerResponse.data; 
                });
      
                const customers = await Promise.all(customerPromises);
                setOrderCustomers(customers);
                console.log('ordered customers response:',customers);
              }
              fetchOrderCustomers()
              setLoading(false)
        }
        fetchOrders() 

    }catch(err){
        console.log(err);
    }
     
  },[])

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='mt-32 min-h-screen'>
      {loading ? (<Loader />) : (
      <>
{isProduct ? (
  <div>
    {currentOrders.map((item, index) => {
      const orderIndex = indexOfFirstOrder + index;
      const currentOrderData = orderData[orderIndex];
      const currentOrderCustomer = orderCustomers[orderIndex];

      return (
        <div key={index} className='w-11/12 m-auto text-center sm:text-start grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-5 items-center border rounded p-5 px-10 mb-5'>
          <div>
            {currentOrderCustomer && (
              <div>
                <p className='font-bold sm:text-lg'>{currentOrderCustomer.firstname} {currentOrderCustomer.lastname}</p>
                <p className='text-sm sm:text-lg'>{currentOrderCustomer.email}</p>
              </div>
            )}
          </div>
          <div className='flex justify-center'>
            {item.images && item.images.length > 0 && (
              <img className='w-20 h-20 mb-10 sm:mb-0 ms-10 mt-10 sm:mt-0' key={item.images[0].id} src={item.images[0]} alt="" />
            )}
          </div>
          <div className='sm:text-center lg:text-start'>
            <p className='text-xl'>{item.productname}</p>
            <p>₹{item.productprice}</p>
            <p>Quantity: {currentOrderData.count}</p>
          </div>
          <div>
            {item && (
              <div className='flex justify-center sm:justify-start gap-3 items-center mt-10 lg:mt-0'>
                <i className={`${item.orderStatus === 'Order Cancelled' ? 'text-red-500' : 'text-green-500'} text-2xl`}>
                  <GoDotFill />
                </i>
                <p>{item.orderStatus} on {item.statusDate}</p>
              </div>
            )}
          </div>
          <div className='sm:text-center mt-10 lg:mt-0'>
            {item.orderStatus === 'Order Delivered' ? (
              <p className='text-green-500 font-bold'>Amount paid ₹{item.productprice}</p>
            ) : item.orderStatus !== 'Order Cancelled' ? (
              <Link to={`/vieworderadmin/${currentOrderCustomer?._id}/${item?._id}`}>
                <button className='bg-green-500 text-white py-2 px-3 text-sm rounded h-fit'>DELIVER</button>
              </Link>
            ) : null}
          </div>
        </div>
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
</>
      )}
    </div>
  )
}

export default OrdersAdmin
