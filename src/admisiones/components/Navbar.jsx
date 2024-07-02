import { useState, useEffect } from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Tabs, Tab, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { NavLink, useLocation } from 'react-router-dom';

import logoUNAHconLetras from '/assets/logoUNAHconLetras.png';

const drawerWidth = 240;

const navItems = [
  { label: 'Inicio', path: '/admisiones/' },
  { label: 'Oferta', path: '/admisiones/oferta' },
  { label: 'Inscripciones', path: '/admisiones/inscripciones' },
];

export const Navbar = (props) => {
  const { window } = props;
  const theme = useTheme();
  const location = useLocation();

  const getValueFromLocation = (pathname) => {
    switch (pathname) {
      case '/admisiones/':
        return 0;
      case '/admisiones/oferta':
        return 1;
      case '/admisiones/inscripciones':
        return 2;
      case '/admisiones/solicitud':
        return 2;
      default:
        return 0;
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState(getValueFromLocation(location.pathname));

  useEffect(() => {
    setValue(getValueFromLocation(location.pathname));
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Button component={NavLink} to="/" sx={{ marginLeft: 2, my: 2 }}>
        <img src={logoUNAHconLetras} alt="UNAH" width="160" height="80" />
      </Button>

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
      <Button variant="contained" component={NavLink} to="/login">
        Acceder
      </Button>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{
        backgroundColor: '#ffffff',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 4px #00000040',
        color: theme.palette.text.primary,
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <Button component={NavLink} to="/" sx={{ marginLeft: 2 }}>
              <img src={logoUNAHconLetras} alt="UNAH" width="100" height="50" />
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
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
            </Tabs>
            <Button variant="contained" component={NavLink} to="/login" sx={{ marginLeft: 2 }}>
              Acceder
            </Button>
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
            display: { xs: 'block', sm: 'block', md: 'none' },
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

