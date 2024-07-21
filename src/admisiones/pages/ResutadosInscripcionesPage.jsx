import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AdmisionesLayout } from '../layout/AdmisionesLayout'
import { ResultSearch } from '../components/ResultSearch';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '70%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius:'10px'
};
export const  ResultadoInscripcionesPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          <p>Estimado Aspirante: a continuación, podrá ver los resultados obtenidos en las pruebas: PAA y PCCNS,
             para lo cual necesitara ingresar su Número de Solicitud de Admisión y su Número de Identidad o Pasaporte 
            (tal y como lo ingresó al momento de realizar la inscripción).
          <br /> 
          </p>
          <br />
          
          <strong>
          
            <p>¿QUE HACER DESPUÉS DE CONOCER SUS LOS RESULTADOS?</p>
          </strong> 

          <br />
          <strong><p className='text-red-700'> SI FUE ADMITIDO:</p></strong> 
            <p>El paso siguiente es realizar el proceso de MATRICULA.
              <br />
              Para conocer los requisitos, fechas y pasos del proceso de matrícula debe estar pendiente de la publicación del calendario
              en la página web de la Dirección de Ingreso Permanencia y Promoción (DIPP-Registro)        
              La Matrícula debe realizarse directamente en la página de la Oficina de DIPP-Registro.
            </p>
            <br />
            <br />
            <strong><p className='text-red-700'> SI NO FUE ADMITIDO:</p></strong> 
              <p> Los aspirantes NO ADMITIDOS en ninguna carrera porque no alcanzaron el índice de admisión establecido para ingresar a la UNAH que es de 700 puntos o más,
              podrán volver a inscribirse para realizar nuevamente la PAA por segunda, tercera o cuarta vez.
            
              </p>
              <br />
              <p>El calendario de la próxima prueba de admisión está publicado en este sitio web.</p>
              <br />
              <p>La PAA solo se puede realizar un máximo de cuatro (4) veces</p>
              <br />
              <p>La PCCNS solo se puede realizar una (1) vez</p>
            
            
          </div>
  
          <br />
          <div>
              <Button onClick={handleOpen}>Ver Resultados</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ResultSearch/>
                </Box>
              </Modal>
            </div>
        </section>

        
        
      </AdmisionesLayout>
      
    );
    
}


