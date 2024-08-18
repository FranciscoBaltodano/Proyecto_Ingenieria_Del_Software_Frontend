import React, { useEffect, useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { Button, Snackbar, Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export const FormCrearNotaModificar = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams(); // Asumiendo que el ID viene en la URL
    const [matricula, setMatricula] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);
    const fechaInicioCancel = watch('fecha_inicioCancel');
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [procesoNota, setProcesoNota] = useState(null);

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

                if (id) {
                    const { data: procesoNotaRes } = await axios.get(`http://localhost:3000/api/admin/procesoNotas/${id}`);
                    console.log('Proceso Nota:', procesoNotaRes);
                    setProcesoNota(procesoNotaRes[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (procesoNota) {
            setValue('id_ConfMatri', procesoNota.id_ConfMatri);
            setValue('fecha_inicio', procesoNota.fecha_inicio);
            setValue('fecha_final', procesoNota.fecha_final);
            setSelectedPeriodo(matricula.find(matri => matri.id_ConfMatri === procesoNota.id_ConfMatri));
        }
    }, [procesoNota, setValue, matricula]);

    const handlePeriodoChange = (event) => {
        const selectedId = event.target.value;
        const selected = matricula.find(matri => matri.id_ConfMatri === parseInt(selectedId, 10));
        setSelectedPeriodo(selected);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:3000/api/admin/proceso_notas/${id}`, data);
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/admin/notas');
            }, 3000); 
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || 'Error al actualizar');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3 " style={{ justifyContent: 'center' }}>
                <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                    <Typography variant="h7" component="h1" gutterBottom>
                        Selecciona el periodo
                    </Typography>
                    <select id="id_ConfMatri" className="w-full p-2 border border-black rounded" defaultValue={""}
                        {...register("id_ConfMatri", { required: "Necesita seleccionar el tipo de matricula" })}
                        onChange={handlePeriodoChange}
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
                <Button variant="contained" type="submit" disabled={loading}>
                    {procesoNota ? 'Actualizar' : 'Activar'}
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
    );
}
