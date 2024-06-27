import { Button, Menu, MenuItem } from '@mui/material';
import PalletteIcon from '@mui/icons-material/Palette';
import { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../theme/ThemeContext';

export const ToggleTheme = () => {
  const { themeMode, switchThemeMode } = useContext(ThemeContext);
  const [openMenu, setOpenMenu] = useState(false);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleSwitchTheme = (mode) => {
    switchThemeMode(mode);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PalletteIcon />}
        onClick={handleOpen} // Ejecuta la función aquí
        ref={buttonRef}
      >
        Tema
      </Button>
      <Menu
        anchorEl={buttonRef.current}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleSwitchTheme('light')}
          selected={themeMode === 'light'}
        >
          Claro
        </MenuItem>
        <MenuItem
          onClick={() => handleSwitchTheme('dark')}
          selected={themeMode === 'dark'}
        >
          Oscuro
        </MenuItem>
        <MenuItem
          onClick={() => handleSwitchTheme('system')}
          selected={themeMode === 'system'}
        >
          Sistema
        </MenuItem>
      </Menu>
    </>
  );
};
