import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SessionManager = ({ children }) => {
  const navigate = useNavigate();
  const inactivityTimeout = 15 * 60 * 1000; // 15 minutos en milisegundos
  const isReloading = useRef(false);

  const logout = useCallback(() => {
    if (!isReloading.current) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logout, inactivityTimeout);
    };

    const handleBeforeUnload = () => {
      isReloading.current = true;
    };

    const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [logout, inactivityTimeout]);

  return <>{children}</>;
};

SessionManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SessionManager;
