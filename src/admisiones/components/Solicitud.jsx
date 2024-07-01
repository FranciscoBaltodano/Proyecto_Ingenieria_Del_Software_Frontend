import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box } from '@mui/material';

export const Solicitud = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      Nacionalidad: '',
      Identidad: '',
      'Confirma tu número de identidad': ''
    }
  });
  const identidad = watch("Identidad");
  const onSubmit = data => console.log(data);

  return (
  
         <Container className='flex flex-col items-center justify-center' >
       <strong><h2>Selecciona tu Nacionalidad</h2></strong>
       <br /> 
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-row gap-2  border-b-2 border-black pb-2 w-11/12'
      > 
       


        <div className=''>
        <strong><h2>Nacionalidad</h2></strong>
        <FormControl className='w-64'>

         <InputLabel className='flex justify-center items-center'>Nacionalidad</InputLabel>
       <Select
         {...register("Nacionalidad", { required: true })}
         label="Nacionalidad" className='w-full'
       >
         <MenuItem value="hondureña">Hondureña</MenuItem>
         <MenuItem value="salvadoreña">Salvadoreña</MenuItem>
         <MenuItem value="guatemalteca">Guatemalteca</MenuItem>
         <MenuItem value="nicaragüense">Nicaragüense</MenuItem>
         <MenuItem value="nicaragüense">Peruano</MenuItem>
       </Select>
      
     
     </FormControl>
        </div>


        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }} className='w-90'>
         <div className='w-full'>
          <strong><h2>Número de identidad</h2></strong>
         <TextField
            label="Identidad"
            type="number"
            {...register("Identidad", { required: true, maxLength: 13 })}
            error={!!errors.Identidad}
            helperText={errors.Identidad ? 'Número de identidad es requerido y debe tener un máximo de 13 dígitos' : ''}
            fullWidth
          />

         </div>

        <div className='w-full'>
        <strong><h2 >Confirma tu identidad</h2></strong>
        <TextField
            label="Confirma tu número de identidad"
            type="number"
            {...register("Confirma tu número de identidad", {
              required: true,
              validate: value => value === identidad || "Los números de identidad no coinciden",
              maxLength: 13
            })}
            error={!!errors['Confirma tu número de identidad']}
            helperText={errors['Confirma tu número de identidad'] ? 'Los números de identidad no coinciden o tienen más de 13 dígitos' : ''}
            fullWidth
          />
        </div>
         
        </Box>

      </Box>

      <hr />
      <br />
      <Button type="submit" variant="contained" color="primary" className=''>
          Enviar
        </Button>
    </Container>
   
  );
}
