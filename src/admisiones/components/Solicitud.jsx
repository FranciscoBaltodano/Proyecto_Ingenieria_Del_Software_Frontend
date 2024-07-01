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
    <Container maxWidth="sm" class='flex flex-col justify-center items-center w-12/12 bg-slate-200'>
       <strong><h2>Selecciona tu Nacionalidad</h2></strong>
       <br /> 
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        class='flex flex-row gap-2 w-11/12 justify-center items-center'
      > 
       
        <FormControl fullWidth>
          <InputLabel>Nacionalidad</InputLabel>
          <Select
            {...register("Nacionalidad", { required: true })}
            label="Nacionalidad"
          >
            <MenuItem value="hondureña">Hondureña</MenuItem>
            <MenuItem value="salvadoreña">Salvadoreña</MenuItem>
            <MenuItem value="guatemalteca">Guatemalteca</MenuItem>
            <MenuItem value="nicaragüense">Nicaragüense</MenuItem>
            <MenuItem value="nicaragüense">Peruano</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Identidad"
            type="number"
            {...register("Identidad", { required: true, maxLength: 13 })}
            error={!!errors.Identidad}
            helperText={errors.Identidad ? 'Número de identidad es requerido y debe tener un máximo de 13 dígitos' : ''}
            fullWidth
          />

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
        </Box>

       
      </Box>
      <br />
      <Button type="submit" variant="contained" color="primary" className=''>
          Enviar
        </Button>
    </Container>
  );
}
