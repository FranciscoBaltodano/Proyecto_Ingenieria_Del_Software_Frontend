// src/services/NoticiasServices.jsx
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin/noticias';

export const fetchNoticias = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('Error fetching noticias:', error);
    throw error;
  }
};

export const createNoticia = async (noticiaData) => {
  try {
    const res = await axios.post(API_URL, noticiaData
      // , {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   }
      // }
    );
    return res.data;
  } catch (error) {
    console.error('Error creating noticia:', error);
    throw error;
  }
};

// NoticiasServices.js
export const updateNoticia = async (id, noticiaData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, noticiaData
      // , {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   }
      // }
    );
      console.log('Respuesta del servidor para actualizar noticia:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error al actualizar noticia:', error);
      throw error;
    }
  };
  

export const deleteNoticia = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting noticia:', error);
    throw error;
  }
};

export const fetchNoticiaById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching noticia by id:', error);
    throw error;
  }
};
