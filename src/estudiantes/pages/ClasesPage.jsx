import React from "react";
import { ClasesList } from "../components/ClasesList";
import { ClasesLayout } from "../layout/ClasesLayout";

export const ClasesPage = () => {
  return (
    <ClasesLayout titulo='Mis Clases'>
      <ClasesList/>
    </ClasesLayout>
  );
};