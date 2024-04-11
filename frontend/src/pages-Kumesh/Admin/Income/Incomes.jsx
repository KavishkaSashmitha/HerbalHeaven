import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cartdetails from "./NetIncome";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8070/api/orders/ordersnet";

const fetchOrders = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, existingOrders: [] };
  }
};

function Incomes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data.existingOrders);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"),
  });

  console.log("Orders:", orders);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SidebarWithBurgerMenu />
      <button onClick={handlePrint} className="dwon_repot_income">
        Download Report
      </button>
      <div ref={componentRef}>
        <h1 className="income_topic">Income Details</h1>
        <div className="tbl_continer_incme">
          <table className="table_income">
            <thead>
              <tr className="table_income_tr">
                <th className="table_income_th">orderId</th>
                <th className="table_income_th">user</th>
                <th className="table_income_th">paymentStatus</th>
                <th className="table_income_th">orderStatus</th>
                <th className="table_income_th">shippingAddress</th>
                <th className="table_income_th">total</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order, index) => (
                <Cartdetails key={index} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Incomes;
