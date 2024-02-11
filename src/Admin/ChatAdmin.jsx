import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';


const socket = io('http://localhost:8000', {
    pingInterval: 10000,
    pingTimeout: 5000,
});

const ChatAdmin = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const[customerData,setCustomerData] = useState('')

    const {id} = useParams()

    let token = localStorage.getItem('token')
    
    const formatTime12Hour = (timeString) => {
      const [hours, minutes] = timeString.split(':');
      const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
      const formattedHours = (parseInt(hours) % 12) || 12;
      return `${formattedHours}:${minutes} ${period}`;
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const messageData = {
            room: `room_${id}`, 
            role: 'Admin', 
            message: newMessage, 
            customerId: 'a1b2c3', 
            timestamb: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            }
            console.log('messageData', messageData);
            socket.emit('adminMessage', messageData);
            setMessages(prevMessages => [...prevMessages, messageData]);
            setNewMessage('');
            console.log('messages', messages);
        }
      };
    

      useEffect(() => {

        let fetchCustomers= async()=>{

          let response = await axios.get(`http://localhost:8000/customer/findAccount/`,{
                    headers: {
                        Authorization: token
                      },
                      params: {
                        id: id,
                      },
          })
          console.log('customers response: ',response);
          setCustomerData(response.data)
      }
      fetchCustomers()

        console.log('chat');
        socket.emit('joinRoom', { room: `room_${id}`, hint:'Admin connected' });
    
        socket.on('loadMessages', (data) => {
          console.log('load messages', data.messages);
          const dateObject = new Date(data.messages.timestamb);
          const hours = dateObject.getHours();
          const minutes = dateObject.getMinutes();
          data.messages.timestamb = `${hours}:${minutes}`
          setMessages(data.messages);
        });
    
        socket.on('userMessage', (data) => {
          setMessages(prevMessages => [...prevMessages, data]);
        });
    
        return () => {
          socket.off('loadMessages');
          socket.off('userMessage');
          socket.off('adminMessage');
        };
      }, []);


  return (

    <div className='mt-32'>
      <div className='w-1/3 m-auto mb-5 border rounded '>
      <h1 className='text-2xl text-center p-3 bg-green-400 rounded-t'>{customerData.firstname} {customerData.lastname}</h1>
        <ScrollToBottom className='h-96 overflow-scroll p-5 bg-green-50'>
        {messages.map((message, index) => (
          <div key={index} className='bg-green-500 text-white p-1 w-5/12 rounded mt-2 break-all'>
            <p>{message.message}</p>
              {/* <p className='text-end text-xs'>
                  {message.timestamb}
              </p> */}
          </div>
        ))}
        </ScrollToBottom>
      <div className='shadow'>
      <input
        className='w-10/12 p-3 '
        type="text"
        value={newMessage}
        placeholder="Type your message..."
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e)=>{e.key === 'Enter' && handleSendMessage()}}
        required
      />
      <button className=' bg-green-500 text-white py-2 px-4 ms-3 text-sm rounded' onClick={handleSendMessage}>Send</button>
      </div>
    </div>
    </div>
  )
}

export default ChatAdmin
