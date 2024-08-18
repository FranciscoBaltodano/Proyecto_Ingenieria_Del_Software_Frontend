import { LoginLayout } from "../layout/LoginLayout";
import { Grid, TextField, Paper, Typography, Button, CircularProgress } from "@mui/material";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const cambiarContrasena = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/student/cambioContrasena`, 
            {
                id,
                nuevaContrasena: data.nuevaContrasena
            });
            console.log(response);
            navigate('/login');
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginLayout>
            <Grid sx={{ position: 'fixed' }} container>
            </Grid>

            <Paper elevation={6} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h5" component="h1" color="success.main" gutterBottom>
                    ¡Estas a un paso de cambiar tu contraseña!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Ingresa una nueva contraseña para tu cuenta.
                </Typography>
                
                {loading && <CircularProgress size={24} color="inherit" /> }
                <form onSubmit={handleSubmit(cambiarContrasena)}>
                    <TextField
                        label="Nueva Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('nuevaContrasena', { required: 'Este campo es requerido' })}
                        error={!!errors.nuevaContrasena}
                        helperText={errors.nuevaContrasena?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >Cambiar Contraseña
                    </Button>
                </form>
            </Paper>
        </LoginLayout>
    );
};
