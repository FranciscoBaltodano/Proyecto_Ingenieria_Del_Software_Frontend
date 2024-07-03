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
      <div className='flex flex-col justify-center items-start w-8/12'>
      <p>Estimado aspirante:
A continuación, te presentamos un instructivo con todos los pasos
 que deberás seguir para poder realizar tu proceso de inscripción
 exitosamente.  <br /> 
 Lo primero que debes hacer antes de iniciar la inscripción es 
leer este y los demás instructivos que te estamos presentando 
a fin de que no cometas errores durante la inscripción.</p>
        <br />
          
          <strong>
        
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
        <br />
        <p>Recuerda que la información que ingreses debe ser verídica y 
          completa, ya que de lo contrario no podrás continuar con el proceso 
          de inscripción. Una vez realizado presiona el botón ENVIAR DATOS.</p>
        <br />
        <p>Una vez que hayas ingresado toda la información solicitada, 
          te aparecerá un mensaje de confirmación en la pantalla, 
          lo que significa que tu inscripción ha sido exitosa. Se te enviará una notificación
          por correo con tu credencial una vez se hayan validado tus datos.
          De igual manera se te notificará si tu imagen no cumple con el formato requerido.</p>
          <br />

          <p> <strong className='text-red-700'>IMPORTANTE: </strong> La notificación del correo con tu credencial DIGITAL
            será enviada a la dirección de correo que ingresaste en el formulario de inscripción.Debes permanecer pendiente
            ya que con ella te identificaremos durante las pruebas de admisión en los centros regionales.
            <br />
            Los siguientes documentos te resultarán utiles para tu proceso de inscripción:
          </p>

          <br />

          <p>En este enlace encontraras la guía de estudio para la PAA <a className='text-blue-700' href="https://admisiones.unah.edu.hn/assets/Guia-estudio-nueva-2022/Guia-de-estudios-PAA.pdf"> Guía de estudio </a></p>
          <br />
          <p>En este enlace encontraras el temario para la PCCNS <a className='text-blue-700' href="https://admisiones.unah.edu.hn/dmsdocument/8661-prueba-de-conocimiento-de-ciencias-naturales-y-de-la-salud-pdf"> Temario PCCNS </a></p>

          <br />

          <p>Algunas recomendaciones que le brindamos al estudiante son las siguientes:</p>
          <ul className='list-none pl-12'>
          <li>- Leer detenidamente la guía de estudio de la PAA</li>
          <li>- Familiarizarse con el orden de cada parte y conocer los distintos tipos de ejercicio </li>
          <li>- Estudiar los ejemplos de cada parte y sus explicaciones.</li>
          <li>- Prestar atención y practicar cómo completar los ejercicios de suplir la respuesta en la prueba de matemáticas..</li>
          <li>- Seguir las instrucciones específicas que brinda la guía para contestar los ejercicios</li>
      
        </ul>
        </div>

        <br />
        <p><strong> ¡Te deseamos éxito en tu proceso! </strong>  </p>
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
