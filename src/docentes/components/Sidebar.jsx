


import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Class as ClassIcon,
  Grade as GradeIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,  // Para 'Solicitudes'
  School as SchoolIcon,          // Para 'Estudiantes'
  AdminPanelSettings as AdminPanelSettingsIcon, 
  ExitToApp as ExitToAppIcon, // Para 'Jefe Departamento'
  History,
  AccountCircle
} from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoUNAHconLetras from '../../../public/assets/admisiones/logoUNAHconLetras.webp';


export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState({
    Docente: [],
    JefeDepartamento: [],
    Coordinador: []
  });

    // Define menu items with roles that are needed for visibility control
  const menuItems = [
    { text: 'Mis clases', icon: <ClassIcon />, to: '/docentes/clases', roles: ['Docente'] },
    { text: 'Mi Perfil', icon: <Avatar sx={{width:'25px', height:'25px',boxShadow:4}} src={user.imagen ? user.imagen : "/broken-image.jpg" } /> , to: '/docentes/perfil', roles: ['Docente'] },
    { text: 'Chats', icon: <ChatIcon />, to: '/docentes/chats', roles: ['Docente'] },
    { text: 'Notas', icon: <GradeIcon />, to: '/docentes/notas', roles: ['Docente'] },

    { text: 'Matricula', icon: <SchoolIcon />, to: '/jefedepartamento/matricula', roles: ['JefeDepartamento'] },
    { text: 'Docentes', icon: <PersonIcon />, to: '/jefedepartamento/docentes', roles: ['JefeDepartamento'] },
    { text: 'Estudiantes', icon: <SchoolIcon />, to: '/jefedepartamento/estudiantes', roles: ['JefeDepartamento'] },

    { text: 'Solicitudes', icon: <AssignmentIcon />, to: '/coordinadores/solicitudes', roles: ['Coordinador'] },
    { text: 'Carga Academica', icon: <SchoolIcon />, to: '/coordinadores/cargaAcademica', roles: ['Coordinador'] },
    { text: 'Historiales', icon: <History />, to: '/coordinadores/historiales', roles: ['Coordinador'] }
  ];


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const userRoles = JSON.parse(localStorage.getItem('user'))?.roles || [];
    const updatedMenuItems = menuItems.filter(item => 
      item.roles.some(role => userRoles.includes(role))
    );

    const categorizedMenuItems = {
      Docente: updatedMenuItems.filter(item => item.roles.includes('Docente')),
      JefeDepartamento: updatedMenuItems.filter(item => item.roles.includes('JefeDepartamento')),
      Coordinador: updatedMenuItems.filter(item => item.roles.includes('Coordinador')),
    };

    setFilteredMenuItems(categorizedMenuItems);
  }, [location.pathname]);

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
        {filteredMenuItems.Docente.length > 0 && (
          <>
            {filteredMenuItems.Docente.map((item) => (
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
          </>
        )}
        {filteredMenuItems.JefeDepartamento.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ px: 2, color: 'text.secondary' }}>Jefe de Departamento</Typography>
            {filteredMenuItems.JefeDepartamento.map((item) => (
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
          </>
        )}
        {filteredMenuItems.Coordinador.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ px: 2, color: 'text.secondary' }}>Coordinador</Typography>
            {filteredMenuItems.Coordinador.map((item) => (
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
          </>
        )}
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
    <Box py='10px' sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1, backgroundColor: '#ffffff80', width: '100%', backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
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
        
        <NavLink to='/docentes/perfil' style={{ textDecoration: 'none' }}>
          <Box display='flex' alignItems='center' justifyContent='center' sx={{ display: { xs: 'none', sm: 'flex' }, mr:'31px' }}>
          <Typography color='primary' variant="h6" component="h1" sx={{ display: { xs: 'none', sm: 'block' }, mr:'31px' }}>{user.nombre} {user.apellido}</Typography>
          <Avatar sx={{ boxShadow:2}} src={user.imagen ? user.imagen : "/broken-image.jpg" } />
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
