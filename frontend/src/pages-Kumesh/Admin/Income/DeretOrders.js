import axios from "axios";
import { useState, useEffect } from "react";

function DeretOrders() {
  const [directOrder, setDirectOrder] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const URL= 'http://localhost:8070/api/directorders';

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
console.log(directOrder);
  return (
    <div>
      <h1 className="income_topic">DirectOrder Details</h1>
      <div className="tbl_continer_incme">
        <table className="table_income">
          <thead>
            <tr className="table_income_tr">
              <th className="table_income_th">Amount</th>
              <th className="table_income_th">Quantity</th>
              <th className="table_income_th">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {directOrder && directOrder.map((order, index) =>
              order.items.map((item, idx) => (
                <tr key={`LKR ${index}-LKR ${idx}`}>
                  <td className="table_income_td">{item.totalAmount.toFixed(2)}</td>
                  <td className="table_income_td">{item.quantity}</td>
                  <td className="table_income_td">{(item.quantity * item.totalAmount).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="tot_amout">Total Income:LKR {totalIncome.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default DeretOrders;
