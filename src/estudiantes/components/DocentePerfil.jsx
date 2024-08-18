// import React from 'react'

// export const DocentePerfil = ({ numeroCuenta }) => {
//   return (
//     <>
//     <div>{numeroCuenta}</div>
//     hola
//     </>
//   )
// }






import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Modal,
  IconButton
} from '@mui/material';
import axios from 'axios';
import { CheckCircle, Email, Favorite, PersonAdd } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';


const containerStyle = {
  width: '100%',
  height: '50vh', // 50% de la altura de la pantalla
  background: 'lightblue',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1, // Asegura que el fondo animado esté debajo del Card
};

const backgroundStyle = {
  content: '""',
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background: 'radial-gradient(circle, #3498db 10%, transparent 20%), radial-gradient(circle, transparent 10%, #3498db 20%)',
  backgroundSize: '30px 30px',
  animation: 'moveBackground 8s linear infinite',
};

const keyframes = `
  @keyframes moveBackground {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(20%, 20%);
    }
  }
`;

const cardStyle = {
  position: 'absolute',
  top: '400px',
  left: '50%',
  transform: 'translate(-50%, -60%)',
  width: 'calc(100% - 40px)',
  maxWidth: '1000px',
  backgroundColor: 'white',
  boxShadow: '4',
  borderRadius: '8px',
  zIndex: 2, 
  paddingTop: '0px', 
  marginTop: '100px', 
};



const buttonsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

const galleryStyle = {
  marginTop: '20px',
};

const imageContainerStyle = {
  width: '100%',
  height: 0,
  paddingTop: '75%',
  overflow: 'hidden',
  borderRadius: '8px',
  position: 'relative',
  boxShadow: 9,
  cursor: 'pointer',
  '&:hover img': {
    transform: 'scale(1.1)',
  }
};

const imageStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const DocentePerfil = ( { id_Usuario, isFriend } ) => {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  console.log('isFriend', isFriend);
  
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/perfil/${id_Usuario}`);
        setPerfil(response.data.data);
        console.log(response.data.data);
        
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
      <Box display='flex' justifyContent='center' sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!perfil) {
    return <Typography variant="h6">Perfil no encontrado</Typography>;
  }

  const { Nombre, Apellido, Imagen, Perfiles, estudiante, Correo, empleado } = perfil;
  const perfilInfo = Perfiles[0] || {};
  const { Descripcion, Fotografia1, Fotografia2, Fotografia3 } = perfilInfo;
 
  // Determina si el perfil es de un estudiante o empleado
  const info = estudiante[0] || empleado[0] || {};
  const { numeroCuenta, id_Centros, id_Departamento, correo_Institucional, numeroEmpleado } = info;

  // Obtener nombres en lugar de IDs
  const centroNombre = id_Centros?.Nombre || 'No disponible';
  const departamentoNombre = id_Departamento?.Nombre || 'No disponible';
  
  const avatarStyle = {
    width: 120,
    height: 120,
    position: 'absolute',
    top: `calc(${Fotografia1 ? '17%':'330px'} - 60px)`, // Ajustar para que el Avatar esté centrado en la parte superior del Card
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '4',
    zIndex: 3, // Asegura que el Avatar esté por encima del Card
  };

  const enviarSolicitud = async() => {
    const dataToSend = {
      userName: `${user.nombre} ${user.apellido}`,
      userId: user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado,
      friendEmail: correo_Institucional ? correo_Institucional : Correo,
      friendId: numeroCuenta ? JSON.stringify(numeroCuenta) : JSON.stringify(numeroEmpleado),
    };

    const response = await axios.post('/api/student/enviarSolicitud', dataToSend);
    const { data:{ data } } = response;
    console.log('Respuesta del servidor', data);

    setSolicitudEnviada(true);
  }

  return (
    <>
      <style>{keyframes}</style>
      <Box sx={{ position: 'relative', height: '75vh', overflow: 'auto' , borderRadius:'40px'}}>
      <Box sx={containerStyle}>
          <Box sx={backgroundStyle}></Box>
        </Box>
        <Avatar
          alt="Usuario"
          src={Imagen}
          sx={avatarStyle}
        />
        <Card sx={cardStyle}>
          <CardContent>
            <Box sx={buttonsContainerStyle}>
            <Button 
              variant="text" 
              color="primary" 
              href={`mailto:${correo_Institucional ? correo_Institucional : Correo}`} 
              target="_blank" 
              rel="noopener noreferrer"
              endIcon={<Email />}
            >
              Email
            </Button>
            {isFriend ? 
              <Button 
                variant="text" 
                color='success'
                endIcon={<Favorite />} 
              >
                Ya son amigos
              </Button>
             :
              <Button 
              variant="text" 
              color={solicitudEnviada ? 'success' : 'primary'} 
              endIcon={solicitudEnviada ? <CheckCircle/> :  <PersonAdd />} 
              onClick={enviarSolicitud}
              >
                {solicitudEnviada ? 'Solicitud enviada' : 'Agregar'}
              </Button>
            }
            </Box>
            <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center', mb: 1 }} mt={{ xs:'130px', sm:'0px'}}    >
              {`${Nombre} ${Apellido}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
              {Descripcion}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" component="div" gutterBottom>
                  {numeroCuenta ? 'Número de Cuenta' : 'Número de Empleado'}
                </Typography>
                <Typography variant="body1">
                  {numeroCuenta ? numeroCuenta : numeroEmpleado}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" component="div" gutterBottom>
                  Departamento
                </Typography>
                <Typography variant="body1">
                {departamentoNombre}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" component="div" gutterBottom>
                  Centro Universitario
                </Typography>
                <Typography variant="body1">
                {centroNombre}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" component="div" gutterBottom>
                  {correo_Institucional ? 'Correo Institucional' : 'Correo Profesional'}
                </Typography>
                <Typography variant="body1" overflow='auto'>
                  {correo_Institucional ? correo_Institucional : Correo}
                </Typography>
              </Grid>
            </Grid>
            {/* Galería de imágenes */}
            {Fotografia1 || Fotografia2 || Fotografia3 ? (
              <Box sx={galleryStyle}>
                <Typography variant="h6" gutterBottom>Galería</Typography>
                <Grid container spacing={2}>
                  {[Fotografia1, Fotografia2, Fotografia3].map((foto, index) => (
                    foto ? (
                      <Grid item xs={4} key={index}>
                        <Box
                          component="div"
                          sx={imageContainerStyle}
                          onClick={() => handleImageClick(foto)}
                        >
                          <img
                            src={foto}
                            alt={`Foto ${index + 1}`}
                            style={imageStyle}
                          />
                        </Box>
                      </Grid>
                    ) : null
                  ))}
                </Grid>
              </Box>
            ) : null}
          </CardContent>
        </Card>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
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
    </>
  );
};
