import React, {useEffect, useState} from 'react';
import { Divider, Typography } from '@mui/material'
import { Button ,Snackbar,Alert} from '@mui/material'
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export const FormCancelacionExcepcional =()=>{

    const { register, handleSubmit, setValue,watch,reset,formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState([]);
    const [pac, setPac] = useState([]);

    const fechaInicioCancel = watch('fecha_inicioCancel');
    const [minDate,setMinDate]=useState('');
    const horaInicio = watch('hora_inicioCancel');
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false); // Estado para redirección


    useEffect (()=>{
        const fechaActual = new Date().toISOString().split('T')[0]
        setMinDate(fechaActual);
    },[setValue]);
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [pacRes, matriculaRes] = await Promise.all([
              axios.get('http://localhost:3000/api/admin/pac'),
              axios.get('http://localhost:3000/api/admin/tipo_matricula')
            ]);
            console.log('Matricula: ', matriculaRes.data);
            console.log('Pac: ', pacRes.data)
            setMatricula(matriculaRes.data);
            setPac(pacRes.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);

      const onSubmit = async (formData) => {
        setLoading(true);

        const dataToSend = {
            id_Pac:formData.id_Pac, 
            id_TipoMatricula: formData.id_TipoMatricula, 
            fecha_inicioCancel:formData.fecha_inicioCancel, 
            fecha_finCancel:formData.fecha_finCancel, 
            hora_inicioCancel:formData.hora_inicioCancel, 
            hora_finCancel: formData.hora_finCancel
          };

        try {
          const response = await axios.post('http://localhost:3000/api/admin/cancelaciones',dataToSend);
          console.log('Respuesta del servidor:', response.data);
    
          if (response.status === 201) {
            setSnackbarMessage('Cancelacion excepcional creado exitosamente');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            reset(); 
            
            setRedirectToHome(true);

          } 
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
          setSnackbarMessage('Error al crear el cancelacion excepcional');
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
        return navigate('/admin/cancelaciones') ; // Ajusta esta ruta según la URL de tu página de inicio
      }

    return (
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3 " style={{ justifyContent: 'center',   }}>

                    <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12" > 
                        <Typography variant="h7" component="h1" gutterBottom>
                        Selecciona el tipo de cancelacion
                        </Typography>
                        <select id="id_TipoMatricula" className="w-full p-2 border border-black rounded" defaultValue={""}
                        {...register("id_TipoMatricula", {required:"Necesita seleccionar el tipo de matricula" })}
                        
                    >
                        <option  value="" disabled>Elegir</option>
                            {matricula.map(matri => (
                            <option key={matri.id_TipoMatricula} value={matri.id_TipoMatricula}>{matri.tipoMatricula}</option>
                        ))}
                        
                        </select>
                        {errors.id_TipoMatricula && <span className="text-red-500">{errors.id_TipoMatricula.message}</span>}

                    </div>
                    <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12" > 
                        <Typography variant="h7" component="h1" gutterBottom>
                        Seleccione  el PAC
                        </Typography>
                        <select id="id_Pac" className="w-full p-2 border border-black rounded" defaultValue={""}
                            {...register("id_Pac", {required:"Necesita seleccionar un PAC" })}

                        >
                        <option value="" disabled>Elegir</option>
                            {pac.map(pacAno => (
                            <option key={pacAno.id_Pac} value={pacAno.id_Pac}>{pacAno.pac}</option>
                        ))}
                        </select>
                        {errors.id_Pac && <span className="text-red-500">{errors.id_Pac.message}</span>}

                    </div>
                </div>    
                <br />
                <Divider sx={{ marginBottom: 2 }} />
  

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 " style={{ justifyContent: 'space-evenly'  }}>
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de inicio matricula 
                </Typography>
                <input id="fecha_inicioCancel" type="date" 
                    {...register("fecha_inicioCancel", {required:"Fecha de incio de cancelaciones requerida"  })}
                    min={minDate} 
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_inicioCancel && <span className="text-red-500">{errors.fecha_inicioCancel.message}</span>}
                </div>
                <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de fin matricula
                </Typography>
                <input id="fecha_finCancel" type="date" 
                    {...register("fecha_finCancel", {required:"Fecha de fin de cancelaciones requerida"} )}
                    min={fechaInicioCancel} 
                    className="w-full p-2 border border-black rounded"/>
                    
                    {errors.fecha_finCancel && <span className="text-red-500">{errors.fecha_finCancel.message}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2">
                    <div>
                        <Typography variant="h7" component="h1" gutterBottom>
                            Hora de inicio de cancelación
                        </Typography>
                        <input id="hora_inicioCancel" type="time"
                            {...register("hora_inicioCancel", { required: "Hora de inicio de cancelaciones requerida" })}
                            className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded" />
                        <br />
                        {errors.hora_inicioCancel && <span className="text-red-500">{errors.hora_inicioCancel.message}</span>}
                    </div>
                    <div>
                        <Typography variant="h7" component="h1" gutterBottom>
                            Hora de fin de cancelación
                        </Typography>
                        <input id="hora_finCancel" type="time"
                            {...register("hora_finCancel", { required: "Hora de fin de cancelaciones requerida" })}
                            className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded" />
                        <br />
                        {errors.hora_finCancel && <span className="text-red-500">{errors.hora_finCancel.message}</span>}
                    </div>
                </div>
            </div>
            <br />
            <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Stack direction="row" spacing={6}>
                    <Button variant="contained" type="submit">
                        Activar
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={() => navigate('/admin/cancelaciones')}>
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
                <Alert onClose={handleCloseSnackbar} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
            </Snackbar>
    
        </form>
    );
};
