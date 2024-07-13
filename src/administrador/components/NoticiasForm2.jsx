// // src/components/NoticiasForm2.jsx
// import React, { useState, useEffect } from 'react';
// import { Box, Button, Grid, TextField, Typography, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { createNoticia, updateNoticia } from '../services/NoticiasServices';

// export const NoticiasForm2 = ({ noticiaSeleccionada, setNoticiaSeleccionada, onFormSubmit }) => {
//   const { register, reset, handleSubmit, formState: { errors } } = useForm();
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (noticiaSeleccionada) {
//       reset(noticiaSeleccionada);
//       setSelectedImage(null);
//     }
//   }, [noticiaSeleccionada, reset]);

//   const onSubmit = async (noticiaData) => {
//     setLoading(true);
    // try {
    //   // Preparar los datos de la noticia para enviar al backend
    //   const dataToSend = { ...noticiaData };
      
    //   // Si hay una imagen seleccionada, sube la imagen y actualiza el URL en los datos
    //   if (selectedImage) {
    //     const imageFormData = new FormData();
    //     imageFormData.append('file', selectedImage);
    //     const imageResponse = await fetch('http://localhost:3000/api/upload-image', {
    //       method: 'POST',
    //       body: imageFormData,
    //     });
    //     const imageResult = await imageResponse.json();
    //     dataToSend.imagen = imageResult.url; // Suponiendo que el backend devuelve la URL de la imagen
    //   }

    //   // Aquí, verifica si noticiaSeleccionada está presente
    //   const response = noticiaSeleccionada
    //     ? await updateNoticia(noticiaSeleccionada.id_noticia, dataToSend)
    //     : await createNoticia(dataToSend);

    //   setSnackbarMessage(noticiaSeleccionada ? 'Noticia actualizada exitosamente' : 'Noticia creada exitosamente');
    //   setSnackbarSeverity('success');
    //   reset();
    //   setSelectedImage(null);
    //   setNoticiaSeleccionada(null);
    //   document.getElementById('upload-image').value = null;
    // } catch (error) {
//       setSnackbarMessage('Error al crear o actualizar la noticia');
//       setSnackbarSeverity('error');
//       console.error('Error al enviar el formulario:', error);
//     } finally {
//       setLoading(false);
//       setOpen(true);
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <Box 
//       component="form" 
//       onSubmit={handleSubmit(onSubmit)} 
//       sx={{ 
//         maxWidth: '800px', 
//         margin: 'auto', 
//         padding: 2, 
//         backgroundColor: 'white', 
//         borderRadius: 2, 
//         boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
//       }}
//     >
//       <Typography variant="h5" component="h1" gutterBottom >
//         {noticiaSeleccionada ? 'Actualizar Entrada' : 'Agregar Entrada'} para la página de inicio
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField 
//             label="Título" 
//             variant="outlined" 
//             fullWidth 
//             {...register("titulo", { required: 'El título es obligatorio' })}
//             error={!!errors.titulo}
//             helperText={errors.titulo?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             label="Descripción" 
//             variant="outlined" 
//             fullWidth 
//             {...register("descripcion")}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <input 
//             type="file" 
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="upload-image"
//             onChange={handleImageChange}
//           />
//           <label htmlFor="upload-image">
//             <Button 
//               variant="outlined" 
//               color="primary" 
//               component="span"
//             >
//               Subir Imagen
//             </Button>
//           </label>
//           {selectedImage && (
//             <Typography variant="body2" sx={{ marginLeft: 2, display: 'inline' }}>
//               {selectedImage.name}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} display="flex" justifyContent="center">
//           <Button 
//             type="submit" 
//             variant="contained" 
//             color="primary"
//             disabled={loading}
//           >
//             {noticiaSeleccionada ? 'Actualizar' : 'Registrar'}
//           </Button>
//         </Grid>
//       </Grid>
//       <Snackbar 
//         open={open} 
//         autoHideDuration={2000} 
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={handleClose} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//       <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
//         <CircularProgress color="inherit"/>
//       </Backdrop>
//     </Box>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';



import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const NoticiasTable2 = ({ noticias, setNoticiaSeleccionada, handleDelete, noticiaSeleccionada, handleCancel }) => {
  
  const columns = [
    { field: 'id_noticia', headerName: 'ID', width: 90 },
    { field: 'titulo', headerName: 'Título', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 100 },
    { field: 'imagen', headerName: 'Imagen', width: 200,
      renderCell: (params) => (
          <img src={params.value} alt={params.value} style={{ width: '100%' }} />
      ),
     },
    { field: 'fecha_creacion', headerName: 'Fecha', width: 200,
      renderCell: (params) => (
        new Date(params.value).toLocaleDateString()
      ),
     },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => setNoticiaSeleccionada(params.row)}
            disabled={noticiaSeleccionada && noticiaSeleccionada.id_noticia === params.row.id_noticia}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id_noticia)}
            disabled={noticiaSeleccionada && noticiaSeleccionada.id_noticia === params.row.id_noticia}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={noticias}
        getRowId={(row) => row.id_noticia}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
};












export const NoticiasForm2 = ({ noticiaSeleccionada, setNoticiaSeleccionada, noticias, handleDelete, handleCancel }) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (noticiaSeleccionada) {
      reset(noticiaSeleccionada);
      setSelectedImage(null);
    }
  }, [noticiaSeleccionada, reset]);

  const onSubmit = async (noticiadData) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(noticiadData).forEach((key) => {
      formData.append(key, noticiadData[key]);
    });
    if (selectedImage) {
      formData.append('imagen', selectedImage);
    }
    try {

      noticiaSeleccionada ? 
        await axios.put(`http://localhost:3000/api/admin/noticias/${noticiaSeleccionada.id_noticia}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) :
       await axios.post('http://localhost:3000/api/admin/noticias', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbarMessage('Noticia creada exitosamente');
      setSnackbarSeverity('success');
      handleLimpiar();
      document.getElementById('upload-image').value = null;
    } catch (error) {
      setSnackbarMessage('Hubo un error');
      setSnackbarSeverity('error');
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleLimpiar = () => {
    reset(); // Limpia el formulario
    setSelectedImage(null); // Limpia el estado de la imagen
    setNoticiaSeleccionada(null); // Limpia la noticia seleccionada
    document.getElementById('upload-image').value = ''; // Limpia el input de archivo
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ 
        maxWidth: '800px', 
        margin: 'auto', 
        padding: 2, 
        backgroundColor: 'white', 
        borderRadius: 2, 
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom >
        {noticiaSeleccionada ? 'Actualizar Entrada' : 'Agregar Entrada'} para la página de inicio
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Título" 
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined" 
            fullWidth 
            {...register("titulo", { required: 'El título es obligatorio' })}
            error={!!errors.titulo}
            helperText={errors.titulo?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Descripción" 
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined" 
            fullWidth 
            {...register("descripcion")}
          />
        </Grid>
        <Grid item xs={12}>
          <input 
            {...register("imagen")} 
            type="file" 
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button 
              variant="outlined" 
              color="primary" 
              component="span"
            >
              Subir Imagen
            </Button>
          </label>
          {selectedImage && (
            <Typography variant="body2" sx={{ marginLeft: 2, display: 'inline' }}>
              {selectedImage.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button 
            type="submit" 
            variant="contained" 
            color={noticiaSeleccionada ? 'warning' : 'primary'}
            disabled={loading}
          >
            {noticiaSeleccionada ? 'Actualizar' : 'Registrar'}
          </Button>
          {noticiaSeleccionada && (
            <Button 
              variant="contained" 
              color="inherit" 
              onClick={handleLimpiar}
              sx={{ ml: 2 }}
            >
              Cancelar
            </Button>
          )}
        </Grid>

        <Button onClick={()=>handleLimpiar()}>
          Limpiar Formulario
        </Button>
      </Grid>
      <Snackbar 
        open={open} 
        autoHideDuration={2000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>

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
