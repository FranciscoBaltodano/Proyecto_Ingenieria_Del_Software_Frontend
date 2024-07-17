import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { AdministradorLayout } from "../layout/AdministradorLayout";

export const NoticiasPage = () => {
  const {
    register,
    reset,
    
    formState: { errors },
  } = useForm();
  const [noticias, setNoticias] = useState([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "titulo", headerName: "Título", width: 150 },
    { field: "descripcion", headerName: "Descripción", width: 300 },
    {
      field: "imagen",
      headerName: "Imagen",
      width: 150,
      renderCell: (params) => {
        console.log("URL de la imagen:", params.value);
        return (
          <img
            src={params.value}
            alt={params.value}
            style={{ width: "auto", height: "100%"}}
          />
        );
      },
    },
    {
      field: "fecha_creacion",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => setNoticiaSeleccionada(params.row)}
            disabled={
              noticiaSeleccionada &&
              noticiaSeleccionada.id_noticia === params.row.id_noticia
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id_noticia)}
            disabled={
              noticiaSeleccionada &&
              noticiaSeleccionada.id_noticia === params.row.id_noticia
            }
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    const getNoticias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/noticias"
        );
        setNoticias(response.data);
      } catch (error) {
        console.error("Error fetching noticias:", error);
      }
    };
    getNoticias();
  }, []);



  const onCreateSubmit = async (noticiaData) => {
    setLoading(true);
    const formData = new FormData();
  
    // Agrega otros campos de noticiaData al FormData
    Object.keys(noticiaData).forEach((key) => {
      if (key !== "imagen") {
        formData.append(key, noticiaData[key]);
      }
    });
  
    // Manejar la imagen
    if (selectedImage) {
      formData.append("imagen", selectedImage);
    }
  
    try {
      await axios.post("http://localhost:3000/api/admin/noticias", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbarMessage("Noticia creada exitosamente");
      
      const response = await axios.get("http://localhost:3000/api/admin/noticias");
      setNoticias(response.data);
      handleLimpiar();
    } catch (error) {
      setSnackbarMessage("Hubo un error");
      setSnackbarSeverity("error");
      console.error("Error al enviar el formulario:", error);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };
  
  const onUpdateSubmit = async (noticiaData) => {
    setLoading(true);
    const formData = new FormData();
  
    // Agrega otros campos de noticiaData al FormData
    Object.keys(noticiaData).forEach((key) => {
      if (key !== "imagen") {
        formData.append(key, noticiaData[key]);
      }
    });
  
    // Manejar la imagen
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = async () => {
        formData.append("imagen", reader.result);
  
        try {
          await axios.put(
            `http://localhost:3000/api/admin/noticias/${noticiaSeleccionada.id_noticia}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          setSnackbarMessage("Noticia actualizada exitosamente");
  
          const response = await axios.get("http://localhost:3000/api/admin/noticias");
          setNoticias(response.data);
          handleLimpiar();
        } catch (error) {
          setSnackbarMessage("Hubo un error");
          setSnackbarSeverity("error");
          console.error("Error al enviar el formulario:", error);
        } finally {
          setLoading(false);
          setOpen(true);
        }
      };
      reader.onerror = () => {
        setSnackbarMessage("Error al leer la imagen");
        setSnackbarSeverity("error");
        setLoading(false);
        setOpen(true);
      };
    } else if (noticiaSeleccionada && noticiaSeleccionada.imagen) {
      formData.append("imagen", noticiaSeleccionada.imagen);
  
      try {
        await axios.put(
          `http://localhost:3000/api/admin/noticias/${noticiaSeleccionada.id_noticia}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSnackbarMessage("Noticia actualizada exitosamente");
  
        const response = await axios.get("http://localhost:3000/api/admin/noticias");
        setNoticias(response.data);
        handleLimpiar();
      } catch (error) {
        setSnackbarMessage("Hubo un error");
        setSnackbarSeverity("error");
        console.error("Error al enviar el formulario:", error);
      } finally {
        setLoading(false);
        setOpen(true);
      }
    } else {
      setSnackbarMessage("No se ha seleccionado ninguna imagen para actualizar");
      setSnackbarSeverity("error");
      setLoading(false);
      setOpen(true);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const noticiaData = {
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
    };
    if (noticiaSeleccionada) {
      onUpdateSubmit(noticiaData);
    } else {
      onCreateSubmit(noticiaData);
    }
  };
  

  
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Imagen seleccionada:', file);
      setSelectedImage(file);
    } else {
      console.log('No se ha seleccionado ninguna imagen.');
      setSelectedImage(null);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleLimpiar = () => {
    reset();
    setSelectedImage(null);
    setNoticiaSeleccionada(null);
    document.getElementById("upload-image").value = "";
  };

  const handleDelete = async (id_noticia) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/noticias/${id_noticia}`
      );
      const response = await axios.get(
        "http://localhost:3000/api/admin/noticias"
      );
      setNoticias(response.data);
    } catch (error) {
      console.error("Error deleting noticia:", error);
    }
  };

  return (
    <AdministradorLayout>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de Noticias
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "800px",
          margin: "auto",
          padding: 2,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {noticiaSeleccionada ? "Actualizar Entrada" : "Agregar Entrada"} para
          la página de inicio
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              {...register("titulo", { required: "El título es obligatorio" })}
              error={!!errors.titulo}
              helperText={errors.titulo?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              {...register("descripcion")}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-image"
              onChange={handleImageChange}
            />
            <label htmlFor="upload-image">
              <Button  variant="outlined" color="primary" component="span">
                Subir Imagen
              </Button>
            </label>
            {selectedImage && (
              <Typography
                variant="body2"
                sx={{ marginLeft: 2, display: "inline" }}
              >
                {selectedImage.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color={noticiaSeleccionada ? "warning" : "primary"}
              disabled={loading}
            >
              {noticiaSeleccionada ? "Actualizar" : "Registrar"}
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
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={noticias}
          getRowId={(row) => row.id_noticia}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
        />
      </div>
    </Box>
    </AdministradorLayout>
  );
};