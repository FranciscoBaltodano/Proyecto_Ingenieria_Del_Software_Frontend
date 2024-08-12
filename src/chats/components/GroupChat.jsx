


import React, { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {CometChatLocalize, CometChatMessageComposer, MessageComposerStyle, CometChatMessageList } from "@cometchat/chat-uikit-react";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import { useAuth } from "../../contexts/AuthContext";

 
export const GroupChat = ( { GUID } ) => {
  
  const { user } = useAuth();
  const uid = user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado;
  const [chatGroup, setChatGroup] = useState();


  useEffect(() => {
      CometChat.getGroup(GUID).then((group) => {
        console.log('usuario encontrado exitosamente',group);
          setChatGroup(group);
      }).catch((error) => {
          console.log('usuario no encontrado',error);
      }
      );
  }, [GUID])

  CometChatLocalize.setLocale("es");
  let currentLanguage = CometChatLocalize.getLocale();

  const messageComposerStyle = new MessageComposerStyle({
    height:"100px",
  })

  return( 
    <div style={{ height: '60vh', width:'100%', display:'flex' }}>

        <Grid style={{ width:'100%' }}>
            <CometChatMessageList showAvatar={true}  group={chatGroup} />
            <CometChatMessageComposer messageComposerStyle={messageComposerStyle} group={chatGroup}/>
        </Grid>

    </div>
  )
}




