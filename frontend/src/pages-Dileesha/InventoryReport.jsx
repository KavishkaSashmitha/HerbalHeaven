import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button } from '@material-tailwind/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InventoryReport = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8070/inventory/viewInventoryItems')
      .then((result) => setItems(result.data))
      .catch((err) => console.log(err));
  }, []);

  const generatePDF = () => {
    const input = document.getElementById('report-container');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Set PDF dimensions to A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight); // Add image of table
      pdf.save('inventory_report.pdf');
    });
  };

  const generateReport = () => {
    const currentDate = new Date();

    const itemsNearExpiry = items.filter((item) => {
      const expiryDate = new Date(item.expiaryDate);
      const threeMonthsFromNow = new Date(currentDate);
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      return expiryDate <= threeMonthsFromNow;
    });

    const itemsNearReorderLevel = items.filter((item) => {
      const reorderThreshold = item.reorderLevel + 50;
      return (
        item.quantity <= reorderThreshold && item.quantity >= item.reorderLevel
      );
    });

    const itemsPassedReorderLevel = items.filter(
      (item) => item.quantity < item.reorderLevel
    );

    const generateTable = (
      tableItems,
      showQuantity = false,
      showExpiry = false,
      title
    ) => {
      return (
        <div className="mt-8">
          <Typography variant="h6" className="text-center font-bold text-xl">
            {title}
          </Typography>
          <table className="w-4/5 mx-auto mt-4 table-auto border border-gray-500">
            <thead>
              <tr className="bg-blue-300 text-gray-900 uppercase text-sm leading-normal">
                <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                  Product Name
                </th>
                {showQuantity && (
                  <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                    Quantity
                  </th>
                )}
                {showQuantity && (
                  <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                    Reorder Level
                  </th>
                )}
                {showExpiry && (
                  <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                    Expiry Date
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {tableItems.map((item) => (
                <tr key={item._id} className="bg-white">
                  <td className="py-2 px-3 border border-gray-500 text-lg">
                    {item.productName}
                  </td>
                  {showQuantity && (
                    <td className="py-2 px-3 border border-gray-500 text-lg">
                      {item.quantity}
                    </td>
                  )}
                  {showQuantity && (
                    <td className="py-2 px-3 border border-gray-500 text-lg">
                      {item.reorderLevel}
                    </td>
                  )}
                  {showExpiry && (
                    <td className="py-2 px-3 border border-gray-500 text-lg">
                      {new Date(item.expiaryDate).toLocaleDateString()}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div>
        <Typography variant="h4" className="text-center font-bold text-4xl">
          Inventory Report
        </Typography>
        {generateTable(
          itemsNearExpiry,
          false,
          true,
          'Products Near To Expiry Date (Within 3 Months)'
        )}
        {generateTable(
          itemsNearReorderLevel,
          true,
          false,
          'Products Near To Pass Reorder Level (Less than 50 items to pass reorder level  )'
        )}
        {generateTable(
          itemsPassedReorderLevel,
          true,
          false,
          'Products Passed Reorder Level'
        )}
      </div>
    );
  };

  return (
    <div className="text-center">
      <div id="report-container">{generateReport()}</div>
      <div className="text-center mt-4">
        <Button color="black" onClick={generatePDF}>
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default InventoryReport;
