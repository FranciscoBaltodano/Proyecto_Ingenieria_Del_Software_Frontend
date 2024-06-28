import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { LoginLayout } from "../layout/LoginLayout"
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

export const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <FormControl fullWidth margin="normal" sx={{gap: '20px'}}>
              
              
              <TextField
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                {...register('email', { 
                  required: 'El campo es requerido',
                })}
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su numero de cuenta"
                label="Nombre de Usuario"
                variant="outlined"
              />

            
              <TextField
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                {...register('password', { 
                      required: 'La contraseña es requerida',
                    }
                  )
                }
                id="password"
                name="password"
                type="password"
                placeholder="Ingrese la contraseña"
                label="Contraseña"
                variant="outlined"
              />
            </FormControl>

            <Grid item xs={12} display='flex' flexDirection='column' alignItems='end' sx={{ marginTop: 2 }}>
              <Button variant='text' component={Link} to='/login/recuperar' sx={{ fontSize:'9px', color:'grey'}}>
                ¿Olvidó su nombre de usuario o contraseña?
              </Button>
              <Button variant="contained" color="primary" type="submit" sx={{ width: '100%'}}>
                Acceder
              </Button>
            </Grid>
          </Grid>
      </form>
    </LoginLayout>
        
  )
}
