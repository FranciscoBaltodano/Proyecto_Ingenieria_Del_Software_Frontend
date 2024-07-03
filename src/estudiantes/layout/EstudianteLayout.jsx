import { Sidebar } from '../components/Sidebar'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'

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

EstudianteLayout.propTypes = {
    children: PropTypes.node.isRequired
}