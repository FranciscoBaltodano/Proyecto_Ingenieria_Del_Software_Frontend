import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom'
import {TablaRegistrosCancelaciones} from './TablaRegistrosCancelaciones'


export const OptionCancelcacion=()=> {
  return (
  
        <Grid container sx={{flexDirection:'column' ,justifyContent:'space-evenly' ,alignItems:'center'}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Card >
            
                    <CardContent >
                    <Typography gutterBottom variant="h6" component="div" textAlign={'center'} >
                    Puedes habilitar el proceso de cancelacion, para un periodo determinado.
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                        <Button variant="contained">
                        <NavLink to='/admin/configuracion_cancelacion'>
                            Crear Cancelaciones
                        </NavLink>
                        </Button>
                        </Stack>
                    </CardContent>

            
            </Card>
            <br />
            <card>
            <TablaRegistrosCancelaciones/>
            </card>
        </Grid>
  );
}