import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Box, CircularProgress } from '@mui/material';
import logoUNAH from '/assets/logoUNAH.webp';

export const NoticiasList = () => {
  const [noticias, setNoticias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchNoticias = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('api/admin/noticias');
      if (Array.isArray(data)) {
        setNoticias(data);
      } else {
        setNoticias([]);
        console.error('Error: La respuesta de la API no es un arreglo');
      }
    } catch (error) {
      console.error('Error fetching noticias:', error);
      setNoticias([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleOpenModal = (noticia) => {
    setSelectedNoticia(noticia);
  };

  const handleCloseModal = () => {
    setSelectedNoticia(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} display='flex' justifyContent='center'>
          {noticias.map((noticia, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '15px',
                  boxShadow: '1px 10px 20px 1px rgba(0,0,0,0.2)',
                  margin: '20px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '1px 10px 30px 1px rgba(0,0,0,0.4)',
                  },
                }}
                onClick={() => handleOpenModal(noticia)}
              >
                <CardActionArea>
                  <Box sx={{ height: 200, overflow: 'hidden' }}>
                    {noticia.imagen ? (
                      <CardMedia
                        component="img"
                        image={noticia.imagen}
                        alt={noticia.titulo}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        image={logoUNAH}
                        alt={noticia.titulo}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(0.7)',
                          },
                        }}
                      />
                    )}
                  </Box>
                  <CardContent>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div" 
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {noticia.titulo}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {noticia.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedNoticia && (
        <Modal
          open={true}
          onClose={handleCloseModal}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
         <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, maxWidth: 600, width: '95%' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {selectedNoticia.titulo}
      </Typography>
      {selectedNoticia.imagen && (
        <>
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100%', 
              paddingTop: '56.25%', // Aspecto 16:9
              marginBottom: 2,
              cursor: 'pointer'
            }}
            onClick={handleOpen}
          >
            <CardMedia
              component="img"
              image={selectedNoticia.imagen}
              alt={selectedNoticia.titulo}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              height: '90%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
              <CardMedia
                component="img"
                image={selectedNoticia.imagen}
                alt={selectedNoticia.titulo}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Modal>
        </>
      )}
      <Typography variant="body1" color="text.secondary">
        {selectedNoticia.descripcion}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
        Fecha de creación: {formatDate(selectedNoticia.fecha_creacion)}
      </Typography>
    </Box>
        </Modal>
      )}
    </>
  );
};
