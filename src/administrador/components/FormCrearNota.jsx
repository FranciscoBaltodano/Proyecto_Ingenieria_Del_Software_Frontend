import React, {useEffect, useState} from 'react';
import { Divider, Typography } from '@mui/material';
import { Button, Snackbar, Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const FormCrearNota = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [selectedPeriodo, setSelectedPeriodo] = useState(null); // Nuevo estado para el período seleccionado
    const fechaInicioCancel = watch('fecha_inicioCancel');
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false); 

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];
        setMinDate(fechaActual);
    }, [setValue]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: matriculaRes } = await axios.get('http://localhost:3000/api/admin/datosMatricula');
                console.log('Datos Matricula:', matriculaRes);
                setMatricula(matriculaRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlePeriodoChange = (event) => {
        const selectedId = event.target.value;
        const selected = matricula.find(matri => matri.id_ConfMatri === parseInt(selectedId, 10));
        setSelectedPeriodo(selected); // Actualiza el estado con el período seleccionado
    };

    const onSubmit = async (formData) => {
      setLoading(true);
  
      const dataToSend = {
          fecha_inicio: formData.fecha_inicio,
          fecha_fin: formData.fecha_final,
          id_ConfMatri: parseInt(formData.id_ConfMatri, 10), 
          estado: true 
      };
  
      try {
          const response = await axios.post('http://localhost:3000/api/admin/proceson', dataToSend);
          console.log('Respuesta del servidor:', response.data);
  
          if (response.status === 201) {
              setSnackbarMessage('Proceso de notas activado exitosamente');
              setSnackbarSeverity('success');
              setOpenSnackbar(true);
              reset();
              setTimeout(() => {
                  setRedirectToHome(true);
              }, 2000);
          } 
      } catch (error) {
          console.error('Error al enviar el formulario:', error);
          setSnackbarMessage('Error al activar el proceso de notas');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
      } finally {
          setLoading(false);
      }
  };
  
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    if (redirectToHome) {
        return navigate('/admin/notas');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3 " style={{ justifyContent: 'center' }}>
                <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                    <Typography variant="h7" component="h1" gutterBottom>
                        Selecciona el periodo
                    </Typography>
                    <select id="id_ConfMatri" className="w-full p-2 border border-black rounded" defaultValue={""}
                        {...register("id_ConfMatri", { required: "Necesita seleccionar el tipo de matricula" })}
                        onChange={handlePeriodoChange} // Maneja el cambio de selección
                    >
                        <option value="" disabled>Elegir</option>
                        {matricula.map(matri => (
                            <option key={matri.id_ConfMatri} value={matri.id_ConfMatri}>{matri.pacSeleccionado}</option>
                        ))}
                    </select>
                    {errors.id_ConfMatri && <span className="text-red-500">{errors.id_ConfMatri.message}</span>}
                </div>
            </div>

           <br />
            {selectedPeriodo && (
                <div>
                    <Typography variant="body1" gutterBottom>
                        La fecha de inicio del periodo es: {selectedPeriodo.fecha_inicioPAC}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        La fecha de fin del periodo es: {selectedPeriodo.fecha_finPAC}
                    </Typography>
                </div>
            )}

            <br />
            <Divider sx={{ marginBottom: 2 }} />

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 " style={{ justifyContent: 'space-evenly'  }}>
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de inicio para subir notas
                </Typography>
                <input id="fecha_inicio" type="date" 
                  {...register("fecha_inicio", {required:"Fecha de inicio requerida"})}
                    min={minDate} 
                    className="w-full p-2 border border-black rounded"/>
                  {errors.fecha_inicio && <span className="text-red-500">{errors.fecha_inicio.message}</span>}
                </div>
                <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de fin para subir notas
                </Typography>
                <input id="fecha_final" type="date" 
                  {...register("fecha_final", {required:"Fecha de fin requerida"})}
                      min={fechaInicioCancel} 
                      className="w-full p-2 border border-black rounded"/>
                  {errors.fecha_final && <span className="text-red-500">{errors.fecha_final.message}</span>}
                </div>
               
            </div>
            <br />

            <br />

            <div style={{display: 'flex',flexWrap: 'nowrap',justifyContent: 'center', alignItems: 'flex-end'}}>
                <Stack direction="row" spacing={6}>
                <Button variant="contained" type="summit">
                Activar
                </Button>
                <Button variant="contained" style={{backgroundColor:'gray'}} onClick={() => navigate('/admin/notas')}>
                Regresar
                </Button>
                </Stack>
            </div>
            <br />
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                <Alert onClose={handleCloseSnackbar} 
                variant='filled' 
                severity={snackbarSeverity} 
                sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
            </Snackbar>
    
        </form>
    )
}
