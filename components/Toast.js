import React from 'react';

const Toast = ({ show, message, type = 'info', onClose }) => {
  if (!show) return null;
  return (
    <div className={`toast align-items-center text-bg-${type} border-0 show position-fixed top-0 end-0 m-4`} role="alert" aria-live="assertive" aria-atomic="true" style={{ zIndex: 9999, minWidth: 280 }}>
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Fechar" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default Toast;
