import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { CometChatGroupsWithMessages, CometChatLocalize, WithMessagesStyle } from "@cometchat/chat-uikit-react";
import { useAuth } from '../contexts/AuthContext';
import { Contactos } from './Contactos';

export const ChatsMainPage = () => {
  const { user } = useAuth();
  CometChatLocalize.setLocale("es");
  let currentLanguage = CometChatLocalize.getLocale();
  const [selectedTab, setSelectedTab] = useState('conversations');
  const uid = user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado;

  useEffect(() => {
    const fetchFriends = async () => {
      const appId = import.meta.env.VITE_COMETCHAT_APP_ID;
      const apiKey = import.meta.env.VITE_COMETCHAT_API_KEY;
      const region = import.meta.env.VITE_COMETCHAT_REGION;
      const userId = uid; // Puedes reemplazar esto con el ID del usuario correspondiente

      const url = `https://${appId}.api-${region}.cometchat.io/v3/users/${userId}/friends?perPage=100&page=1`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            apikey: apiKey,
          },
        });
        const data = await response.json();
        console.log('Friends List:', data.data); // Imprime la lista de amigos en la consola
      } catch (err) {
        console.error('Error al cargar la lista de amigos:', err);
      }
    };

    fetchFriends();
  }, [uid]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const groupsWithMessagesStyle = new WithMessagesStyle({
    height: "70vh",
  });

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="chat tabs"
          variant="fullWidth"
          centered
        >
          <Tab label="Amigos" value="conversations" />
          <Tab label="Grupos" value="groups" />
        </Tabs>
        <Box minHeight='700px' sx={{ p: 3, height: 'calc(100% - 48px)' }}>
          {selectedTab === 'conversations' && <Contactos />}
          {selectedTab === 'groups' && <CometChatGroupsWithMessages  groupsWithMessagesStyle={groupsWithMessagesStyle} />}
        </Box>
      </Box>
    </div>
  );
};
