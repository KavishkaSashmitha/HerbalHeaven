import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ProductSalesChart = ({ productData }) => {
  // State to hold chart data
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Function to process product data and prepare chart data
    const prepareChartData = () => {
      const labels = productData.map((item) => item.productDetails.name);
      const quantities = productData.map((item) => item.quantity);

      // Chart configuration
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Quantity Sold',
            data: quantities,
            backgroundColor: '#4F46E5',
          },
        ],
      });
    };

    // Call the function to prepare chart data
    prepareChartData();
  }, [productData]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Product Sales Chart</h2>
      <div className="w-full">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductSalesChart;
