import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const OrderAmountLineGraph = () => {
  const [orderData, setOrderData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:8070/api/directorders')
      .then((response) => {
        const data = response.data.map((order) => ({
          createdAt: new Date(order.createdAt).toLocaleDateString(),
          totalAmount: order.items.reduce(
            (total, item) => total + item.totalAmount,
            0
          ),
        }));
        setOrderData(data);
      })
      .catch((error) => {
        console.error('Error fetching direct orders:', error);
      });
  }, []);

  useEffect(() => {
    if (orderData.length > 0) {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('orderLineGraph');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: orderData.map((order) => order.createdAt),
          datasets: [
            {
              label: 'Total Order Amount',
              data: orderData.map((order) => order.totalAmount),
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current = newChart;
    }
  }, [orderData]);

  return <canvas id="orderLineGraph" width="400" height="200"></canvas>;
};

export default OrderAmountLineGraph;
