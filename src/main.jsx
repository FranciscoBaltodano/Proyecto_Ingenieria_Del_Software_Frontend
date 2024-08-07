import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';

const COMETCHAT_CONSTANTS = {
  APP_ID: process.env.VITE_COMETCHAT_APP_ID,
  REGION: process.env.VITE_COMETCHAT_REGION,
  AUTH_KEY: process.env.VITE_COMETCHAT_AUTH_KEY 
};

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log('Inicializacion de CometChatUIKit completado exitosamente');
  })
  .catch(console.log);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);