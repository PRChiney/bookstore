import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: 8,
          zIndex: 9999,
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);