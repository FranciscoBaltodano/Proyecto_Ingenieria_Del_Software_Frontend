import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Box, Divider, Grid, Typography } from '@mui/material'

export const EstudianteLayout = ({children,  titulo='Titulo'}) => {
return (
    <>
        <Sidebar titulo={titulo} />
        <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', padding: '10px', marginTop: '50px'}}
        >
        <Grid item sx={{ width: '100%', padding: 2 }}>
            <Box sx={{ padding: 2 }}>
               
            
                {children}
            </Box>
        </Grid>
        </Grid>
    </>
    );
};
    