import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph } from 'docx';
import { Dropdown } from 'react-bootstrap';

const ExportButton = ({ orders }) => {
  // Export orders to Excel format
  const exportToExcel = () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      console.error('No valid orders data to export.');
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(orders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(data, "orders.xlsx");
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  // Export orders to Word format
  const exportToDoc = async () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      console.error('No valid orders data to export.');
      return;
    }

    try {
      const doc = new Document();
      orders.forEach(order => {
        doc.addSection({
          children: [
            new Paragraph({ text: `Order Number: ${order.orderNumber}`, bold: true }),
            new Paragraph(`Status: ${order.status}`),
            new Paragraph(`Date: ${new Date(order.date).toLocaleDateString()}`),
            new Paragraph(`Total Amount: $${order.total_amount.toFixed(2)}`),
            new Paragraph(`Shipping Address: ${order.shipping_address}`),
            new Paragraph(`Products:`),
            ...order.products.map(product => 
              new Paragraph(`- Product ID: ${product.product_id}, Quantity: ${product.quantity}`)
            ),
            new Paragraph(" "),
          ]
        });
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "orders.docx");
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
        Export Orders
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
