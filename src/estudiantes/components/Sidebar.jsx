import React, { useState } from 'react';
import { Avatar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Description as NewspaperIcon, Menu as MenuIcon, Home as HomeIcon, Person as PersonIcon, Assignment as AssignmentIcon, Group as GroupIcon, EventNote as EventNoteIcon, ExitToApp as ExitToAppIcon, Addchart } from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoUNAHconLetras from '/assets/logoUNAHconLetras.webp';
import { Chat as ChatIcon, Class as ClassIcon, Grade as GradeIcon } from '@mui/icons-material';

const menuItems = [
  { text: 'Inicio',   icon: <HomeIcon />    ,to:'/estudiantes/clases'   },
  { text: 'Mi Perfil',    icon: <ClassIcon />   ,to:'/estudiantes/perfil'   },
  { text: 'Chats',        icon: <ChatIcon />    ,to:'/estudiantes/chats'   },
  { text: 'Notas',        icon: <GradeIcon />   ,to:'/estudiantes/notas'   },
  { text: 'Solicitudes',  icon: <PersonIcon />  ,to:'/estudiantes/solicitudes'   },
  { text: 'Matricula',  icon: <Addchart />  ,to:'/estudiantes/matricula'   },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const activeItemStyle = {
    color: 'primary.main',
    backgroundColor: '#F4F8FE',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#F4F8FE',
    },
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      right: 0,
      width: '4px',
      height: '100%',
      backgroundColor: '#1976d2', // Color de la línea azul
    },
  };

  const DrawerList = (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} role="presentation" onClick={toggleDrawer}>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.to}
            sx={{
              color: location.pathname === item.to ? activeItemStyle.color : 'text.primary',
              backgroundColor: location.pathname === item.to ? activeItemStyle.backgroundColor : 'transparent',
              position: 'relative',
              '&:hover': {
                backgroundColor: '#F4F8FE',
              },
              '&::after': location.pathname === item.to ? activeItemStyle['&::after'] : {}, // Aplica el estilo del pseudo-elemento solo cuando está activo
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.to ? 'primary.main' : 'text.secondary' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <List>
        <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#F4F8FE' } }}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box py='10px' 
    sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1, backgroundColor: '#ffffff80', width: '100%', backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ ml: 1, backgroundColor: 'white', boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.3)' }}
          >
          <MenuIcon />
        </IconButton>

        <NavLink to='/estudiantes/perfil' style={{ textDecoration: 'none' }}>
          <Box display='flex' alignItems='center' justifyContent='center' sx={{ display: { xs: 'none', sm: 'flex' }, mr:'31px' }}>
          <Typography color='primary' variant="h6" component="h1" sx={{ display: { xs: 'none', sm: 'block' }, mr:'31px' }}>{user.nombre} {user.apellido}</Typography>
          <Avatar src={user.imagen ? user.imagen : "/broken-image.jpg" } />
          </Box>
        </NavLink>
      </Box>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <img src={logoUNAHconLetras} alt="logo UNAH" style={{ width: '80%', maxWidth: '150px' }} />
        </Box>
        {DrawerList}
      </Drawer>
    </Box>
  );
};
 