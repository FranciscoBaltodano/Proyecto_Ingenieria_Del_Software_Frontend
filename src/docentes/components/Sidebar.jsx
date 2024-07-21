import React, { useEffect, useState } from 'react';
import {
  Box,
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
  ExitToApp as ExitToAppIcon // Para 'Jefe Departamento'
} from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoUNAHconLetras from '../../../public/assets/admisiones/logoUNAHconLetras.webp';

// Define menu items with roles that are needed for visibility control
const menuItems = [
  { text: 'Mis clases', icon: <ClassIcon />, to: '/docentes/clases', roles: ['Docente'] },
  { text: 'Mi Perfil', icon: <HomeIcon />, to: '/docentes/perfil', roles: ['Docente'] },
  { text: 'Chats', icon: <ChatIcon />, to: '/docentes/chats', roles: ['Docente'] },
  { text: 'Notas', icon: <GradeIcon />, to: '/docentes/notas', roles: ['Docente'] },
  { text: 'Solicitudes', icon: <AssignmentIcon />, to: '/docentes/solicitudes', roles: ['Docente'] },

  { text: 'Jefe Departamento', icon: <AdminPanelSettingsIcon />, to: '/jefedepartamento', roles: ['JefeDepartamento'] },
  { text: 'Matricula', icon: <SchoolIcon />, to: '/jefedepartamento/matricula', roles: ['JefeDepartamento'] },
  { text: 'Docentes', icon: <PersonIcon />, to: '/jefedepartamento/docentes', roles: ['JefeDepartamento'] },
  { text: 'Estudiantes', icon: <SchoolIcon />, to: '/jefedepartamento/estudiantes', roles: ['JefeDepartamento'] },

  { text: 'Coordinador', icon: <SchoolIcon />, to: '/coordinadores', roles: ['Coordinador'] }
];


export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

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
    setFilteredMenuItems(updatedMenuItems);
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
        {filteredMenuItems.map((item) => (
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

        <NavLink to='/admin' style={{ textDecoration: 'none' }}>
          <Typography color='primary' variant="h6" component="h1" sx={{ display: { xs: 'none', sm: 'block' }, mr: open ? '50px':'31px' }}>Administrador</Typography>
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
