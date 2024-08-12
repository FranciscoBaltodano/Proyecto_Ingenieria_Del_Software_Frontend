import React from 'react'
import { DocenteLayout } from '../../layout/DocenteLayout'
import SaveEXCEL from '../components/SaveEXCEL'
import SavePDF from '../components/SavePDF'

export const CargaAcademicaPage = () => {
  // const { id } = useParams();
  // const [departamento, setDepartamento] = useState({});


  return (
    <DocenteLayout titulo="Carga Academica">
    <div>CargaAcademicaPage</div>

    <SavePDF id_Departamento={12}/>
    <SaveEXCEL id_Departamento={12}/>
    </DocenteLayout>
  )
}
