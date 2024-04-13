import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:8070/api/directorders";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DeretOrders() {
  const [directOrder, setDirectOrder] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    fetchHandler().then((data) => {
      setDirectOrder(data.directOrder);
      calculateTotalIncome(data.directOrder);
    });
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
            {directOrder.map((order, index) =>
              order.items.map((item, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td className="table_income_td">{item.quantity}</td>
                  <td className="table_income_td">{item.totalAmount.toFixed(2)}</td>
                  <td className="table_income_td">{(item.quantity * item.totalAmount).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h2  className="tot_amout">Total Income: ${totalIncome.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default DeretOrders;
