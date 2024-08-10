
import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    setUploading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_proyecto'); // Reemplaza con tu preset de Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error('Error al subir la imagen', error);
      setUploading(false);
    }
  };

  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
      <div>
        <h2>Cargar Imagen</h2>
        <input type="file" onChange={handleUpload} />
        {uploading && <p>Subiendo...</p>}
        {image && (
          <div>
            <Image publicId={image} width="300" />
            <p>URL de la Imagen: {image}</p>
          </div>
        )}
      </div>
    </CloudinaryContext>
  );
};

export default UploadImage;
// import React from 'react'

// const UploadImage = () => {
//   return (
//     <div>UploadImage</div>
//   )
// }

// export default UploadImage;