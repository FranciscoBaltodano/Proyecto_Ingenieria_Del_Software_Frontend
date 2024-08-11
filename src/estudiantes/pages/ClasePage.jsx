import React, { useEffect, useMemo, useState } from 'react'
import { EstudianteLayout } from '../layout/EstudianteLayout'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export const ClasePage = () => {

  const { id } = useParams();
  const [seccion, setSeccion] = useState({});
  
  useEffect(() => {
    
    const fetchSeccion = async ()=> {

      try {
        const response = await axios.get(`http://localhost:3000/api/matricula/seccion/${id}`);
        setSeccion(response.data);
      } catch (error) {
        console.error("Error fetching seccion:", error);
      }
    }
    fetchSeccion();
  }, [id])

  console.log(seccion);


    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate( -1 );
    };;
  return (
    <EstudianteLayout titulo='clase'>
      <button 
          onClick={ onNavigateBack }    
      >
          Regresar
      </button>
      <div>ClasePage</div>
    </EstudianteLayout>
  )
}
