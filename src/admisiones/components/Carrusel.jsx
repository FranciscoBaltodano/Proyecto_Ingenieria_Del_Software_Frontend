import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import carrusel1 from '/assets/admisiones/carrusel1.png';
import carrusel2 from '/assets/admisiones/carrusel2.png';
import carrusel3 from '/assets/admisiones/carrusel3.png';
import carrusel4 from '/assets/admisiones/carrusel4.png';
import carrusel5 from '/assets/admisiones/carrusel5.png';

const carruselItems = [carrusel1, carrusel2, carrusel3, carrusel4, carrusel5];

export const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carruselItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carruselItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carruselItems.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', mb: 4 }}>
      {carruselItems.map((item, index) => (
        <Box
          key={index}
          component="img"
          src={item}
          alt={`Carrusel ${index + 1}`}
          sx={{
            display: index === currentIndex ? 'block' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      ))}
      <IconButton
        onClick={handlePrev}
        sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', backgroundColor: '#ffffff88' }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', backgroundColor: '#ffffff88' }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

