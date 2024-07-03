import * as React from 'react';
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Chat as ChatIcon, Class as ClassIcon, Grade as GradeIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import logoUNAHconLetras from '/assets/logoUNAHconLetras.png';

const menuItems = [
  { text: 'Mi Perfil', icon: <HomeIcon /> },
  { text: 'Chats', icon: <ChatIcon /> },
  { text: 'Mis clases', icon: <ClassIcon /> },
  { text: 'Notas', icon: <GradeIcon /> },
  { text: 'Solicitudes', icon: <PersonIcon /> },
  { text: 'Cerrar Sesión', icon: <ExitToAppIcon /> },
];

export const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} role="presentation" onClick={toggleDrawer}>
      <List>
        {menuItems.slice(0, -1).map((item) => (
          <ListItemButton key={item.text}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <List>
        <ListItemButton>
          <ListItemIcon>
            {menuItems.slice(-1)[0].icon}
          </ListItemIcon>
          <ListItemText primary={menuItems.slice(-1)[0].text} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box mt='10px' sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{ ml: 1, backgroundColor: 'white', boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.3)' }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <img src={logoUNAHconLetras} alt="logo UNAH" style={{ width: '80%', maxWidth: '150px' }} />
        </Box>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
