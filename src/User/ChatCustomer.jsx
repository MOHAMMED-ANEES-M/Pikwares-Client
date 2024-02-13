import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:8000', {
    pingInterval: 10000,
    pingTimeout: 5000,
});

const ChatCustomer = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate()

    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const messageData = {
            room: `room_${id}`, 
            role: 'User', 
            message: newMessage, 
            customerId: id, 
            timestamb: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            }
            console.log('messageData', messageData);
            socket.emit('userMessage', messageData);
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
        socket.emit('joinRoom', { room: `room_${id}`, hint:'User connected' });
    
        socket.on('loadMessages', (data) => {
          console.log('load messages', data.messages);
          setMessages(data.messages);
        });
    
        socket.on('adminMessage', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });
    
        return () => {
          socket.off('loadMessages');
          socket.off('userMessage');
          socket.off('adminMessage');
          socket.disconnect()
        };
      }, []);


  return (
    <div className='mt-32'>
      <div className='w-2/3 lg:w-1/3 m-auto mb-5 border rounded '>
      <h1 className='text-2xl text-center p-3 bg-green-400 rounded-t'>Admin</h1>
        <ScrollToBottom className='h-96 overflow-scroll p-5 bg-green-50'>
        {messages.map((message, index) => (
          <div key={index} className={`text-white p-2 w-7/12 rounded mt-2 break-all ${message.role === 'Admin' ? 'bg-green-900' : 'bg-green-600  ml-48'}`}>
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
