import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { NoticiasForm2 } from '../components/NoticiasForm2';
import { NoticiasTable2 } from '../components/NoticiasTable2';
import { fetchNoticias, createNoticia, updateNoticia, deleteNoticia } from '../services/NoticiasServices';
import { NoticiasForm } from '../components/NoticiasForm';

export const NoticiasPage = () => {
  // Para guardar el arreglo de noticias que se obtiene con el GET
  const [noticias, setNoticias] = useState([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

  useEffect(() => {
    const getNoticias = async () => {
      try {
        const data = await fetchNoticias();
        setNoticias(data);
      } catch (error) {
        console.error('Error fetching noticias:', error);
      }
    };
    getNoticias();
  }, []);
 
  const handleFormSubmit = async (noticiaData) => {
    try {
      if (noticiaSeleccionada) {
        await updateNoticia(noticiaSeleccionada.id_noticia, noticiaData);
      } else {
        await createNoticia(noticiaData);
      }
      const data = await fetchNoticias();
      setNoticias(data);
      setNoticiaSeleccionada(null);
    } catch (error) {
      console.error('Error handling form submit:', error);
    }
  };

  const handleDelete = async (id_noticia) => {
    try {
      await deleteNoticia(id_noticia);
      const data = await fetchNoticias();
      setNoticias(data);
    } catch (error) {
      console.error('Error deleting noticia:', error);
    }
  };

  const handleCancel = () => {
    setNoticiaSeleccionada(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de Noticias
      </Typography>
      {/* <NoticiasForm/> */}
      <NoticiasForm2
        noticiaSeleccionada={noticiaSeleccionada}
        setNoticiaSeleccionada={setNoticiaSeleccionada}
        onFormSubmit={handleFormSubmit}
        
        noticias={noticias}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      />
      <NoticiasTable2
        noticias={noticias}
        setNoticiaSeleccionada={setNoticiaSeleccionada}
        handleDelete={handleDelete}
        noticiaSeleccionada={noticiaSeleccionada}
        handleCancel={handleCancel}
      />
    </Box>
  );
};





// // NoticiasPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import NoticiasForm2 from './NoticiasForm2';
// import NoticiasTable2 from './NoticiasTable2';
// import { fetchNoticias, createNoticia, updateNoticia, deleteNoticia } from '../services/NoticiasServices';

// const NoticiasPage = () => {
//   const [noticias, setNoticias] = useState([]);
//   const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getNoticias = async () => {
//       try {
//         const data = await fetchNoticias();
//         setNoticias(data);
//       } catch (error) {
//         console.error('Error fetching noticias:', error);
//       }
//     };

//     getNoticias();
//   }, []);

//   const handleFormSubmit = async (noticiaData) => {
//     setLoading(true);
//     try {
//       if (noticiaSeleccionada) {
//         // Actualizar noticia
//         const updatedNoticia = await updateNoticia(noticiaSeleccionada.id_noticia, noticiaData);
//         setNoticias((prevNoticias) =>
//           prevNoticias.map((n) =>
//             n.id_noticia === noticiaSeleccionada.id_noticia ? updatedNoticia : n
//           )
//         );
//         setSnackbarMessage('Noticia actualizada exitosamente');
//       } else {
//         // Crear noticia
//         const newNoticia = await createNoticia(noticiaData);
//         setNoticias((prevNoticias) => [...prevNoticias, newNoticia]);
//         setSnackbarMessage('Noticia creada exitosamente');
//       }
//       setNoticiaSeleccionada(null);
//     } catch (error) {
//       setSnackbarMessage('Error al crear o actualizar la noticia');
//       console.error('Error al enviar el formulario:', error);
//     } finally {
//       setLoading(false);
//       setOpen(true);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteNoticia(id);
//       setNoticias((prevNoticias) => prevNoticias.filter((n) => n.id_noticia !== id));
//     } catch (error) {
//       console.error('Error deleting noticia:', error);
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Noticias
//       </Typography>
//       <NoticiasForm2
//         noticiaSeleccionada={noticiaSeleccionada}
//         setNoticiaSeleccionada={setNoticiaSeleccionada}
//         onFormSubmit={handleFormSubmit}
//       />
//       <NoticiasTable2
//         noticias={noticias}
//         setNoticiaSeleccionada={setNoticiaSeleccionada}
//         handleDelete={handleDelete}
//       />
//       <Snackbar
//         open={open}
//         autoHideDuration={2000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={handleClose} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default NoticiasPage;










