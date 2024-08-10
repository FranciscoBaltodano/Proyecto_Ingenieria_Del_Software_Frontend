import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Modal,
  Box,
  Button,
  Snackbar,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: '8px', 
};

export const FotoPerfil = () => {
  const { user, setUser } = useAuth();
  const [fotoPerfil, setFotoPerfil] = useState(user.imagen || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
console.log(setUser)
  const handleUpdateProfile = async () => {
    if (selectedImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append(user.roles.includes("Estudiante")? "Imagen" : "imagen", selectedImage);

      const apiUrl = user.roles.includes("Estudiante")
        ? `/api/student/${user.numeroCuenta}`
        : `/api/admin/empleados/${user.numeroEmpleado}`;

      try {
        await axios.put(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUser({ ...user, imagen: imagePreview });
        setFotoPerfil(imagePreview);
        setSnackbarMessage("Imagen actualizada, inicie sesión nuevamente para ver los cambios");
        setSnackbarSeverity("success");
      } catch (error) {
        setSnackbarMessage("Error al actualizar la imagen");
        setSnackbarSeverity("error");
        console.error("Error al actualizar la imagen de perfil", error);
      } finally {
        setLoading(false);
        setModalOpen(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Grid
        container
        padding={2} 
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{
          borderRadius: '15px',
          boxShadow:'1px 1px 7px 0px #D0D0D0',
          // boxShadow: '0px 0px 3px 0px #D0D0D0',
           backgroundColor:'#FCFDFD',
          display: { xs: 'flex' } 
        }}
      >
        <Avatar
          onClick={handleModalOpen}
          alt="User Photo"
          src={fotoPerfil}
          sx={{ width: 120, height: 120,mb:'20px', cursor: "pointer", boxShadow: 2 }}
        />
        <Typography align="center" variant="h5" >
          {`${user.nombre} ${user.apellido}`}
        </Typography>
        <Typography  align="center" color='text.secondary' variant="body2" >
          {user.roles.map((i) => i === 'JefeDepartamento' ? 'Jefe de Departamento' : i).join(", ")}
        </Typography>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Cambiar Foto de Perfil
          </Typography>
          <Box
            sx={{
              mt: 2,
              mb: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {imagePreview || user.imagen ? (
              <Avatar
                alt="Selected"
                src={imagePreview || user.imagen}
                sx={{ width: 120, height: 120, mb: 2,boxShadow: 3 }}
              />
            ) : (
              <Typography variant="body1">
                No hay imagen seleccionada
              </Typography>
            )}
            {loading ? (
              <CircularProgress sx={{ mb: 2 }} />
            ) : (
              <>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input">
                  <Button
                    variant="outlined"
                    color="success"
                    component="span"
                    endIcon={<PhotoCamera />}
                  >
                    Seleccionar Imagen
                  </Button>
                </label>
              </>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            Confirmar
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
