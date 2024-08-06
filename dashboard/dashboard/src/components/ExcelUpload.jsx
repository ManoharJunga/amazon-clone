// src/components/ExcelUpload.jsx
import React, { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';

const ExcelUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = () => {
    if (file) {
      ExcelRenderer(file, (err, resp) => {
        if (err) {
          console.error('Error reading Excel file:', err);
        } else {
          onFileUpload(resp);
        }
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn btn-primary mt-2">
        Upload Excel
      </button>
    </div>
  );
};

export default ExcelUpload;
