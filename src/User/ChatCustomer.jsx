import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const socket = io('http://localhost:8000', {
    pingInterval: 10000,
    pingTimeout: 5000,
});

const ChatCustomer = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate()

    const {id} = useParams()
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')      
    const location = useLocation()
    const customerData = location.state      
            

    const handleSendMessage = () => {
        
      if (newMessage.trim() !== '') {

            const messageData = {
            room: `room_${userId}_${id}`, 
            role: 'User', 
            to: `room_${id}_${userId}`,
            message: newMessage, 
            customerId: userId, 
            timestamb: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            }

            socket.emit('sendMessage', messageData);
            console.log('sendMessage', messageData);
            setMessages(prevMessages => [...prevMessages, messageData]);
            setNewMessage('');
            console.log('messages', messages);

        }
      };

    useEffect(() => {

        if (!token) {
            return navigate('/login')
        }

        console.log('chat');
        socket.connect()
        socket.emit('joinRoom', {room: `room_${userId}_${id}`, to: `room_${id}_${userId}`, hint: `${userId} connected` });
       
        socket.on('loadMessages', (data) => {
          console.log('load messages', data.messages);
          setMessages(data.messages);
        });
    
        // socket.on('adminMessage', (data) => {
        //     setMessages(prevMessages => [...prevMessages, data]);
        // });

        socket.on('recieveMessage', (data) => {
          console.log('recieveMessage',data);
          if (!messages.some(msg => msg.message === data.message && msg.timestamb === data.timestamb)) {
            console.log('dupMsg',messages);
            setMessages(prevMessages => [...prevMessages, data]);
          }
        });
    
        return () => {
          socket.off('loadMessages');
          socket.off('recieveMessage');
          socket.off('sendMessage');
          socket.disconnect()
        };
      }, [id, token, userId, navigate]);

      
      useEffect(() => {
        // Update the state when the messages array changes
        console.log('Messages updated:', messages);
      }, [messages]);


  return (
    <div className='mt-32'>
      <div className='w-2/3 lg:w-1/3 m-auto mb-5 border rounded '>
      <h1 className='text-xl text-center p-3 bg-green-400 rounded-t'>{customerData.firstname} {customerData.lastname}</h1>
        <ScrollToBottom className='h-96 overflow-scroll p-5 bg-green-50'>
        {messages.map((message, index) => (
          <div key={index} className={`text-white p-2 w-7/12 rounded mt-2 break-all ${message.customerId === id ? 'bg-green-900' : 'bg-green-600  ml-48'}`}>
            <p>{message.message}</p>
              {/* <p className='text-end text-xs'>
                  {message.timestamb}
              </p> */}
          </div>
        ))}
        </ScrollToBottom>
      <div className='shadow border-2'>
      <input
        className='w-10/12 p-3 focus:outline-none'
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

export default ChatCustomer
