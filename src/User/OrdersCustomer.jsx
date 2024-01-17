import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";

const OrdersCustomer = () => {

    const [orderData,setOrderData] = useState([''])
    const [orderProducts,setOrderProducts] = useState([''])
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
          
                setOrderData(updatedOrderData)

                let fetchOrderProducts = async () => {
                    const productsPromises = response.data.map(async (order) => {
                      const productResponse = await axios.get(`http://localhost:8000/customer/orderedProducts/${order.productId}`,{
                        headers: {
                            Authorization: token
                          },
                    });
                      return productResponse.data; 
                    });
          
                    const products = await Promise.all(productsPromises);
                    console.log('ordered products response:',products);
                    setOrderProducts(products);
                  }
                  fetchOrderProducts()

                  const statusDate = new Date(orderData.statusDate);
                  const formattedDate = statusDate.toString().split('T')[0];
                  console.log(formattedDate,'sdfg');

            }
            fetchOrders() 
        }catch(err){
            console.log(err);
        }
    },[])

  return (
    <div className='mt-32'>
      <div>
        {orderProducts.map((item,index)=>(
        <div key={index} className='w-4/5 m-auto grid grid-cols-4 items-center border rounded p-5 px-10 mb-5'>
        <div>
        {item.images && item.images.length > 0 && (
                    <img className='w-20 h-20 mb-10 sm:mb-0' key={item.images[0].id} src={item.images[0]} alt="" />
                    )} 
        </div>
        <div>
            <p className='text-xl'>{item.productname}</p>
        </div>
           <div> <p>₹{item.productprice}</p></div>
                <div>
                    <div className='flex justify-start gap-3 items-center'>
                        <i className='text-green-500 text-2xl'><GoDotFill/></i>
           {orderData[index] && (
                        <p>{orderData[index].orderStatus} on {orderData[index].statusDate}</p>
                        )}
                    </div>
                </div>
        </div>
         ))}
      </div>
    </div>
  )
}

export default OrdersCustomer
