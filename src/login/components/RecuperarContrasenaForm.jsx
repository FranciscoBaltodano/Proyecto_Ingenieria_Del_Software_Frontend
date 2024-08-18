import React, { useState } from "react";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Alert,
  Grid,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

export const RecuperarContrasenaForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [errorMessage, setErrorMessage] = useState("");

  // Función para obtener el correo
  const getCorreo = async ({ numeroCuentaForgotPassword }) => {
    setCorreo("");
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(
        `/api/student/correo/${numeroCuentaForgotPassword}`
      );
      const { correo_Institucional, id } = response.data;
      console.log("Correo:", correo_Institucional);
      console.log("ID:", id);
      
      enviarCorreo(correo_Institucional, id);
      setCorreo(correo_Institucional);
    } catch (error) {
      setErrorMessage(
        "Número de cuenta inválido. Por favor, inténtelo nuevamente."
      );
      console.error(error.response?.data?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const enviarCorreo = async(correo_Institucional, id) => {
    console.log("Enviando correo a:", correo_Institucional, 'con id:', id);
    // Implementar la lógica para enviar un correo aquí
    const response = await axios.post('/api/student/enviarCambioContrasena',{
        correo_Institucional,
        id
    });
    const { message } = response.data;
    console.log(message);
  };

  return (
    <Grid p={2}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Recuperar Contraseña
      </Typography>

      {/* Mensaje de éxito o error */}
      {correo && !errorMessage ? (
        <Alert severity="success" sx={{ my: 2 }}>
          Se ha enviado un correo a {correo}. Por favor, revise su bandeja de
          entrada para recibir un enlace para recuperar su contraseña.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(getCorreo)}>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Por favor, ingrese su número de cuenta para recuperar su
              contraseña.
            </Typography>

            <TextField
              fullWidth
              label="Número de Cuenta"
              {...register("numeroCuentaForgotPassword", {
                required: "Este campo es requerido",
              })}
              error={!!errors.numeroCuentaForgotPassword}
              helperText={errors.numeroCuentaForgotPassword?.message}
            />
          </DialogContent>
          <DialogActions>
            {errorMessage && (
              <Alert severity="error" sx={{ my: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Enviar"}
            </Button>
          </DialogActions>
        </form>
      )}
    </Grid>
  );
};
