import React, {useEffect, useState} from 'react';
import { Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const FormMatriculaModificar =()=>{

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const [minDate, setMinDate] = useState('');
    const [matricula, setMatricula] = useState([]);
    const [pac, setPac] = useState([]);
    const navigate = useNavigate();
    const [matriculaSeleccionada, setMatriculaSeleccionada] = useState(null);
    const { id } = useParams();


    useEffect (()=>{
        const fechaActual = new Date().toISOString().split('T')[0]
        setMinDate(fechaActual);
    },[setValue]);
    
      
    const fechaInicioPAC = watch('fecha_inicioPAC');
    const fechaFincPAC = watch('fecha_finPAC');
    const fechaInicioPACMatri = watch('fecha_inicioMatri');
    const fechaFinPACMatri = watch('fecha_finMatri')
    const horaInicio = watch('hora_inicioMatri');
    const fechaMatri1 = watch('fecha_matri1');
    const fechaMatri2 = watch('fecha_matri2');
    const fechaMatri3 = watch('fecha_matri3');
    const fechaMatri4 = watch('fecha_matri4');
    const fechaMatri5 = watch('fecha_matri5');
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [pacRes, matriculaRes, matriculaSeleccionadaRes] = await Promise.all([
              axios.get('http://localhost:3000/api/admin/pac'),
              axios.get('http://localhost:3000/api/admin/tipo_matricula'),
              axios.get(`http://localhost:3000/api/admin/matricula_filtro/${id}`)
            ]);
            setPac(pacRes.data);
            setMatricula(matriculaRes.data);
            setMatriculaSeleccionada(matriculaSeleccionadaRes.data);
    
            // Establecer los valores iniciales del formulario
            Object.keys(matriculaSeleccionadaRes.data).forEach(key => {
              setValue(key, matriculaSeleccionadaRes.data[key]);
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    
        const fechaActual = new Date().toISOString().split('T')[0];
        setMinDate(fechaActual);
      }, [id, setValue]);
    
      const onSubmit = async (data) => {
        console.log('Datos enviados:', data);
        try {
          const response = await axios.put(`http://localhost:3000/api/admin/configuraciones/${id}`, data);
          if (response.status === 200) {
            console.log('Configuración actualizada exitosamente');
            navigate('/admin/matricula');
          }
        } catch (error) {
          console.error('Error updating configuration:', error.response?.data || error);
        }
      };

      if (!matriculaSeleccionada) {
        return <div>Cargando...</div>;
      }

    return (
        
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3" style={{ justifyContent: 'center' }}>
        <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
          <Typography variant="h7" component="h1" gutterBottom>
            Selecciona el tipo de matricula
          </Typography>
          <select
            id="id_TipoMatricula"
            className="w-full p-2 border border-black rounded"
            {...register("id_TipoMatricula", { required: "Necesita seleccionar el tipo de matricula" })}
          >
            {matricula.map(matri => (
              <option key={matri.id_TipoMatricula} value={matri.id_TipoMatricula}>{matri.tipoMatricula}</option>
            ))}
          </select>
          {errors.id_TipoMatricula && <span className="text-red-500">{errors.id_TipoMatricula.message}</span>}
        </div>
      </div>
      <br />
      <Divider sx={{ marginBottom: 2 }} />
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3" style={{ justifyContent: 'space-evenly' }}>
        <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
          <Typography variant="h7" component="h1" gutterBottom>
            Seleccione el PAC
          </Typography>
          <select
            id="id_Pac"
            className="w-full p-2 border border-black rounded"
            {...register("id_Pac", { required: "Necesita seleccionar un PAC" })}
          >
            {pac.map(pacAno => (
              <option key={pacAno.id_Pac} value={pacAno.id_Pac}>{pacAno.pac}</option>
            ))}
          </select>
          {errors.id_Pac && <span className="text-red-500">{errors.id_Pac.message}</span>}
        </div>

                
                <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de inicio PAC 
                </Typography>
                <input id="fecha_inicioPAC" type='date' defaultValue={matriculaSeleccionada.fecha_inicioPAC}
                    {...register("fecha_inicioPAC", {required:"Fecha de inicio PAC requerida" })}
                    min={minDate}
                    className="w-full p-2 border border-black rounded" />
                    {errors.fecha_inicioPAC && <span className="text-red-500">{errors.fecha_inicioPAC.message}</span>}
                </div>
                <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de fin PAC
                </Typography>
                <input id="fecha_finPAC" type="date" defaultValue={matriculaSeleccionada.fecha_finPAC}
                    {...register("fecha_finPAC", {required:"Fecha de fin PAC requerida" , 
                        validate: value=>{
                            if (value<fechaInicioPAC){
                                return 'La fecha de fin no puede ser anterior a la fecha actal'
                            }
                            if (value<minDate){
                                return'No puedes seleccionar una fecha anterior a la fecha actual'
                            }
                            return true;
                        }})}
                    min={minDate} 
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_finPAC && <span className="text-red-500">{errors.fecha_finPAC.message}</span>}

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 " style={{ justifyContent: 'space-evenly'  }}>
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de inicio matricula 
                </Typography>
                <input id="fecha_inicioMatri" type="date" defaultValue={matriculaSeleccionada.fecha_inicioMatri}
                    {...register("fecha_inicioMatri", {required:"Fecha de incio matricula requerida"  })}
                    min={fechaInicioPAC} max={fechaFincPAC}
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_inicioMatri && <span className="text-red-500">{errors.fecha_inicioMatri.message}</span>}

                </div>
                <div className=" xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha de fin matricula
                </Typography>
                <input id="fecha_finMatri" type="date" defaultValue={matriculaSeleccionada.fecha_finMatri}
                    {...register("fecha_finMatri", {required:"Fecha de fin matricula requerida"} )}
                    min={fechaInicioPAC} max={fechaFincPAC }
                    className="w-full p-2 border border-black rounded"/>
                    
                    {errors.fecha_finMatri && <span className="text-red-500">{errors.fecha_finMatri.message}</span>}

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1  lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    <div  >
                        <Typography variant="h7" component="h1" gutterBottom>
                        Hora inicio matricula
                        </Typography>
                        <input id="hora_inicioMatri" type="time" defaultValue={matriculaSeleccionada.hora_inicioMatri}
                            {...register("hora_inicioMatri", {required:"Hora de inicio matricula requerida" })}

                            className=" w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                            <br />
                            {errors.hora_inicioMatri && <span className="text-red-500">{errors.hora_inicioMatri.message}</span>}

                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Hora fin matricula
                    </Typography>
                    <input id="hora_finMatri" type="time" defaultValue={matriculaSeleccionada.hora_finMatri}
                        {...register("hora_finMatri", {required:"Hora de fin matricula requerida", validate: value=>{
                            if (value<horaInicio){
                                return 'La hora de finalizacion no puede ser anterior a la hora de inicio'
                            }
                            return true;
                        } })}

                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.hora_finMatri && <span className="text-red-500">{errors.hora_finMatri.message}</span>}

                    </div>
                </div>
                
            </div>
            <br />
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h7" component="h1" gutterBottom>
            Horarios matricula por indice:
            </Typography>
            <Typography variant="h7" component="h1" gutterBottom>
            Excelencia academica y primer ingreso ( 1000 a 1600)
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 ">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha matricula 
                </Typography>
                <input id="fecha_matri1" type="date" defaultValue={matriculaSeleccionada.fecha_matri1}
                    {...register("fecha_matri1", {required:"Fecha de matricula requerida" , 
                        validate: value=>{
                            if (value==fechaMatri2 || value==fechaMatri3 || value==fechaMatri4 || value==fechaMatri5){
                                return'Debe seleccionar una fecha diferente a la actual, esta ya esta ocupada'
                            }
                            return true;
                        }
                    })}
                    min={fechaInicioPACMatri} max={fechaFinPACMatri }
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_matri1 && <span className="text-red-500">{errors.fecha_matri1.message}</span>}

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    
                    <div  >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_desdeMatri1" type="text"  defaultValue={matriculaSeleccionada.indice_desdeMatri1}
                        {...register("indice_desdeMatri1", {required:"Requiere un indice inicial", min:{
                            value:0, message:"No puede ser menor que 0"
                        },pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }
                        
                        })}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12  md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_desdeMatri1 && <span className="text-red-500">{errors.indice_desdeMatri1.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_hastaMatri1"  type="text" defaultValue={matriculaSeleccionada.indice_hastaMatri1}
                        {...register("indice_hastaMatri1", {required:"Requiere un indice final", min:{
                            value:0, message:"No puede ser menor que 0"
                        },validate: { 
                            greaterThanStart: (value) => value >= parseInt(document.getElementById('indice_desdeMatri1').value) || 'El rango final de indice no puede ser menor que el inicial'
                         },
                         pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:3, message:"El numero no puede tener mas de 3 digitos"
                        } })}
                        maxLength="3"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_hastaMatri1 && <span className="text-red-500">{errors.indice_hastaMatri1.message}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Primer Ingreso PAA
                    </Typography>
                    <input id="pIngreso_desdeMatri1" type="text" defaultValue={matriculaSeleccionada.pIngreso_desdeMatri1}
                        {...register("pIngreso_desdeMatri1", {required:"Requiere un puntaje inicial", min:{
                            value:0, message:"No puede ser menor que 0"
                        }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:3, message:"El numero no puede tener mas de 3 digitos"
                        } })}
                        maxLength="3"

                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.pIngreso_desdeMatri1 && <span className="text-red-500">{errors.pIngreso_desdeMatri1.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Primer Ingreso PAA
                    </Typography>
                    <input id="pIngreso_hastaMatri1" type="text" defaultValue={matriculaSeleccionada.pIngreso_hastaMatri1}
                        {...register("pIngreso_hastaMatri1", {required:"Requiere un puntaje final" ,  min:{
                            value:0, message:"No puede ser menor que 0"
                        },
                        validate: { greaterThanStart: (value) => value >= parseInt(document.getElementById('pIngreso_desdeMatri1').value) || 'El rango final de indice no puede ser menor que el inicial'

                        },
                        pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:4, message:"El numero no puede tener mas de 4 digitos"
                        }})}
                        maxLength="4"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.pIngreso_hastaMatri1 && <span className="text-red-500">{errors.pIngreso_hastaMatri1.message}</span>}
                    </div>
                </div>           
            </div>
            <br />
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h7" component="h1" gutterBottom>
                Estudiantes general y primer ingreso ( 0 a 999)
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 ">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha matricula 
                </Typography>
                <input id="fecha_matri2" type="date" defaultValue={matriculaSeleccionada.fecha_matri2}
                    {...register("fecha_matri2", {required:"Fecha de matricula requerida",
                        validate: value=>{
                        if (value==fechaMatri1 || value==fechaMatri3 || value==fechaMatri4 || value==fechaMatri5){
                            return'Debe seleccionar una fecha diferente a la actual, esta ya esta ocupada'
                        }
                        return true;
                    }

                    })}
                    min={fechaInicioPACMatri} max={fechaFinPACMatri }
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_matri2 && <span className="text-red-500">{errors.fecha_matri2.message}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input  id="indice_desdeMatri2" type="text" defaultValue={matriculaSeleccionada.indice_desdeMatri2}
                        {...register("indice_desdeMatri2", {required:"Requiere un indice inicial", min:{
                            value:0, message:"No puede ser menor que 0"
                        }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        } })}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_desdeMatri2 && <span className="text-red-500">{errors.indice_desdeMatri2.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_hastaMatri2" type="text" defaultValue={matriculaSeleccionada.indice_hastaMatri2}
                        {...register("indice_hastaMatri2", {required:"Requiere un indice final", min:{
                            value:0, message:"No puede ser menor que 0"
                        },validate: { 
                            greaterThanStart: (value) => value >= parseInt(document.getElementById('indice_desdeMatri2').value) || 'El rango final de indice no puede ser menor que el inicial'
                         } , pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }})}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_hastaMatri2 && <span className="text-red-500">{errors.indice_hastaMatri2.message}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Primer Ingreso PAA
                    </Typography>
                    <input id="pIngreso_desdeMatri2" type="text" defaultValue={matriculaSeleccionada.pIngreso_desdeMatri2}
                        {...register("pIngreso_desdeMatri2", {required:"Requiere un puntaje inicial" , min:{
                            value:0, message:"No puede ser menor que 0"
                        }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:3, message:"El numero no puede tener mas de 3 digitos"
                        }})}
                        maxLength="3"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.pIngreso_desdeMatri2 && <span className="text-red-500">{errors.pIngreso_desdeMatri2.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Primer Ingreso PAA
                    </Typography>
                    <input id="pIngreso_hastaMatri2" type="text" defaultValue={matriculaSeleccionada.pIngreso_hastaMatri2}
                        {...register("pIngreso_hastaMatri2", {required:"Requiere un puntaje final" , min:{
                            value:0, message:"No puede ser menor que 0"
                        }, 
                        validate: { greaterThanStart: (value) => value >= parseInt(document.getElementById('pIngreso_desdeMatri2').value) || 'El rango final de indice no puede ser menor que el inicial'
                        },
                        pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:3, message:"El numero no puede tener mas de 3 digitos"
                        }})}
                        maxLength="3"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.pIngreso_hastaMatri2 && <span className="text-red-500">{errors.pIngreso_hastaMatri2.message}</span>}
                    </div>
                </div>           
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 ">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha matricula 
                </Typography>
                <input id="fecha_matri3" type="date"  defaultValue={matriculaSeleccionada.fecha_matri3}
                    {...register("fecha_matri3", {required:"Fecha de matricula requerida", 
                        validate: value=>{
                            if (value==fechaMatri1 || value==fechaMatri2 || value==fechaMatri4 || value==fechaMatri5){
                                return'Debe seleccionar una fecha diferente a la actual, esta ya esta ocupada'
                            }
                            return true;
                        }
                    })}
                    min={fechaInicioPACMatri} max={fechaFinPACMatri }
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_matri3 && <span className="text-red-500">{errors.fecha_matri3.message}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_desdeMatri3" type="text"  defaultValue={matriculaSeleccionada.indice_desdeMatri3}
                        {...register("indice_desdeMatri3", {required:"Requiere un indice inicial" ,  min:{
                            value:0, message:"No puede ser menor que 0"
                        },pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }})}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_desdeMatri3 && <span className="text-red-500">{errors.indice_desdeMatri3.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_hastaMatri3" type="text"  defaultValue={matriculaSeleccionada.indice_hastaMatri3}
                        {...register("indice_hastaMatri3", {required:"Requiere un indice final" , min:{
                            value:0, message:"No puede ser menor que 0"
                        },validate: { 
                            greaterThanStart: (value) => value >= parseInt(document.getElementById('indice_desdeMatri3').value) || 'El rango final de indice no puede ser menor que el inicial'
                         }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }})}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_hastaMatri3 && <span className="text-red-500">{errors.indice_hastaMatri3.message}</span>}
                    </div>
                </div>         
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 ">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha matricula 
                </Typography>
                <input  id="fecha_matri4" type="date"  defaultValue={matriculaSeleccionada.fecha_matri4}
                    {...register("fecha_matri4", {required:"Fecha de matricula requerida" ,
                        validate: value=>{
                            if (value==fechaMatri2 || value==fechaMatri3 || value==fechaMatri1 || value==fechaMatri5){
                                return'Debe seleccionar una fecha diferente a la actual, esta ya esta ocupada'
                            }
                            return true;
                        }
                    })}
                    min={fechaInicioPACMatri} max={fechaFinPACMatri }
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_matri4 && <span className="text-red-500">{errors.fecha_matri4.message}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_desdeMatri4" type="text" defaultValue={matriculaSeleccionada.indice_desdeMatri4}
                        {...register("indice_desdeMatri4", {required:"Requiere un indice inicial" ,  min:{
                            value:0, message:"No puede ser menor que 0"
                        },pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }})}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_desdeMatri4 && <span className="text-red-500">{errors.indice_desdeMatri4.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_hastaMatri4" type="text" defaultValue={matriculaSeleccionada.indice_hastaMatri4}
                        {...register("indice_hastaMatri4", {required:"Requiere un indice final" , min:{
                            value:0, message:"No puede ser menor que 0"
                        },validate: { 
                            greaterThanStart: (value) => value >= parseInt(document.getElementById('indice_desdeMatri4').value) || 'El rango final de indice no puede ser menor que el inicial'
                         }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }})}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_hastaMatri4 && <span className="text-red-500">{errors.indice_hastaMatri4.message}</span>}
                    </div>
                </div>         
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
                <div className=" xl:w-10/12 lg:w-10/12 w-full md:w-10/12 ">
                <Typography variant="h7" component="h1" gutterBottom>
                Fecha matricula 
                </Typography>
                <input id="fecha_matri5" type="date" placeholder="Ingrese su numero de identidad" defaultValue={matriculaSeleccionada.fecha_matri5}
                    {...register("fecha_matri5", {required:"Fecha de matricula requerida" ,
                        validate: value=>{
                            if (value==fechaMatri2 || value==fechaMatri3 || value==fechaMatri4 || value==fechaMatri1){
                                return'Debe seleccionar una fecha diferente a la actual, esta ya esta ocupada'
                            }
                            return true;
                        }
                    })}
                    
                    min={fechaInicioPACMatri} max={fechaFinPACMatri }
                    className="w-full p-2 border border-black rounded"/>
                    {errors.fecha_matri5 && <span className="text-red-500">{errors.fecha_matri5.message}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                    
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_desdeMatri5" type="text" defaultValue={matriculaSeleccionada.indice_desdeMatri5}
                        {...register("indice_desdeMatri5", {required:"Requiere un indice inicial", min:{
                            value:0, message:"No puede ser menor que 0"
                        }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        } })}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_desdeMatri5 && <span className="text-red-500">{errors.indice_desdeMatri5.message}</span>}
                    </div>
                    <div >
                    <Typography variant="h7" component="h1" gutterBottom>
                    Indice matricula
                    </Typography>
                    <input id="indice_hastaMatri5" type="text" defaultValue={matriculaSeleccionada.indice_hastaMatri5}
                        {...register("indice_hastaMatri5", {required:"Requiere un indice final" , min:{
                            value:0, message:"No puede ser menor que 0"
                        },validate: { 
                            greaterThanStart: (value) => value >= parseInt(document.getElementById('indice_desdeMatri5').value) || 'El rango final de indice no puede ser menor que el inicial'
                         }, pattern:{
                            value:/^[0-9]*$/, message: "Solo se permiten numeros"
                        } ,
                        maxLength:{
                            value:2, message:"El numero no puede tener mas de 2 digitos"
                        }})}
                        maxLength="2"
                        className="w-full xl:w-8/12 lg:w-8/12 md:w-8/12 p-2 border border-black rounded"/>
                        <br />
                        {errors.indice_hastaMatri5 && <span className="text-red-500">{errors.indice_hastaMatri5.message}</span>}
                    </div>
                </div>         
            </div>
            <br />
            <br />

            <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Stack direction="row" spacing={6}>
                    <Button variant="contained" type="submit">
                        Guardar
                    </Button>
                    <Button variant="contained" style={{backgroundColor:'gray'}} onClick={() => navigate('/admin/matricula')}>
                        Cancelar
                    </Button>
                </Stack>
            </div>
            <br />
        </form>
    )

}
export default FormMatriculaModificar;