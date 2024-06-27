import React from 'react';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export const Formulario = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <TextField
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            {...register('name', { required: 'Name is required' })}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            label="Name"
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Enter a valid email'
              }
            })}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            variant="outlined"
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </Grid>
  );
};
