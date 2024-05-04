import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button } from '@material-tailwind/react';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
      
      pdf.save('customer_report.pdf');
    });
  };

  const generateGenderPieChart = () => {
    const ctx = document.getElementById('gender-pie-chart');
    if (ctx) {
      // Destroy existing chart if it exists
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              label: 'Gender Distribution',
              data: [maleCount, femaleCount],
              backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }
  };

  const generateAgePieChart = () => {
    const ctx = document.getElementById('age-pie-chart');
    if (ctx) {
      // Destroy existing chart if it exists
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(ageIntervals),
          datasets: [
            {
              label: 'Age Intervals',
              data: Object.values(ageIntervals),
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }
  };

  const generateAddressPieChart = () => {
    const ctx = document.getElementById('address-pie-chart');
    if (ctx) {
      // Destroy existing chart if it exists
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(addressCounts),
          datasets: [
            {
              label: 'Address Counts',
              data: Object.values(addressCounts),
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    generateGenderPieChart();
    generateAgePieChart();
    generateAddressPieChart();
  }, [maleCount, femaleCount, ageIntervals, addressCounts]);

  return (
    <div className="flex justify-center items-center h-full">
      <div id="report-container">
        <Typography type="h1" bold className="mb-4">
      This report contains inventory details of Herbal Heaven company(PVT)LTD
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <canvas id="gender-pie-chart"></canvas>
            <Typography type="h3" className="mt-4">
              Gender Distribution
            </Typography>
          </div>
          <div>
            <canvas id="age-pie-chart"></canvas>
            <Typography type="h3" className="mt-4">
              Age Intervals
            </Typography>
          </div>
          <div>
            <canvas id="address-pie-chart"></canvas>
            <Typography type="h3" className="mt-4">
              Address Counts
            </Typography>
          </div>
        </div>
        <Button color="blue" onClick={generatePDF}>
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default CustomerReport;
