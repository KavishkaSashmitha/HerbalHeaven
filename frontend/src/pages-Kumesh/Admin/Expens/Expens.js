import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { useReactToPrint } from "react-to-print";
import MaterialCost from "./MaterialCost";
import EmpSalary from "./EmpSalary";
import { DefaultSidebar } from "../../../components/Manager-Sidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import { Card } from "@material-tailwind/react";

const URL = "http://localhost:8070/api/transports/transget";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Expens() {
  const [transport, setTransport] = useState([]);
  const [totalTransportCost, setTotalTransportCost] = useState(0);

  useEffect(() => {
    fetchHandler().then((data) => setTransport(data.transport));
  }, []);

  useEffect(() => {
    let totalCost = 0;
    transport.forEach((item) => {
      Object.values(item.cost).forEach((cost) => {
        totalCost += cost;
      });
    });
    setTotalTransportCost(totalCost);
  }, [transport]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded!"),
  });
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
      className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
      style={{ backgroundColor: '#02353c' }}
    >
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="flex flex-col flex-1 overflow-auto">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card>
      <div ref={componentRef}>
        <button onClick={handlePrint} className="dwon_repot_income">
          Download Report
        </button>
        <div>
          <h1 className="income_topic">Transport Details</h1>
          <div className="tbl_continer_incme">
            <table className="table_income">
              <thead>
                <tr className="table_income_tr">
                  <th className="table_income_th">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {transport.map((item, index) => (
                  <tr key={index}>
                    <td className="table_income_th">
                      <p className="sub_par_dis">
                        {item.cost ? (
                          <ul>
                            {Object.entries(item.cost).map(
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
            <h1 className="tot_amout">Total Transport Cost:Rs.{totalTransportCost.toFixed(2)}</h1>
          </div>
        </div>
        <MaterialCost />
        <EmpSalary />
      </div>
      </Card>
    </div>
    </div>
    </div></div>
  );
}

export default Expens;
