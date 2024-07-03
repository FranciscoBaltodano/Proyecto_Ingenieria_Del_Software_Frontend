import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logoUNAH from '/assets/logoUNAH.webp';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

// tamaño de la barra lateral
const drawerWidth = 240;

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Admin', path: '/admin' },
  { label: 'Admisiones', path: '/admisiones' },
  { label: 'Estudiantes', path: '/estudiantes' },
  { label: 'Notas', path: '/notas' },
  { label: 'Matricula', path: '/matricula' },
  { label: 'Docentes', path: '/docentes' },
];


export const Navbar = (props) => {
  const { window } = props;
  const theme = useTheme();
  const location = useLocation();

  const getValueFromLocation = (pathname) => {
    switch (pathname) {
      case '/':
        return 0;
      case '/login':
        return 1;
      case '/admin':
        return 2;
      case '/admisiones':
        return 3;
      case '/estudiantes':
        return 4;
      case '/notas':
        return 5;
      case '/matricula':
        return 6;
      case '/docentes':
        return 7;
      default:
        return 0;
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(getValueFromLocation(location.pathname));

  React.useEffect(() => {
    setValue(getValueFromLocation(location.pathname));
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // barra lateral
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: theme.palette.text.primary }}>
        UNAH
      </Typography>

      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {navItems.map((item, index) => (
          <Tab
            key={item.label}
            label={item.label}
            component={NavLink}
            to={item.path}
            value={index}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar variant='div' component="nav" sx={{
        backgroundColor:'transparent',
        boxShadow: 'none',
        color: theme.palette.text.primary 
      }}>
        <Toolbar>
          {/* icono hamburguesa */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logoUNAH} alt="UNAH" width="50" height="50" />
            UNAH
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Tabs value={value} onChange={handleChange} centered>
              {navItems.map((item, index) => (
                <Tab
                  key={item.label}
                  label={item.label}
                  component={NavLink}
                  to={item.path}
                  value={index}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                />
              ))}
                {/* <ToggleTheme /> */}
            </Tabs>
          </Box>

        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};
