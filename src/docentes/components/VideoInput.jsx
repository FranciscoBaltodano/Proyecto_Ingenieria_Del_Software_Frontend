import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Alert, Grid } from '@mui/material';
import { SendRounded, Videocam } from '@mui/icons-material';

export const VideoInput = ({ id_Secciones, fetchVideo }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showForm, setShowForm] = useState(false);

  // Función para extraer el ID del video de la URL de YouTube
  const extractVideoId = (url) => {
    const videoIdPattern = /(?:youtube\.com\/(?:embed\/|v\/|v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdPattern);
    return match ? match[1] : null;
  };

  // Actualiza embedUrl cuando videoUrl cambia
  useEffect(() => {
    const id = extractVideoId(videoUrl);
    if (id) {
      setEmbedUrl(`https://www.youtube.com/embed/${id}`);
    } else {
      setEmbedUrl('');
    }
  }, [videoUrl]);

  // Función para manejar el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = extractVideoId(videoUrl);
    if (id) {
      const newEmbedUrl = `https://www.youtube.com/embed/${id}`;
      setSnackbarMessage('URL de YouTube válida');
      setSnackbarSeverity('success');

      // Enviar la solicitud PUT
      try {
        const response = await axios.put('http://localhost:3000/api/teacher/video', {
          id_Secciones,
          urlVideo: newEmbedUrl
        });

        // Verificar la respuesta del servidor
        if (response.status === 200) {
          setSnackbarMessage('Video actualizado correctamente');
          setSnackbarSeverity('success');
          fetchVideo();
          // Vaciar el input y ocultar la vista previa
          setVideoUrl('');
          setEmbedUrl('');
          setShowForm(false);
        } else {
          throw new Error(`Respuesta inesperada del servidor: ${response.status}`);
        }
      } catch (error) {
        console.error('Error al actualizar el video:', error.response ? error.response.data : error.message);
        setSnackbarMessage('Error al actualizar el video');
        setSnackbarSeverity('error');
      }
    } else {
      setSnackbarMessage('URL de YouTube inválida');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  // Función para cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Button onClick={() => setShowForm(!showForm)} variant="contained" color="primary" sx={{mb:'20px'}}>
        {showForm ? 'Cancelar' : <div>Subir Video <Videocam/> </div>}
      </Button>

      {showForm && (
        <Grid container spacing={2} mb={2} sx={{ borderRadius: '15px', boxShadow: '2px 2px 10px 0px #D0D0D0', padding: '0px', backgroundColor: '#FCFDFD' }}>
          <Grid item xs={12} p={2} sm={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="URL del video de YouTube"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" endIcon={<SendRounded />}>
                Publicar Video
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={5.5} m={2} >
            {embedUrl && (
              <iframe
                width="100%"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            )}
          </Grid>
        </Grid>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert variant='filled' onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
