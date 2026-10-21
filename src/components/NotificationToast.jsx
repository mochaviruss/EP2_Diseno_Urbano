import React from 'react';

const NotificationToast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show position-fixed bottom-0 end-0 m-4 shadow-lg`} style={{ zIndex: 9999 }}>
      <strong>{type === 'success' ? '¡Éxito!' : 'Atención:'}</strong> {message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

export default NotificationToast;