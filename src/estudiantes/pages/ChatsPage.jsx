// import React, { useEffect, useState } from 'react';
// import { EstudianteLayout } from '../layout/EstudianteLayout';
// import { useAuth } from '../../contexts/AuthContext';

// export const ChatsPage = () => {
//   const { user } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const uid = user.numeroCuenta;

//   useEffect(() => {
//     const url = 'https://26151782ac088276.api-us.cometchat.io/v3/users?perPage=100&page=1';

//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         apikey: import.meta.env.VITE_COMETCHAT_API_KEY
//       }
//     };

//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setUsers(data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (selectedUser) {
//       fetchMessages(selectedUser.numeroCuenta);
//     }
//   }, [selectedUser]);

//   const fetchMessages = async (receiverUid) => {
//     const limit = 30;
//     const url = `https://26151782ac088276.api-us.cometchat.io/v3/users/${receiverUid}/messages?limit=${limit}`;

//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         apikey: import.meta.env.VITE_COMETCHAT_API_KEY
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setMessages(data.data);
//     } catch (error) {
//       console.log('Error fetching messages:', error);
//     }
//   };

//   const sendMessage = async () => {
//     if (inputMessage.trim() === '' || !selectedUser) return;

//     const messageText = inputMessage;
//     const receiverType = 'user';
//     const url = 'https://26151782ac088276.api-us.cometchat.io/v3/messages';

//     const payload = {
//       receiver: selectedUser.numeroCuenta,
//       receiverType,
//       type: 'text',
//       text: messageText
//     };

//     const options = {
//       method: 'POST',
//       headers: {
//         accept: 'application/json',
//         apikey: import.meta.env.VITE_COMETCHAT_API_KEY,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     };

//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const message = await response.json();
//       setMessages([...messages, message]);
//       setInputMessage('');
//     } catch (error) {
//       console.log('Error sending message:', error);
//     }
//   };

//   if (loading) return <div>Cargando usuarios...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <EstudianteLayout titulo="Chats">
//       <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
//         <div style={{ width: '25%', borderRight: '1px solid #ccc', overflowY: 'scroll' }}>
//           <h3>Usuarios</h3>
//           {users.length === 0 ? (
//             <p>No users available</p>
//           ) : (
//             users.map((user) => (
//               <div
//                 key={user.numeroCuenta}
//                 onClick={() => setSelectedUser(user)}
//                 style={{
//                   padding: '10px',
//                   cursor: 'pointer',
//                   backgroundColor: selectedUser && selectedUser.numeroCuenta === user.numeroCuenta ? '#f0f0f0' : '#fff'
//                 }}
//               >
//                 {user.name}
//               </div>
//             ))
//           )}
//         </div>
//         <div style={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
//           <div style={{ flexGrow: 1, overflowY: 'scroll', padding: '10px' }}>
//             <h3>Chat</h3>
//             {selectedUser ? (
//               <>
//                 <div>
//                   {messages.map((msg) => (
//                     <div key={msg.id} style={{ margin: '10px 0' }}>
//                       <strong>{msg.sender.name}: </strong> {msg.text}
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ display: 'flex', marginTop: 'auto', padding: '10px' }}>
//                   <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     style={{ flexGrow: 1, marginRight: '10px' }}
//                   />
//                   <button onClick={sendMessage}>Send</button>
//                 </div>
//               </>
//             ) : (
//               <p>Select a user to start chatting</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </EstudianteLayout>
//   );
// };



import React from 'react'
import { ChatsMainPage } from "../../chats/ChatsMainPage";
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { Grid } from '@mui/material';

export const ChatsPage = () => {
  return (
    <EstudianteLayout titulo="Chats">
      <Grid height='100%' container>
      <ChatsMainPage />
      </Grid>
    </EstudianteLayout>
  )
}
