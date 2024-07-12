// AdmisionesRoutes.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { InicioPage } from '../pages/InicioPage';
import { OfertaPage } from '../pages/OfertaPage';
import { InscripcionesPage } from '../pages/InscripcionesPage';
import {ResultadoInscripcionesPage} from '../pages/ResutadosInscripcionesPage';
import { SolicitudPage } from '../pages/SolicitudPage';

export const AdmisionesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioPage />} />
      <Route path="oferta" element={<OfertaPage />} />
      <Route path="inscripciones" element={<InscripcionesPage />} />
      <Route path="solicitud" element={<SolicitudPage />} />
      <Route path= "resultado_inscripciones" element={<ResultadoInscripcionesPage/>}/>
      
      <Route path="/*" element={ <Navigate to='/' /> }/>
    </Routes>
  );
};

