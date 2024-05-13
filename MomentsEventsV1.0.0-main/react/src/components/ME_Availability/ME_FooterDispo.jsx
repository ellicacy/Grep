import React from 'react';

const Footer = ({ onClose }) => {
  return (
    <div className="footer">
      <button onClick={onClose}>Fermer</button>
      <style>{`
        .footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 10px;
          background-color: #f0f0f0;
        }

        button {
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Footer;
