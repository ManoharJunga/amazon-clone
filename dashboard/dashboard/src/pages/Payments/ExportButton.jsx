import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph } from 'docx';
import { Dropdown } from 'react-bootstrap';

const ExportButton = ({ payments }) => {
  // Export payments to Excel format
  const exportToExcel = () => {
    if (!Array.isArray(payments) || payments.length === 0) {
      console.error('No valid payments data to export.');
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(payments);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(data, "payments.xlsx");
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  // Export payments to Word format
  const exportToDoc = async () => {
    if (!Array.isArray(payments) || payments.length === 0) {
      console.error('No valid payments data to export.');
      return;
    }

    try {
      const doc = new Document();
      payments.forEach(payment => {
        doc.addSection({
          children: [
            new Paragraph({ text: `Payment ID: ${payment._id}`, bold: true }),
            new Paragraph(`Amount: $${payment.amount.toFixed(2)}`),
            new Paragraph(`Payment Method: ${payment.payment_method}`),
            new Paragraph(`Status: ${payment.payment_status}`),
            new Paragraph(`Date: ${new Date(payment.payment_date).toLocaleDateString()}`),
            new Paragraph(" "),
          ]
        });
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "payments.docx");
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
    }
  };

  // Handle export action based on the selected option
  const handleExport = (option) => {
    if (option === 'excel') {
      exportToExcel();
    } else if (option === 'doc') {
      exportToDoc();
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Export Payments
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleExport('excel')}>
          Export to Excel
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleExport('doc')}>
          Export to Word
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExportButton;
