import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectOrdersTable = () => {
  const [directOrders, setDirectOrders] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0); // State to hold the sum of total amounts

  useEffect(() => {
    axios
      .get('http://localhost:8070/api/directorders')
      .then((response) => {
        setDirectOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching direct orders:', error);
      });
  }, []);

  const [productDetails, setProductDetails] = useState({});

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/products/${productId}`
      );
      setProductDetails({ ...productDetails, [productId]: response.data });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    let sum = 0; // Variable to store the sum of total amounts
    directOrders.forEach((order) => {
      order.items.forEach((item) => {
        sum += item.totalAmount; // Accumulate total amounts
        if (!productDetails[item.productId]) {
          fetchProductDetails(item.productId);
        }
      });
    });
    setTotalAmountSum(sum); // Update the state with the sum
  }, [directOrders, productDetails]);

  return (
    <div class="p-4">
      <h2 class="text-lg font-bold mb-4">Direct Orders</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Order ID</th>
            <th class="border border-gray-300 px-4 py-2">Items</th>
            <th class="border border-gray-300 px-4 py-2">Total Amount</th>
            <th class="border border-gray-300 px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {directOrders.map((order) => (
            <tr key={order._id}>
              <td class="border border-gray-300 px-4 py-2">{order._id}</td>
              <td class="border border-gray-300 px-4 py-2">
                <ul>
                  {order.items.map((item) => (
                    <li key={item.productId}>
                      Product ID: {item.productId}, Quantity: {item.quantity},
                      Total Amount: Rs.{item.totalAmount}
                      {productDetails[item.productId] && (
                        <div>
                          Name: {productDetails[item.productId].name}
                          <br />
                          Image:{' '}
                          <img
                            class="w-16 h-16 object-cover"
                            src={productDetails[item.productId].image}
                            alt={productDetails[item.productId].name}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                rs.{totalAmountSum}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="mt-4">
        <strong>Total Amount Sum:</strong> Rs.{totalAmountSum}
      </div>
    </div>
  );
};

export default DirectOrdersTable;
