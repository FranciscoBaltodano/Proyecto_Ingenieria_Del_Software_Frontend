import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TablaRegistrosMatriculaNotas } from './TablaRegistrosMatriculaNotas';
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom'

export const OptionNotas=()=> {
  return (
  
      <Grid container  sx={{flexDirection:'column' ,justifyContent:'space-evenly' ,alignItems:'center'}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          
          <Card >
                  <CardContent >
                    <Typography gutterBottom variant="h6" component="div" textAlign={'center'} >
                    Puedes habilitar el proceso de subida de notas, para un periodo determinado.
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                        <Button variant="contained">
                        <NavLink to='/admin/configuracion_crear_nota'>
                            Crear Notas
                        </NavLink>
                        </Button>
                        </Stack>
                      
                  </CardContent>
          </Card>
            <br />
          <card>
          <TablaRegistrosMatriculaNotas/>
          </card>
          
         
          
      </Grid>



  );
}