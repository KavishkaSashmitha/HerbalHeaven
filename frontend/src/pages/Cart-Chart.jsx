import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import Chart from 'chart.js/auto';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8070/api/user/cart/cart-details'
        );
        // Preprocess cartItems to merge duplicates by name
        const mergedCartItems = mergeItemsByName(response.data);
        setCartItems(mergedCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Create chart once cartItems data is fetched
    if (cartItems.length > 0) {
      createChart();
    }
  }, [cartItems]);

  const mergeItemsByName = (items) => {
    const mergedItems = {};
    items.forEach((item) => {
      if (mergedItems[item.name]) {
        // If item name already exists, aggregate its price
        mergedItems[item.name].quantity += item.quantity;
      } else {
        // Otherwise, add the item to mergedItems
        mergedItems[item.name] = { ...item };
      }
    });
    // Convert mergedItems object back to array
    return Object.values(mergedItems);
  };

  const createChart = () => {
    const canvas = document.getElementById('cartChart');

    // Check if a chart already exists, destroy it if it does
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    const ctx = canvas.getContext('2d');
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cartItems.map((item) => item.name),
        datasets: [
          {
            label: 'Quantity',
            data: cartItems.map((item) => item.quantity),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
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
  };
  return (
    <Card>
      <CardHeader>
        <Typography variant="h5" color="blue-gray">
          Cart Details Chart
        </Typography>
      </CardHeader>
      <CardBody>
        <canvas id="cartChart" width="400" height="400"></canvas>
      </CardBody>
    </Card>
  );
};

export default CartDetails;
