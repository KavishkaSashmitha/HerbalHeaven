import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { useReactToPrint } from "react-to-print";
import MaterialCost from "../Expens/MaterialCost";
import './Income.css'

const URL = "http://localhost:8070/api/orders/ordersnet";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Incomes() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setOrders(data.orders));
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"),
  });

  return (
    <div ref={componentRef}>
      <SidebarWithBurgerMenu />
      <button onClick={handlePrint} className="dwon_repot_income">
        Download Report
      </button>
      <div >
        <h1 className="income_topic">Income Details</h1>
        <div className="tbl_continer_incme">
          <table className="table_income">
            <thead>
              <tr className="table_income_tr">
                <th className="table_income_th">total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orders, index) => (
                <tr key={index}>
                  <td className="table_income_th">
                    <p className="sub_par_dis">
                      {orders.total ? `$${orders.total.toFixed(2)}` : "-"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Incomes;
