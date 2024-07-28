// // src/chats/ChatsPage.jsx
// import React from 'react';
// import { CometChatLocalize, CometChatUsersWithMessages } from "@cometchat/chat-uikit-react";
// import { Grid } from '@mui/material';
// import {
//   CometChatContacts,
// } from "@cometchat/chat-uikit-react";
// import {
//   CometChatConversations,
//   TitleAlignment,
//   ConversationsStyle,
// } from "@cometchat/chat-uikit-react";

// export const ChatsMainPage = () => {
//   CometChatLocalize.setLocale("es");
//   let currentLanguage = CometChatLocalize.getLocale();
//   const conversationsStyle = new ConversationsStyle({
//     width: "100%",
//     height: "100%",
//   });

//   return (
//     <Grid width='100%' height='80vh' zIndex={-1} container>
//       <CometChatContacts />
//          <CometChatConversations/>
//       <CometChatUsersWithMessages />;
//     </Grid>
//   );
// };




// // Creado por chatgpt
// import React from 'react'
// import { CometChatLocalize, CometChatUsersWithMessages } from "@cometchat/chat-uikit-react";
// import { Grid } from '@mui/material';

// export const ChatsMainPage = () => {
//   CometChatLocalize.setLocale("es");
//   let currentLanguage = CometChatLocalize.getLocale();

//   return (
//     <Grid width='100%' height='80vh' zIndex={-1} container>
//     {/* //   <div className="conversations" style={{ width: "100%", height: "100%" }}>
//     //     <div>
//     //       <CometChatConversations */}
//     {/* //         title="Your Custom Title"
//     //         titleAlignment={TitleAlignment.center}
//     //         conversationsStyle={conversationsStyle}
//     //       />
//     //     </div>
//     //   </div>
//     //   <CometChatContacts
//     //      title="CometChat Contacts"
//     //      /> */}
//       <CometChatUsersWithMessages />;
//     </Grid>  
//     )
// }









// import { createComponent } from "@lit-labs/react";
// import { CometChatGroupsWithMessages } from "@cometchat/chat-uikit-react";
// import { CometChatLocalize } from "@cometchat/chat-uikit-react";
// import { CometChat } from '@cometchat-pro/chat';

// import { CometChatUsersWithMessages } from "@cometchat/chat-uikit-react";

// import {
//   CometChatContacts,
// } from "@cometchat/chat-uikit-react";


// import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file
// import React, { useEffect, useState } from 'react'
// import { useAuth } from "../contexts/AuthContext";

// export const ChatsMainPage = () => {

//   CometChatLocalize.setLocale("es");
//   let currentLanguage = CometChatLocalize.getLocale();

//   return( 
//     <div style={{ height: '50vh', width:'100%'}}>
//         <CometChatGroupsWithMessages />
//         <CometChatContacts
//          title="CometChat Contacts"
//          />
//         <CometChatUsersWithMessages />
//         <CometChatConversationsWithMessages />
//     </div>

//   )
// }





// import { CometChatGroupsWithMessages } from "@cometchat/chat-uikit-react";
// import { CometChatLocalize } from "@cometchat/chat-uikit-react";
// import { CometChat } from '@cometchat-pro/chat';

// // import { CometChatUsersWithMessages } from "@cometchat/chat-uikit-react";
// import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file

// export const ChatsMainPage = () => {

//   CometChatLocalize.setLocale("es");
//   let currentLanguage = CometChatLocalize.getLocale();

//   return( 
//     <div style={{ height: '50vh', width:'100%'}}>
//         <CometChatGroupsWithMessages />
//         {/* <CometChatUsersWithMessages /> */}
//         <CometChatConversationsWithMessages usersRequestBuilder={new CometChat.UsersRequestBuilder()
//         .friendsOnly(true)
//         .setLimit(2)}
//         />
//     </div>

//   )
// }



// import React, { useState } from 'react';
// import { Tabs, Tab, Box } from '@mui/material';
// import { CometChatGroupsWithMessages, CometChatUsersWithMessages, CometChatConversationsWithMessages, CometChatLocalize } from '@cometchat/chat-uikit-react';
// import { CometChat } from '@cometchat-pro/chat';

// export const ChatsMainPage = () => {
//   CometChatLocalize.setLocale("es");
//   let currentLanguage = CometChatLocalize.getLocale();

//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <Tabs value={value} onChange={handleChange} aria-label="cometchat tabs">
//         <Tab label="Grupos" />
//         {/* <Tab label="Usuarios" /> */}
//         <Tab label="Conversaciones" />
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         <CometChatGroupsWithMessages />
//       </TabPanel>
//       {/* <TabPanel value={value} index={1}>
//         <CometChatUsersWithMessages />
//       </TabPanel> */}
//       <TabPanel value={value} index={1}>
//         <CometChatConversationsWithMessages usersRequestBuilder={new CometChat.UsersRequestBuilder()
//         .friendsOnly(true)
//         .setLimit(2)}
//     /> 
//       </TabPanel>
//     </div>
//   );
// };

// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div>
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// };























import { CometChatGroupsWithMessages } from "@cometchat/chat-uikit-react";
import { CometChatLocalize } from "@cometchat/chat-uikit-react";
import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file

export const ChatsMainPage = () => {

  CometChatLocalize.setLocale("es");
  let currentLanguage = CometChatLocalize.getLocale();

  return( 
    <div style={{ height: '50vh', width:'100%'}}>
        <CometChatGroupsWithMessages />
        <CometChatConversationsWithMessages />
    </div>
  )
}





