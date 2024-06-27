import { createTheme, useMediaQuery, ThemeProvider } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';

// Modo claro
const AppLightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Modo oscuro
const AppDarkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Contexto de tema que usara mi componente toggle
export const ThemeContext = createContext(null);

// Funcion Principal que usara el main para envolver la app
export const ThemeContextProvider = ({ children }) => {

  const [theme, setTheme]         = useState(AppLightTheme);
  const [themeMode, setThemeMode] = useState('light');
  const system_theme              = useMediaQuery('(prefers-color-scheme: dark)') 
    ? 'dark' 
    : 'light';
    
  // Obtener el tema del localStorage
  useEffect(() => {
    const localStorageTheme = localStorage.getItem('themeMode');
    // si existe el tema en el localStorage
    if (localStorageTheme) {
      setThemeMode(localStorageTheme);
    }
  }, []);

  // Cambiar el tema
  useEffect(() => {
    switch (themeMode) {
      case 'light':
        setTheme(AppLightTheme);
        break;
      case 'dark':
        setTheme(AppDarkTheme);
        break;
      case 'system':
        setTheme(system_theme === 'dark' ? AppDarkTheme : AppLightTheme);
        break;
      default:
        setTheme(AppLightTheme);
        break;
    }
  }, [themeMode, system_theme]);

  // Cambiar el modo del tema
  const switchThemeMode = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('themeMode', mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, switchThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
