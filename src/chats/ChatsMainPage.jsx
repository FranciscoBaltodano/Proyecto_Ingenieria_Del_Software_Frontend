import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { CometChatGroupsWithMessages, CometChatLocalize, WithMessagesStyle } from "@cometchat/chat-uikit-react";
import { useAuth } from '../contexts/AuthContext';
import { Contactos } from './components/Contactos';
import { BuscarNuevosAmigos } from './components/BuscarNuevosAmigos';

export const ChatsMainPage = () => {
  const { user } = useAuth();
  CometChatLocalize.setLocale("es");
  let currentLanguage = CometChatLocalize.getLocale();
  const [selectedTab, setSelectedTab] = useState('conversations');
  const uid = user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado;

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
          <Tab label="Buscar" value="search" />
        </Tabs>
        <Box minHeight='700px' sx={{ p: 3, height: 'calc(100% - 48px)' }}>
          {selectedTab === 'conversations' && <Contactos />}
          {selectedTab === 'groups' && <CometChatGroupsWithMessages  groupsWithMessagesStyle={groupsWithMessagesStyle} />}
          {selectedTab === 'search' && <BuscarNuevosAmigos />}
        </Box>
      </Box>
    </div>
  );
};
