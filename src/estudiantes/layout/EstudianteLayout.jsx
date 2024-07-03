import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Grid } from '@mui/material'

export const EstudianteLayout = ({children}) => {
    return (
        <>
            <Sidebar />
            <Grid container display='flex' justifyContent='center' alignItems='center'>
                    <Grid item mx={'10px'}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

