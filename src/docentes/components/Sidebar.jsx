// src/components/Sidebar.jsx
import * as React from 'react';
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Chat as ChatIcon, Class as ClassIcon, Grade as GradeIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
<<<<<<< HEAD
=======
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
>>>>>>> ac521ca523baeddb272eb1d86a819cf26592331d
import logoUNAHconLetras from '/assets/logoUNAHconLetras.webp';

const initialMenuItems = [
  { text: 'Mi Perfil', icon: <HomeIcon />, disabled: false },
  { text: 'Chats', icon: <ChatIcon />, disabled: false },
  { text: 'Mis clases', icon: <ClassIcon />, disabled: false },
  { text: 'Notas', icon: <GradeIcon />, disabled: false },
  { text: 'Solicitudes', icon: <PersonIcon />, disabled: false },
  { text: 'Jefe de carrera', icon: <PersonIcon />, disabled: true },
  { text: 'Coordinador', icon: <PersonIcon />, disabled: true },
  { text: 'Cerrar Sesión', icon: <ExitToAppIcon />, disabled: false },
];

export const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuItemsState, setMenuItemsState] = React.useState(initialMenuItems);

  React.useEffect(() => {
    const updatedMenuItems = initialMenuItems.map(item => {
      if (item.text === 'Jefe de carrera') {
        return { ...item, disabled: location.pathname !== '/jefedepartamento' };
      } else if (item.text === 'Coordinador') {
        return { ...item, disabled: location.pathname !== '/coordinadores' };
      } else {
        return item;
      }
    });
    setMenuItemsState(updatedMenuItems);
  }, [location.pathname]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const DrawerList = (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} role="presentation" onClick={toggleDrawer}>
      <List>
        {menuItemsState.slice(0, -1).map((item) => (
          <ListItemButton key={item.text} disabled={item.disabled}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            {menuItemsState.slice(-1)[0].icon}
          </ListItemIcon>
          <ListItemText primary={menuItemsState.slice(-1)[0].text} />
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
};
