import React from "react";
import { ClasesList } from "../components/ClasesList";
import { ClasesLayout } from "../layout/ClasesLayout";


import { SaveCertificadoVOAE } from "../components/SaveCertificadoVOAE";
import { useAuth } from "../../contexts/AuthContext";



export const ClasesPage = () => {


  const {user} = useAuth();

  return (
    <ClasesLayout titulo='Mis Clases'>


      <ClasesList/>
      <SaveCertificadoVOAE numeroCuenta={user.numeroCuenta}/>
    </ClasesLayout>
  );
};