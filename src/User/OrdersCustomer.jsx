import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";
import _orderBy from 'lodash/orderBy';


const OrdersCustomer = () => {

    const [orderData,setOrderData] = useState([''])
    const [orderProducts,setOrderProducts] = useState([''])
    const [isProduct,setIsProduct] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [isCancelled,setIsCancelled] = useState(false)
    const navigate = useNavigate()

    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toISOString().split('T')[0];
        const [year, month, day] = formattedDate.split('-');
        return `${day}-${month}-${year}`;
      };


      let handleCancel=async (id)=>{
        try{
          const data = {orderStatus: 'Order Cancelled'}
          let response = await axios.put(`http://localhost:8000/cancelOrder/${id}`,data)
          console.log('deleted cart response:',response);
          setRefresh(!refresh)
        }catch(err){
          console.log(err);
        }
      }

      const sortOrdersByDate = (orders) => {
        return _orderBy(orders, ['statusDate'], ['desc']);
      };

    useEffect(()=>{

        try{

            if(!token){
                navigate('/login')
            }

            let fetchOrders = async()=>{
                let response = await axios.get(`http://localhost:8000/customer/findOrders/${userId}`,{
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

                

                  // const statusDate = new Date(orderData.statusDate);
                  // const formattedDate = statusDate.toString().split('T')[0];
                  // console.log(formattedDate,'formatted date');

            }
            fetchOrders() 
        }catch(err){
            console.log(err);
        }
    },[refresh])

    useEffect(() => {
      let fetchOrderProducts = async () => {
        const productsPromises = orderData.map(async (order) => {
          try {
            if (order && order.productId) {
              const productResponse = await axios.get(`http://localhost:8000/customer/orderedProducts/${order.productId}`, {
                headers: {
                  Authorization: token,
                },
              });
  
              return productResponse.data;
            }
            return null;
          } catch (error) {
            console.error('Error fetching orderedProducts:', error);
            return null;
          }
        });
  
        const products = await Promise.all(productsPromises);
        console.log('ordered products response:', products);
        setOrderProducts(products.filter((product) => product !== null));
  
        if (products && products.length > 0 && products[0]) {
          setIsProduct(true);
        } else {
          setIsProduct(false);
        }
      };
  
      fetchOrderProducts();
    }, [orderData, token]);

  return (
    <div className='mt-32'>
      {isProduct ? (

          <div>
          {orderProducts.map((item,index)=>(
          <Link to={`/viewordercustomer/${item._id}/${orderData[index]._id}`}><div key={index} className='w-10/12 m-auto grid grid-cols-5 items-center border rounded p-5 px-10 mb-5'>
          <div>
          {item.images && item.images.length > 0 && (
                      <img className='w-20 h-20 mb-10 sm:mb-0' key={item.images[0].id} src={item.images[0]} alt="" />
                      )} 
          </div>
          <div>
              <p className='text-xl'>{item.productname}</p>
              <p className='text-xl'>₹{item.productprice}</p>
          </div>
            <div> <p>Quantity: {orderData[index].count}</p></div>
                  <div>
                      <div className='flex justify-start gap-3 items-center'>
                      <i className={`${orderData[index].orderStatus === 'Order Cancelled' ? 'text-red-500' : 'text-green-500'} text-2xl`}>
                      <GoDotFill />
                      </i>
            {orderData[index] && (
                          <p>{orderData[index].orderStatus} <br /> {orderData[index].statusDate}</p>
                          )}
                      </div>
                  </div>
                  <div className='text-center'>
                  {orderData[index].orderStatus === 'Order Cancelled' ?(
                    null
                  ):(
                    <>
                    {orderData[index] && orderData[index].mode === 'COD'? (
                      <>
                      <p>{orderData[index].mode}</p>
                      { orderData[index].orderStatus === 'Order Delivered' ? (
                        <p className='text-green-500 font-bold'>Amount paid {item.productprice*orderData[index].count}</p>
                        ):(
                          <p className='text-red-500 font-bold'>Amount to be paid {item.productprice*orderData[index].count}</p>
                      )}
                      </>
                      ):(
                        <>
                        <p>{orderData[index].mode}</p>
                        <p className='text-green-500 font-bold'>Amount paid {item.productprice*orderData[index].count}</p>
                        </>
                      )}
                      </>
                  )}
                  
                  </div>
                  {/* <div className='text-end'>
                    { orderData[index].orderStatus === 'Order Cancelled'?(
                      null
                    ):(
                      <>
                      { orderData[index].orderStatus === 'Order Delivered' ? (
                    <button className="mb-1 text-green-500 py-2 px-5  rounded-xl h-fit" >Rate Product</button>
                      ):(
                    <button className="mb-1 bg-red-500 text-white py-2 px-5 text-sm  rounded-xl h-fit" onClick={()=>handleCancel(orderData[index]._id)}>CANCEL ORDER</button>
                      )}
                    </>
                    )}
                  </div> */}
          </div></Link>
          ))}
          </div>

      ):(
        <p className='mt-60 text-center'>no orders found</p>
      )}
      
    </div>
  )
}

export default OrdersCustomer
