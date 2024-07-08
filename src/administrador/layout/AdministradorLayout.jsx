import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Grid } from '@mui/material';

export const AdministradorLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', padding: '10px', marginTop: '30px'}}
      >
        <Grid item sx={{ width: '100%' }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
