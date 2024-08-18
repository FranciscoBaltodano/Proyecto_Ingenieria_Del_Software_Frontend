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
  IconButton,
  Skeleton
} from '@mui/material';
import axios from 'axios';
import { CheckCircle, Email, Favorite, PersonAdd } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';


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
  mb: 4,
  backgroundColor: 'white',
  boxShadow: '4',
  borderRadius: '8px',
  zIndex: 2, 
  paddingTop: '0px', 
  marginTop: '10px', 
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

export const DocentePerfil = ( { id_Usuario } ) => {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [idDocente, setIdDocente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  
  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get(`/api/teacher/idUser/${id_Usuario}`);
        console.log( response.data.id_usuario);
        setIdDocente(response.data.id_usuario);
        fetchPerfil(response.data.id_usuario);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchId();
  
  }, [id_Usuario]);
  
  const fetchPerfil = async (idDocente) => {
    try {
      // const response = await axios.get(`http://localhost:3000/api/student/perfil/${id_Usuario}`);
      const response = await axios.get(`http://localhost:3000/api/student/perfil/${idDocente}`);
      setPerfil(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    return(
      <Grid display='flex' justifyContent='center'>
        {/* <Typography variant="body1">Cargando</Typography> */}
        <Skeleton variant="rectangular" width={810} height={250} />
      </Grid>
    )
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
      <Box justifyContent='center' display='flex' sx={{ position: 'relative', overflow: 'auto' }}>

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

              <Button 
              variant="text" 
              color={solicitudEnviada ? 'success' : 'primary'} 
              endIcon={solicitudEnviada ? <CheckCircle/> :  <PersonAdd />} 
              onClick={enviarSolicitud}
              >
                {solicitudEnviada ? 'Solicitud enviada' : 'Agregar'}
              </Button>
            </Box>

            <Grid container justifyContent='center' spacing={2}>
            <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center', mb: 1 , mr:1}} mt={{ xs:'130px', sm:'0px'}}    >
              {`${Nombre} ${Apellido}`}   
            </Typography>
            
            <Avatar alt="Usuario" src={Imagen}/>
            
            </Grid>
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
