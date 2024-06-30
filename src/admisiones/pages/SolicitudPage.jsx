import React from 'react'
import { AdmisionesLayout } from '../layout/AdmisionesLayout'
import { Solicitud } from '../components/Solicitud'


export const  SolicitudPage = () => {
  return (
    <AdmisionesLayout className='flex flex-col'>
        <Solicitud />  
    </AdmisionesLayout>
  );
}

