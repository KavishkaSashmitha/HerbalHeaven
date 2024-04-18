import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SidebarWithBurgerMenu } from '../components/navBar';
import { Footer } from "../components/Footer";
import { Typography } from "@material-tailwind/react";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Breadcrumbs
} from "@material-tailwind/react";

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/customer/all');
      setCustomers(response.data);
      setFilteredCustomers(response.data); // Initialize filtered customers with all customers
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Error fetching customers');
    }
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterCustomers(query);
  };

  // Function to filter customers based on search query
  const filterCustomers = (query) => {
    if (!query) {
      setFilteredCustomers(customers); // If query is empty, show all customers
    } else {
      const filtered = customers.filter(customer => {
        return (
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.email.toLowerCase().includes(query.toLowerCase()) ||
          customer.mobileNumber.includes(query) ||
          customer.address.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredCustomers(filtered);
    }
  };

  // Function to handle customer deletion
  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8070/api/customer/delete`, { data: { customerId } });
      // Remove the deleted customer from the state
      const updatedCustomers = customers.filter(customer => customer._id !== customerId);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Error deleting customer');
    }
  };

  return (
    <>
      <SidebarWithBurgerMenu />
      <div className="container mx-auto py-10">
        <Breadcrumbs>
          <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
          <span className="text-gray-500">Customer Manager</span>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold mb-4">Customer Manager</h1>
              
       
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div> 
        
        {error && <p className="text-red-200">{error}</p>}
         
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-gray-100 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900  uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-gray-900  uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
         
          <tbody className="bg-green-100 divide-y divide-gray-200">    
            {filteredCustomers.map(customer => (
              <tr key={customer._id}>
                   
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
              
                
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.mobileNumber}</td>
             
                <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                 
                  <button 
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteCustomer(customer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
            
        </table>
        <Link to="/customer-report" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">View Report</Link>
        <CardFooter>
          <Footer />
        </CardFooter>
      </div>
      
    </>
    
  );
};

export default CustomerManager;