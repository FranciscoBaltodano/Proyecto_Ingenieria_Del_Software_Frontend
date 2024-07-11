import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Box, CircularProgress } from '@mui/material';
import logoUNAH from '/assets/logoUNAH.webp';

export const NoticiasList = () => {
  const [noticias, setNoticias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNoticias = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('api/admin/noticias');
      setNoticias(data);
    } catch (error) {
      console.error('Error fetching noticias:', error);
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
        <Grid container spacing={2} display='flex'>
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
                    <Typography gutterBottom variant="h5" component="div">
                      {noticia.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
          <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, maxWidth: 600, width: '100%' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedNoticia.titulo}
            </Typography>
            {selectedNoticia.imagen && (
              <CardMedia
                component="img"
                image={selectedNoticia.imagen}
                alt={selectedNoticia.titulo}
                sx={{ maxHeight: 300, marginBottom: 2, objectFit: 'cover' }}
              />
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
