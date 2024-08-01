import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export const SolicitudAceptadaPage = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ mb: 2 }}>
          <CheckCircle color="success" sx={{ fontSize: 80 }} />
        </Box>
        <Typography variant="h4" component="h1" color="success.main" gutterBottom>
          ¡Solicitud de amistad aceptada!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Has aceptado la solicitud de amistad correctamente. Ahora puedes ver y chatear con tu nuevo amigo en la aplicación.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/" 
          sx={{ mt: 2 }}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Container>
  );
};
