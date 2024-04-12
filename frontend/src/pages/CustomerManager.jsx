import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []); 

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/customer/all');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Error fetching customers');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Customer Manager</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mobile Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map(customer => (
            <tr key={customer._id}>
              <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.mobileNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManager;
