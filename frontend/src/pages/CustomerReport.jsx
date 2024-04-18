import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button } from '@material-tailwind/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CustomerReport = () => {
  const [customers, setCustomers] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [ageIntervals, setAgeIntervals] = useState({});
  const [addressCounts, setAddressCounts] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8070/api/customer/all')
      .then((response) => {
        setCustomers(response.data);
        countGenders(response.data);
        countAgeIntervals(response.data);
        countAddressCounts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const countGenders = (customerData) => {
    let male = 0;
    let female = 0;
    customerData.forEach((customer) => {
      if (customer.gender.toLowerCase() === 'male') {
        male++;
      } else if (customer.gender.toLowerCase() === 'female') {
        female++;
      }
    });
    setMaleCount(male);
    setFemaleCount(female);
  };

  const countAgeIntervals = (customerData) => {
    const intervals = { '0-19': 0, '20-39': 0, '40-59': 0, '60+': 0 };
    customerData.forEach((customer) => {
      const age = customer.age;
      if (age < 20) {
        intervals['0-19']++;
      } else if (age >= 20 && age < 40) {
        intervals['20-39']++;
      } else if (age >= 40 && age < 60) {
        intervals['40-59']++;
      } else {
        intervals['60+']++;
      }
    });
    setAgeIntervals(intervals);
  };

  const countAddressCounts = (customerData) => {
    const counts = {};
    customerData.forEach((customer) => {
      const address = customer.address;
      counts[address] = (counts[address] || 0) + 1;
    });
    setAddressCounts(counts);
  };

  const generatePDF = () => {
    const input = document.getElementById('report-container');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 70, imgWidth, imgHeight); // Add image of table

     
      // Add current time
      const now = new Date();
      const currentTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      pdf.setFontSize(7);
      pdf.text(`Report generated on: ${currentTime}`, 152, 10);

      // Add company logo
      const logoImg = new Image();
      logoImg.src = '/logo/logo.png'; // Assuming 'logo.png' is the path to your logo
      pdf.addImage(logoImg, 'PNG', 90, 14, 40, 40);

      // Add company name
      pdf.setFontSize(25);
      pdf.setFont('helvetica', 'bold');
      // Print "Herbal Heaven" text
      pdf.text('Herbal Heaven', 80, 20);

      // Add company address, email, and phone number
      pdf.setFontSize(8);
      pdf.text('Company Address:', 10, 50);
      pdf.text('123 Main St, City, Country', 10, 55);
      pdf.text('Email: info@herbalheaven.com', 10, 60);
      pdf.text('Phone: +1234567890', 10, 65);

      // Add description
      pdf.setFontSize(12);
      pdf.text(
        'This report contains inventory details of Herbal Heaven company(PVT)LTD.',
        10,
        pdf.internal.pageSize.height - 50
      );
      pdf.save('customer_report.pdf');
    });
  };

  return (
    <div className="flex justify-center items-center h-full">
    <div id="report-container">   
      <Typography type="h1" className="mb-4">
        Customer Report
      </Typography>
      <div className="mb-4">
        <Typography type="h3">Gender Distribution:</Typography>
       <table className="w-4/5 mx-auto mt-4 mb-4 table-auto border border-gray-500">
          <thead>
            <tr className="bg-blue-300 text-gray-900 uppercase text-sm leading-normal">
              <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                Gender
              </th>
              <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 border border-gray-500 text-lg">Male</td>
              <td className="py-2 px-3 border border-gray-500 text-lg">{maleCount}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border border-gray-500 text-lg">Female</td>
              <td className="py-2 px-3 border border-gray-500 text-lg">{femaleCount}</td>
            </tr>
          </tbody>
        </table>

        <Typography type="h3">Age Intervals:</Typography>
        <table className="table-auto border border-gray-500 mb-4">
          <thead>
            <tr className="bg-blue-300 text-gray-900 uppercase text-sm leading-normal">
              <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                Age Interval
              </th>
              <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ageIntervals).map(([interval, count]) => (
              <tr key={interval}>
                <td className="py-2 px-3 border border-gray-500 text-lg">{interval}</td>
                <td className="py-2 px-3 border border-gray-500 text-lg">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Typography type="h3">Address Counts:</Typography>
        <table className="table-auto border border-gray-500">
          <thead>
            <tr className="bg-blue-300 text-gray-900 uppercase text-sm leading-normal">
              <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                Address
              </th>
              <th className="py-3 px-3 text-center font-bold border border-gray-500 text-lg">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(addressCounts).map(([address, count]) => (
              <tr key={address}>
                <td className="py-2 px-3 border border-gray-500 text-lg">{address}</td>
                <td className="py-2 px-3 border border-gray-500 text-lg">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button color="blue" onClick={generatePDF}>
        Download Report
      </Button>
    </div> </div>
  );
};

export default CustomerReport;
