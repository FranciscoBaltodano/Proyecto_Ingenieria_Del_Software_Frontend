import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box } from '@mui/material';

export const Solicitud = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  return (
    <Container maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
          </Select>
        </FormControl>

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
          {...register("Confirma tu número de identidad", { maxLength: 13, pattern: /Identidad/i })}
          error={!!errors['Confirma tu número de identidad']}
          helperText={errors['Confirma tu número de identidad'] ? 'El número debe coincidir con el de identidad y tener un máximo de 13 dígitos' : ''}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
  );
}
