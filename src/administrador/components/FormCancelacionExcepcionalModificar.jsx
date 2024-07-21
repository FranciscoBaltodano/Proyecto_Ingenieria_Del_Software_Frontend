import React, {useEffect, useState} from 'react';
import { Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';



export const FormCancelacionExcepcionalModificar =()=>{

    
        const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
        const navigate = useNavigate();
        const [matricula, setMatricula] = useState([]);
        const [pac, setPac] = useState([]);
        const fechaInicioCancel = watch('fecha_inicioCancel');
        const [minDate, setMinDate] = useState('');
        const horaInicio = watch('hora_inicioCancel');
        const [cancelacionSeleccionada, setCancelacionSeleccionada] = useState(null);
        const { id } = useParams(); // Obtener el ID de la matrícula desde React Router
        const [pacFiltrado, setPacFiltrado] = useState([]);

        useEffect(() => {
          const fechaActual = new Date().toISOString().split('T')[0];
          setMinDate(fechaActual);
        }, [setValue]);

        const filtrarPac = (tipoMatriculaId, pacs) => {
        if (tipoMatriculaId === 1) { // Asumiendo que 1 es el id para "semestral"
            return pacs.filter(p => p.pac === "I PAC" || p.pac === "II PAC");
        }
        return pacs;
    
      };
    

        const handleTipoMatriculaChange = (event) => {
          const selectedValue = parseInt(event.target.value);
          const pacsFiltrados = filtrarPac(selectedValue, pac);
          setPacFiltrado(pacsFiltrados);
          
           // Si el PAC seleccionado no está en la lista filtrada, seleccionar el primero disponible
          const currentPacId = parseInt(watch('id_Pac'));
          if (!pacsFiltrados.some(p => p.id_Pac === currentPacId)) {
              const defaultPacId = pacsFiltrados[0]?.id_Pac || '';
              setValue('id_Pac', defaultPacId);
          }
      };
      useEffect(() => {
        const fetchData = async () => {
            try {
                const [pacRes, matriculaRes, cancelacionRes] = await Promise.all([
                    axios.get('http://localhost:3000/api/admin/pac'),
                    axios.get('http://localhost:3000/api/admin/tipo_matricula'),
                    axios.get(`http://localhost:3000/api/admin/cancelaciones/${id}`)
                ]);
                
                setMatricula(matriculaRes.data);
                setPac(pacRes.data);
                setCancelacionSeleccionada(cancelacionRes.data);

                // Establecer valores iniciales en el formulario
                setValue('id_TipoMatricula', cancelacionRes.data.TipoMatricula.id_TipoMatricula);
                setValue('id_Pac', cancelacionRes.data.Pac.id_Pac);
                setValue('fecha_inicioCancel', cancelacionRes.data.fecha_inicioCancel);
                setValue('fecha_finCancel', cancelacionRes.data.fecha_finCancel);
                setValue('hora_inicioCancel', cancelacionRes.data.hora_inicioCancel);
                setValue('hora_finCancel', cancelacionRes.data.hora_finCancel);

                // Filtrar PACs basado en el tipo de matrícula inicial
                const pacsFiltrados = filtrarPac(cancelacionRes.data.TipoMatricula.id_TipoMatricula, pacRes.data);
                setPacFiltrado(pacsFiltrados);

            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, [id, setValue]);

          

          const onSubmit = async (data) => {
            console.log('Sending data:', data);
            console.log('URL:', `http://localhost:3000/api/admin/cancelaciones/${id}`);
        
            // Convertir valores a enteros si es necesario
            const updatedData = {
              ...data,
              id_TipoMatricula: parseInt(data.id_TipoMatricula, 10),
              id_Pac: parseInt(data.id_Pac, 10),
            };
        
            try {
              const response = await axios.put(`http://localhost:3000/api/admin/cancelaciones/${id}`, updatedData);
              console.log('Response:', response);
              if (response.status === 200) {
                navigate('/admin/cancelaciones');
              }
            } catch (error) {
              console.error('Error updating cancelacion:', error.response || error);
            }
          };
      
        if (!cancelacionSeleccionada) {
          return <div>Cargando...</div>;
        }
      
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3" style={{ justifyContent: 'center' }}>
              <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                  Selecciona el tipo de cancelacion
                </Typography>
                <select
                    id="id_TipoMatricula"
                    className="w-full p-2 border border-black rounded"
                    {...register("id_TipoMatricula", { required: "Necesita seleccionar el tipo de matricula" })}
                    onChange={(e)=>{
                      handleTipoMatriculaChange(e);
                      register("id_TipoMatricula").onChange(e);
                    }
                      }
                    >
                    {matricula.map((option) => (
                        <option key={option.id_TipoMatricula} value={option.id_TipoMatricula}>
                        {option.tipoMatricula}
                        
                        </option>
                    ))}
                </select>
                {errors.id_TipoMatricula && <span className="text-red-500">{errors.id_TipoMatricula.message}</span>}
              </div>
              <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                  Seleccione el PAC
                </Typography>
                <select
                    id="id_Pac"
                    className="w-full p-2 border border-black rounded"
                    {...register("id_Pac", { required: "Necesita seleccionar un PAC" })}
                    >
                    {pacFiltrado.map(pacAno => (
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
                Fecha de inicio cancelaciones 
                </Typography>
                <input id="fecha_inicioCancel" type="date" defaultValue={cancelacionSeleccionada.fecha_inicioCancel}
                    {...register("fecha_inicioCancel", {required:"Fecha de incio de cancelaciones requerida"  })}
                    min={minDate} 
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_inicioCancel && <span className="text-red-500">{errors.fecha_inicioCancel.message}</span>}

                </div>
                <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de fin cancelaciones
                </Typography>
                <input id="fecha_finCancel" type="date" defaultValue={cancelacionSeleccionada.fecha_finCancel}
                    {...register("fecha_finCancel", {required:"Fecha de fin de cancelaciones requerida"} )}
                    min={fechaInicioCancel}
                    className="w-full p-2 border border-black rounded"/>
                    
                    {errors.fecha_finCancel && <span className="text-red-500">{errors.fecha_finCancel.message}</span>}

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1  lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    <div  >
                        <Typography variant="h7" component="h1" gutterBottom>
                        Hora inicio matricula
                        </Typography>
                        <input id="hora_inicioCancel" type="time" defaultValue={cancelacionSeleccionada.hora_inicioCancel}
                            {...register("hora_inicioCancel", {required:"Hora de inicio de cancelaciones requerida" })}

                            className=" w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                            <br />
                            {errors.hora_inicioCancel && <span className="text-red-500">{errors.hora_inicioCancel.message}</span>}

                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Hora fin matricula
                    </Typography>
                    <input id="hora_finCancel" type="time" defaultValue={cancelacionSeleccionada.hora_finCancel}
                        {...register("hora_finCancel", {required:"Hora de fin de cancelaciones requerida", validate: value=>{
                            if (value<horaInicio){
                                return 'La hora de finalizacion no puede ser anterior a la hora de inicio'
                            }
                            return true;
                        } })}

                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.hora_finCancel && <span className="text-red-500">{errors.hora_finCancel.message}</span>}

                    </div>
                </div>
                
            </div>
            <br />

            <br />

            <div style={{display: 'flex',flexWrap: 'nowrap',justifyContent: 'center', alignItems: 'flex-end'}}>
                <Stack direction="row" spacing={6}>
                <Button variant="contained" type="summit">
                Guardar
                </Button>
                <Button variant="contained" style={{backgroundColor:'gray'}} onClick={() => navigate('/admin/cancelaciones')}>
                Regresar
                </Button>
                </Stack>
            </div>
            <br />
            
    
        </form>
    )
    
}

export default FormCancelacionExcepcionalModificar;