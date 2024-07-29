import React from 'react';
import PropTypes from 'prop-types';
const DownloadStudents = ({ seccionId }) => {
  // Add prop validation
  DownloadStudents.propTypes = {
    seccionId: PropTypes.number.isRequired,
  };
  
const DownloadStudents = ({ seccionId }) => {

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/teacher/estudiantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seccion: seccionId }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener los estudiantes de la sección');
      }

      const data = await response.json();

      // Seleccionar la carpeta de descarga
      const directoryHandle = await window.showDirectoryPicker();
      const fileHandle = await directoryHandle.getFileHandle('students.json', { create: true });
      const writable = await fileHandle.createWritable();

      // Escribir el archivo en la carpeta seleccionada
      await writable.write(JSON.stringify(data.data, null, 2));
      await writable.close();

      alert('Archivo descargado exitosamente');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al obtener los estudiantes de la sección');
    }
  };

  return (
    <div>
      <h1>Descargar Lista de Estudiantes</h1>
      <button onClick={fetchStudents}>Descargar Lista</button>
    </div>
  );
};

// ! De esta forma llamamos el componente

// import React from 'react';
// import ReactDOM from 'react-dom';
// import DownloadStudents from './DownloadStudents';

// const App = () => {
//   const seccionId = 1; // Reemplaza esto con el ID de la sección que necesitas

//   return (
//     <div>
//       <DownloadStudents seccionId={seccionId} />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));


export default DownloadStudents;
