// AdmisionesRoutes.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { InicioPage } from '../pages/InicioPage';
import { OfertaPage } from '../pages/OfertaPage';
import { InscripcionesPage } from '../pages/InscripcionesPage';
import { SolicitudPage } from '../pages/SolicitudPage';

export const AdmisionesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioPage />} />
      <Route path="oferta" element={<OfertaPage />} />
      <Route path="inscripciones" element={<InscripcionesPage />} />
      <Route path="/*" element={ <Navigate to='/admisiones/' /> }/>
      <Route path="solicitud" element={<SolicitudPage />} />
    </Routes>
  );
};

