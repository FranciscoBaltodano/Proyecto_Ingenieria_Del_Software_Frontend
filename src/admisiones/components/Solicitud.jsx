import React from 'react';
import { centros } from '../data/centros';
//import { useForm } from 'react-hook-form';
//import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box } from '@mui/material';




export const Solicitud = () => {
    
function centrosR() {
  var select = document.getElementById('centro-regional');

  // Recorrer el arreglo de objetos del JSON
  for (var i = 0; i < centros.length; i++) {
    // Crear una nueva opción para el Select
    var option = document.createElement('option');
    // Establecer el valor y texto de la opción
    option.value = centros[i].valor;
    option.textContent = centros[i].texto;
    // Agregar la opción al Select
    select.appendChild(option);
  }
}


return (

      <div className="p-6 bg-card text-card-foreground flex flex-col rounded-lg shadow-md max-w-4xl mx-auto items-center w-11/12">
        <h1 className="text-xl font-bold">Llena la solicitud de inscripción</h1>
        <p className="text-muted-foreground">Completa todos los campos y se parte de nuestra comunidad</p>
        <div className="my-4 border-t border-border"></div>
        <h2 className="text-lg font-semibold">Datos Generales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="numero-identidad" className="block font-medium">Numero De Identidad</label>
            <input required id="numero-identidad" type="number" placeholder="Ingrese su numero de identidad" pattern="\d{13}" className="w-full p-2 border border-input rounded"/>
          </div>
          <div>
            <label htmlFor="primer-nombre" className="block font-medium">Primer Nombre</label>
            <input required id="primer-nombre" type="text" placeholder="Ingrese su primer nombre" className="w-full p-2 border border-input rounded"/>
          </div>
          <div>
            <label htmlFor="segundo-nombre" className="block font-medium">Segundo Nombre</label>
            <input id="segundo-nombre" type="text" placeholder="Ingrese su segundo nombre" className="w-full p-2 border border-input rounded"/>
          </div>
          <div>
            <label required htmlFor="primer-apellido" className="block font-medium">Primer Apellido</label>
            <input id="primer-apellido" type="text" placeholder="Ingrese su primer apellido" className="w-full p-2 border border-input rounded"/>
          </div>
          <div>
            <label htmlFor="segundo-apellido" className="block font-medium">Segundo Apellido</label>
            <input id="segundo-apellido" type="text" placeholder="Ingrese su segundo apellido" className="w-full p-2 border border-input rounded"/>
          </div>
          <div>
            <label htmlFor="correo-electronico" className="block font-medium">Correo Electronico</label>
            <input id="correo-electronico" type="email" placeholder="Ingrese su correo electronico" className="w-full p-2 border border-input rounded" />
          </div>
          {/* <div>
            <label htmlFor="confirma-correo" className="block font-medium">Confirma Tu Correo Electronico</label>
            <input id="confirma-correo" type="email" placeholder="Confirma tu correo" className="w-full p-2 border border-input rounded"/>
          </div> */}
        </div>
        <div className="my-4 border-t border-border"></div>
        <h2 className="text-lg font-semibold">Datos De Carrera Y Centro Regional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="centro-regional" className="block font-medium" id='centro-regional'>Centro Regional</label>
            <select id='centro-regional' className="w-full p-2 border border-input rounded placeholder:slecciona" onClick={centrosR} >
              <option value="" disabled selected>{'Elegir'}</option>
              <option value="UNAH-CU">UNAH-CU</option>
            </select>
          </div>
          <div>
            <label htmlFor="carrera-principal" className="block font-medium">Carrera Principal</label>
            <select id="carrera-principal" className="w-full p-2 border border-input rounded">
            <option value="" disabled selected>{'Elegir'}</option>
            </select>
          </div>
          <div>
            <label htmlFor="carrera-secundundefined" className="block font-medium">Carrera Secundaria</label>
            <select id="carrera-secundundefined" className="w-full p-2 border border-input rounded">
            <option value="" disabled selected>{'Elegir'}</option>
            </select>
          </div>
        </div>
        <div className="my-4 border-t border-border"></div>
        <h2 className="text-lg font-semibold">Subida De Certificado De Estudio</h2>
        <div className="mt-4">
          <label htmlFor="certificado-secundundefined" className="block font-medium">Suba Una Foto De Su Certificado De Estudio De Secundundefined</label>
          <div className="flex items-center mt-2">
            <input id="certificado-secundundefined" type="file" accept="image/*" className="flex-grow p-2 border border-input rounded"/>
            <button className="ml-2 bg-primary text-primary-foreground p-2 rounded">Subir Foto</button>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button id='subir-foto' className="bg-primary text-primary-foreground p-2 rounded" onClick={handleSubirFoto}>Enviar Formulario</button>
        </div>
      </div>

      
      
);

function handleSubirFoto() {
  const botonSubirFoto = document.getElementById('subir-foto');
  const inputCertificado = document.getElementById('certificado-secundundefined');

  botonSubirFoto.addEventListener('click', () => {
    // Aquí puedes acceder al contenido del input:
    const contenidoInput = inputCertificado.value;
    console.log('Contenido del input:', contenidoInput);
    // Aquí puedes enviar el contenido a través de una solicitud HTTP o realizar otras acciones según tus necesidades.
  });
}

function centros() {
  var select = document.getElementById('centro-regional');

  // Recorrer el arreglo de objetos del JSON
  for (var i = 0; i < centros.length; i++) {
    // Crear una nueva opción para el Select
    var option = document.createElement('option');
    // Establecer el valor y texto de la opción
    option.value = centros[i].valor;
    option.textContent = centros[i].texto;
    // Agregar la opción al Select
    select.appendChild(option);
  }
}


}


