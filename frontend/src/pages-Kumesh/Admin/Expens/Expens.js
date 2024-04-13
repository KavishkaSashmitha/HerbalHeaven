import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { useReactToPrint } from "react-to-print";
import MaterialCost from "./MaterialCost";
import EmpSalary from "./EmpSalary";
const URL = "http://localhost:8070/api/transports/transget";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Expens() {
  const [transport, setTransport] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setTransport(data.transport));
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"),
  });
  return (
    <div>
      <SidebarWithBurgerMenu />
      <div ref={componentRef}>
        <button onClick={handlePrint} className="dwon_repot_income">
          Download Report
        </button>
        <div>
          <h1 className="income_topic">Tranceport Income Details</h1>
          <div className="tbl_continer_incme">
            <table className="table_income">
              <thead>
                <tr className="table_income_tr">
                  <th className="table_income_th">total</th>
                </tr>
              </thead>
              <tbody>
                {transport.map((transport, index) => (
                  <tr key={index}>
                    <td className="table_income_th">
                      <p className="sub_par_dis">
                        {transport.cost ? (
                          <ul>
                            {Object.entries(transport.cost).map(
                              ([month, cost]) => (
                                <li key={month}>{`${month}: $${cost.toFixed(
                                  2
                                )}`}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <MaterialCost />
        <EmpSalary />
      </div>
    </div>
  );
}

export default Expens;
