import axios from "axios";
import { useState, useEffect } from "react";

function DeretOrders() {
  const [directOrder, setDirectOrder] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const URL = 'http://localhost:8070/api/directorders';

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        console.log("Response data:", response.data);
        
        if (response.data) {
          setDirectOrder(response.data);
          calculateTotalIncome(response.data);
        } else {
          // Handle the case where directOrder is undefined or empty
          // For example, setTotalIncome(0) or display a message to the user
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchHandler();
  }, []);

  const calculateTotalIncome = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      order.items.forEach((item) => {
        total += item.totalAmount * item.quantity;
      });
    });
    setTotalIncome(total);
  };

  const generateReport = () => {
    // Code to generate report
    console.log("Generating report...");

    // Code to print report
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Direct Order Details</h1>
        <button onClick={generateReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate & Print Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {directOrder && directOrder.map((order, index) =>
              order.items.map((item, idx) => (
                <tr key={`order-${index}-item-${idx}`} className={idx % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{(item.quantity * item.totalAmount).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold">Total Income: LKR {totalIncome.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default DeretOrders;
