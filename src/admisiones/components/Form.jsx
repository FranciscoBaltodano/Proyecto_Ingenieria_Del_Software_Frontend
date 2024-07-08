import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [centros, setCentros] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [image, setImage] = useState(null);
  const [submitError, setSubmitError] = useState(null);



  const onImageChange = (event) => {
    console.error(errors)
   
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    if (setImage) {
      setImage(setImage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [centrosRes, carrerasRes] = await Promise.all([
          axios.get('http://localhost:3000/api/admisiones/centros'),
          axios.get('http://localhost:3000/api/admisiones/carreras')
        ]);
       
        setCentros(centrosRes.data);
        setCarreras(carrerasRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitMessage('');
    setSubmitError(null);

    try {
      let imagen_url = '';
      let input1 = document.getElementById("id_Carrera").value;
      let input2 = document.getElementById("id_Sd_Carrera").value;

      if (input1 === input2) {
        setSubmitMessage('Elige carreras diferentes.');
        return false;
      }
      if (data.certificado[0]) {
        const formData = new FormData();
        formData.append('file', data.certificado[0]);
        formData.append('upload_preset', 'ml_proyecto'); // Reemplaza 'your_upload_preset' con tu preset de Cloudinary

        const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, 
             formData
        );

        imagen_url = cloudinaryRes.data.secure_url;
      }

      const admisionData = { ...data, certificado: imagen_url };
      const response = await axios.post('http://localhost:3000/api/admisiones', admisionData);
      setSubmitMessage('Solicitud de admisión enviada con éxito.');
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message) {
        setSubmitMessage(error.response.data.message);
      } else {
        setSubmitMessage('Error al enviar la solicitud. Por favor, intente de nuevo.');
      }
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
   
  };

  return (
    <div className="p-6 bg-card text-card-foreground flex flex-col rounded-lg shadow-md justify-between items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold">Llena la solicitud de inscripción</h1>
        <p className="text-muted-foreground">Completa todos los campos y se parte de nuestra comunidad</p>
        <div className="my-4 border-t border-border"></div>
        <h2 className="text-lg font-semibold">Datos Generales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
          <div>
            <label htmlFor="dni" className="block font-medium">Numero De Identidad</label>
            <input
              id="dni"
              type="text"
              placeholder="Ingrese su numero de identidad"
              {...register("dni", { required: "DNI es requerido", pattern: { value: /^\d{13}$/, message: "DNI debe tener 13 dígitos" } })}
              className="w-full p-2 border border-input rounded"
            />
            {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
          </div>
          <div>
            <label htmlFor="primer_Nombre" className="block font-medium">Primer Nombre</label>
            <input
              id="primer_Nombre"
              type="text"
              placeholder="Primer nombre"
              {...register("primer_Nombre", { required: "Primer nombre es requerido" })}
              className="w-full p-2 border border-input rounded"
            />
            {errors.primer_Nombre && <span className="text-red-500">{errors.primer_Nombre.message}</span>}
          </div>
          <div>
            <label htmlFor="segundo_Nombre" className="block font-medium">Segundo Nombre</label>
            <input
              id="segundo_Nombre"
              type="text"
              placeholder="Segundo nombre"
              {...register("segundo_Nombre")}
              className="w-full p-2 border border-input rounded"
            />
          </div>
          <div>
            <label htmlFor="primer_Apellido" className="block font-medium">Primer Apellido</label>
            <input
              id="primer_Apellido"
              type="text"
              placeholder="Ingrese su primer apellido"
              {...register("primer_Apellido", { required: "Primer apellido es requerido" })}
              className="w-full p-2 border border-input rounded"
            />
            {errors.primer_Apellido && <span className="text-red-500">{errors.primer_Apellido.message}</span>}
          </div>
          <div>
            <label htmlFor="segundo_Apellido" className="block font-medium">Segundo Apellido</label>
            <input
              id="segundo_Apellido"
              type="text"
              placeholder="Ingrese su segundo apellido"
              {...register("segundo_Apellido")}
              className="w-full p-2 border border-input rounded"
            />
          </div>
          <div>
            <label htmlFor="correo_electronico" className="block font-medium">Correo Electronico</label>
            <input
              id="correo_electronico"
              type="email"
              placeholder="Ingrese su correo electronico"
              {...register("email", { required: "Correo electrónico es requerido", pattern: { value: /^\S+@\S+$/i, message: "Correo electrónico inválido" } })}
              className="w-full p-2 border border-input rounded"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
        </div>
        <div className="my-4 border-t border-border"></div>
        <h2 className="text-lg font-semibold">Datos De Carrera Y Centro Regional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="id_Centro" className="block font-medium">Centro Regional</label>
            <select
              id="id_Centro"
              {...register("id_Centro", { required: "Centro regional es requerido" })}
              className="w-full p-2 border border-input rounded"
            >
              <option value="" disabled selected>Elegir</option>
              {centros.map(centro => (
                <option key={centro.id_Centro} value={centro.id_Centro}>{centro.nombre}</option>
              ))}
            </select>
            {errors.id_Centro && <span className="text-red-500">{errors.id_Centro.message}</span>}
          </div>
          <div>
            <label htmlFor="id_Carrera" className="block font-medium">Carrera Principal</label>
            <select
              id="id_Carrera"
              {...register("id_Carrera", { required: "Carrera principal es requerida" })}
              className="w-full p-2 border border-input rounded"
            >
              <option value="" disabled selected>Elegir</option>
              {carreras.map(carrera => (
                <option key={carrera.id_Carrera} value={carrera.id_Carrera}>{carrera.nombre}</option>
              ))}
            </select>
            {errors.id_Carrera && <span className="text-red-500">{errors.id_Carrera.message}</span>}
          </div>
          <div>
            <label htmlFor="id_Sd_Carrera" className="block font-medium">Carrera Secundaria</label>
            <select
              id="id_Sd_Carrera"
              {...register("id_Sd_Carrera", { required: "Carrera secundaria es requerida" })}
              className="w-full p-2 border border-input rounded"
            >
              <option value="" disabled selected>Elegir</option>
              {carreras.map(carrera => (
                <option key={carrera.id_Carrera} value={carrera.id_Carrera}>{carrera.nombre}</option>
              ))}
            </select>
            {errors.id_Sd_Carrera && <span className="text-red-500">{errors.id_Sd_Carrera.message}</span>}
          </div>
        </div>
        <div className="my-4 border-t border-border"></div>
        <h2 className="text-lg font-semibold">Subida De Certificado De Estudio</h2>
        <div className="mt-4">
          <label htmlFor="certificado" className="block font-medium">Suba Una Foto De Su Certificado De Estudio De Secundaria</label>
          <div className="flex items-center mt-2 flex-col">
            <input
              
              id="certificado"
              type="file"
              accept="image/*,image/png,image/jpeg,image/jpg,.pdf"
              {...register("certificado", { required: "Certificado es requerido" })}
              className="flex-grow p-2 border border-input rounded"
              onChange={onImageChange}
            />
            {image && <img alt="preview image" src={image} />}
          </div>
          {errors.certificado && <span className="text-red-500">{errors.certificado.message}</span>}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-primary-foreground p-2 rounded disabled:bg-gray-400"
         
          >
            {isLoading ? 'Enviando...' : 'Enviar Formulario'}
          </button>
        </div>
      </form>
      {submitMessage && (
        <div className={`mt-4 p-2 ${submitMessage.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded`}>
          {submitMessage}
        </div>
      )}
    </div>
  );
};
