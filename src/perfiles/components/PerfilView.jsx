import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Modal,
  IconButton,
} from '@mui/material';
import { Email, Phone, LocationCity, School } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

export const PerfilView = () => {
  const { id_Usuario } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/perfil/${id_Usuario}`);
        setPerfil(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, [id_Usuario]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="text" height={40} width="80%" />
        <Skeleton variant="text" height={30} width="60%" />
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  if (!perfil) {
    return <Typography variant="h6">Perfil no encontrado</Typography>;
  }

  const {
    Nombre,
    Apellido,
    Correo,
    Telefono,
    Imagen,
    Perfiles,
    estudiante
  } = perfil;

  const perfilInfo = Perfiles[0] || {};
  const { Descripcion, Fotografia1, Fotografia2, Fotografia3 } = perfilInfo;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
          <Avatar
            alt={`${Nombre} ${Apellido}`}
            src={Imagen}
            sx={{ width: 120, height: 120, margin: '0 auto', boxShadow: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" color="primary">{`${Nombre} ${Apellido}`}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
            {Descripcion}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                startIcon={<Email />}
                variant="outlined"
                color="primary"
                href={`mailto:${Correo}`}
                fullWidth
              >
                {Correo}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button startIcon={<Phone />} variant="outlined" color="primary" fullWidth>
                {Telefono}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button startIcon={<LocationCity />} variant="outlined" color="primary" fullWidth>
                {`Centro: ${estudiante[0]?.id_Centros || 'N/A'}`}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button startIcon={<School />} variant="outlined" color="primary" fullWidth>
                {`Carrera: ${estudiante[0]?.id_Departamento || 'N/A'}`}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button startIcon={<School />} variant="outlined" color="primary" fullWidth>
                {`Número de Cuenta: ${estudiante[0]?.numeroCuenta || 'N/A'}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {Fotografia1 || Fotografia2 || Fotografia3 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">Galería</Typography>
          <Grid container spacing={2}>
            {[Fotografia1, Fotografia2, Fotografia3].map((foto, index) => (
              foto ? (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    component="div"
                    sx={{
                      width: '100%',
                      height: 0,
                      paddingTop: '75%',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      position: 'relative',
                      boxShadow: 3,
                      cursor: 'pointer',
                      '&:hover img': {
                        transform: 'scale(1.1)',
                      }
                    }}
                    onClick={() => handleImageClick(foto)}
                  >
                    <img
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                  </Box>
                </Grid>
              ) : null
            ))}
          </Grid>
        </Box>
      ) : null}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <span className="material-icons">close</span>
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                borderRadius: '8px',
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};
