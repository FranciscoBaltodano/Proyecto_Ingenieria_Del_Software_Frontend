import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SessionManager = ({ children }) => {
  const navigate = useNavigate();
  const inactivityTimeout = 15 * 60 * 1000; // 30 minutos en milisegundos

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logout, inactivityTimeout);
    };

    const handleBeforeUnload = () => {
      logout();
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