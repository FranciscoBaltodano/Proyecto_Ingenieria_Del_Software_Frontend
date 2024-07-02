import { AdmisionesLayout } from '../layout/AdmisionesLayout'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
/**
 * Componente que representa la página de inscripciones.
 * 
 * @returns {JSX.Element} El elemento JSX que representa la página de inscripciones.
 */

export const InscripcionesPage = () => {
  return (
    <AdmisionesLayout>
      <section className=''>
        <br />
        <div className='flex text-4xl justify-center items-center'>
          <strong><h1>INSCRIPCIONES PARA LAS PRUEBAS DE ADMISIÓN</h1></strong>
        </div>
        <br />
        <br />
      </section>

      <section className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center w-6/12'>
          <strong><p>Estimado aspirante:
A continuación, te presentamos un instructivo con todos los pasos
 que deberás seguir para poder realizar tu proceso de inscripción
 exitosamente.  <br /> 
 Lo primero que debes hacer antes de iniciar la inscripción es 
leer este y los demás instructivos que te estamos presentando 
a fin de que no cometas errores durante la inscripción.</p>
        <br />
        
        <p>Da clic en el botón de inscripción</p>

        <p className='pl-12'>Ingresa los datos que se te solicitan:</p>
        <ul className='list-none pl-12'>
          <li>- Nombre completo</li>
          <li>- Número de Identidad para hondureños </li>
          <li>- Correo electrónico PERSONAL, ACTIVO y CON ESPACIO 
              DISPOSABLE ya que será el medio de comunicación oficial 
            para notificaciones de tu proceso de inscripción y donde recibirás 
            la CREDENCIAL DIGITAL.</li>
          <li>- Centro Regional donde deseas realizar las pruebas de admisión.</li>
          <li>- Carrera que deseas estud iar.</li>
          <li>- Carrera secundaria</li>
          <li>- Fotografía de tu titulo de bachillerato</li>
      
        </ul>
        </strong>
        </div>

        <div>
          <br  />
          <br />  
        
        <Button variant='contained'>
          <NavLink to='/admisiones/solicitud'>
            Inscribirse
          </NavLink>
        </Button>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/SolicitudPage'}>
          Inscribirse
        </button> */}
        </div>



      </section>
      
    </AdmisionesLayout>
  )
}
