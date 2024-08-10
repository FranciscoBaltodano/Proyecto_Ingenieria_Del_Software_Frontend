import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert } from '@mui/material';

export const ReinicioClavePage = () => {
    const { token } = useParams();  // Extrae el token de los parámetros de la URL
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
    const navigate = useNavigate();

    // Verificar si el token ha expirado o es inválido
    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/department-head/validateToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ reset_token: token }),
                });

                if (response.ok) {
                    setLoading(false);  // Token válido, termina el estado de carga
                } else {
                    const errorData = await response.json();
                    if (response.status === 400 && errorData.message === 'Token expirado.') {
                        setIsExpired(true);
                    } else {
                        setError('Token inválido o error desconocido.');
                        setIsExpired(true);
                    }
                    setLoading(false);  // Finaliza el estado de carga
                }
            } catch (err) {
                setError('Error al validar el token.');
                setIsExpired(true);
                setLoading(false);  // Finaliza el estado de carga
                console.error('Error al validar el token:', err);
            }
        };

        checkToken();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/department-head/passCgd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password: newPassword }),
            });

            if (response.ok) {
                setSnackbarMessage('Contraseña cambiada con éxito.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/login'), 2000);  // Redirige después de 2 segundos para que el usuario vea el mensaje
            } else {
                const errorData = await response.json();
                setSnackbarMessage(errorData.message || 'Error al cambiar la contraseña.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (err) {
            setSnackbarMessage('Error al cambiar la contraseña.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    textAlign: 'center',
                }}
            >
                {loading ? (
                    <Typography variant="h6">Cargando...</Typography>
                ) : isExpired ? (
                    <div>
                        <Typography variant="h6" gutterBottom>
                            El token ha expirado o no es válido.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                        >
                            Volver al Inicio
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" gutterBottom>
                            Cambiar Contraseña
                        </Typography>
                        <TextField
                            label="Nueva Contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary">
                            Cambiar Contraseña
                        </Button>
                    </form>
                )}
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

            >
                <Alert
                    variant='filled' 
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};
