


import React, { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {CometChatLocalize, CometChatMessageComposer, MessageComposerStyle, CometChatMessageList } from "@cometchat/chat-uikit-react";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import { useAuth } from "../../contexts/AuthContext";

 
export const Contactos = () => {
  
  const { user } = useAuth();
  const uid = user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado;
  const [friends, setFriends] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [friendUID, setFriendUID] = useState();
  const [chatSeleccionado, setChatSeleccionado] = useState(false)


  useEffect(() => {
    const fetchFriends = async () => {
      const appId = import.meta.env.VITE_COMETCHAT_APP_ID;
      const apiKey = import.meta.env.VITE_COMETCHAT_API_KEY;
      const region = import.meta.env.VITE_COMETCHAT_REGION;
      const url = `https://${appId}.api-${region}.cometchat.io/v3/users/${uid}/friends?perPage=100&page=1`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            apikey: apiKey,
          },
        });
        const data = await response.json();
        setFriends(data.data);
      } catch (err) {
        console.error('Error al cargar la lista de amigos:', err);
      }
    };
    fetchFriends();
  }, [uid]);

    const handleItemClick = (friend) => {
      setFriendUID(friend.uid);
      setChatSeleccionado(true);
  };

  useEffect(() => {
      CometChat.getUser(friendUID).then((user) => {
        console.log('usuario encontrado exitosamente',user);
          setChatUser(user);
      }).catch((error) => {
          console.log('usuario no encontrado',error);
      }
      );
  }, [friendUID])

  CometChatLocalize.setLocale("es");
  let currentLanguage = CometChatLocalize.getLocale();

  const messageComposerStyle = new MessageComposerStyle({
    height:"100px",
  })

  return( 
    <div style={{ height: '60vh', width:'100%', display:'flex' }}>
      <Paper style={{ minWidth: '280px', height: '100%', overflow:'auto' }}>
        <strong style={{ fontSize:'22px'}}>Mis amigos</strong>
        <List>
            {friends.map((friend) => (
              <ListItem button key={friend.uid} onClick={() => handleItemClick(friend)}>
                <ListItemAvatar>
                  <Avatar src={friend.avatar} />
                </ListItemAvatar>
                <ListItemText primary={friend.name} secondary={friend.status} />
              </ListItem>
            ))}
        </List>
      </Paper>
 
      {chatSeleccionado ? 
    (
    <div style={{ width:'100%' }}>
        <CometChatMessageList user={chatUser} />
        <CometChatMessageComposer messageComposerStyle={messageComposerStyle} user={chatUser}/>
    </div>
    )
    : 
    (<Grid width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Typography component="strong" color='grey' fontSize='25px'>Selecciona un chat para empezar  a enviar mensajes</Typography>
    </Grid>)
}


    </div>
  )
}




