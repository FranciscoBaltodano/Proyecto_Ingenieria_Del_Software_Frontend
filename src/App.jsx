import { useState } from 'react'
import { Grid, Typography } from "@mui/material";
import { ToggleTheme } from "./components/ToggleTheme";
import { AppRouter } from './router/AppRouter';
import { Navbar } from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Grid>
        <Navbar />
        <ToggleTheme />
        <Typography>Hola</Typography>
        <AppRouter />
      </Grid>
    </>
  );
};

export default App


