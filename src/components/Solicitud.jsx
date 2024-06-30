// import React from 'react'
// import { useForm } from 'react-hook-form';


// export const Solicitud = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
      
//         <div className='flex justify-center items-center flex-row'> 
//             <select {...register("Nacionalidad", { required: true })}>
//         <option value="hondureña">hondureña</option>
//         <option value="salvadoreña">salvadoreña</option>
//         <option value="guatemalteca">guatemalteca</option>
//         <option value="nicaragüense">nicaragüense</option>
//         </select>
//          <input type="number" placeholder="Identidad" {...register("Identidad", {required: true, maxLength: 13})} />
//          <input type="number" placeholder="Confirma tu número de identidad" {...register("Confirma tu número de identidad", { maxLength: 13, pattern: /Identidad/i})} />

//       <input type="submit" />
//         </div>
    
//     </form>
//   );
// }
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box } from '@mui/material';

export const Solicitud = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const identidad = watch("Identidad");
  const onSubmit = data => console.log(data);

  return (
    <Container maxWidth="sm">
      <div>hola</div>
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
            <MenuItem value="nicaragüense">Peruano</MenuItem>
            <MenuItem value="nicaragüense">Mexicano</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Identidad"
            type="text"
            {...register("Identidad", { required: true, maxLength: 13 })}
            error={!!errors.Identidad}
            helperText={errors.Identidad ? 'Número de identidad es requerido y debe tener un máximo de 13 dígitos' : ''}
            fullWidth
          />

          <TextField
            label="Confirma tu número de identidad"
            type="text"
            {...register("Confirma tu número de identidad xd", {
              required: true,
              validate: value => value === identidad || "Los números de identidad no coinciden",
              maxLength: 13
            })}
            error={!!errors['Confirma tu número de identidad']}
            helperText={errors['Confirma tu número de identidad'] ? 'Los números de identidad no coinciden o tienen más de 13 dígitos' : ''}
            fullWidth
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
);
}