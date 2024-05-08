import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Button } from '@material-tailwind/react';
import Chart from 'chart.js/auto';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const InventoryStatistics = () => {
  const [items, setItems] = useState([]);
  const chartRef = useRef(null); // Create a ref for the canvas element
  const chartInstanceRef = useRef(null); // Create a ref for the chart instance

  useEffect(() => {
    axios
      .get('http://localhost:8070/inventory/viewInventoryItems')
      .then((result) => setItems(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Calculate data for the pie chart
  const calculateChartData = () => {
    const categoryCounts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: 'Inventory Items by Category',
          data: Object.values(categoryCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          radius: '50%',
        },
      ],
    };
  };

  const renderPieChart = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the existing chart
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d'); // Get the canvas context
      const data = calculateChartData();

      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: data,
      });
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      renderPieChart();
    }
  }, [items]);

  return (
    <div>
      <Typography variant="h4" className="text-center font-bold text-4xl">
        Inventory Statistics
      </Typography>

      {/* Render the pie chart */}
      <div className="mt-8">
        <Typography variant="h6" className="text-center font-bold text-xl">
          Inventory Items by Category
        </Typography>
        <div className="chart-container" style={{ marginTop: '1px' }}>
          <canvas id={uuidv4()} ref={chartRef} width={30} height={30} />
          <div
            className="color-code"
            style={{ fontSize: '20px', marginTop: '2px', color: '#000' }}
          >
            {/* Adjust the font size, font color, and margin-top */}
            {/* Color code descriptions */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatistics;
