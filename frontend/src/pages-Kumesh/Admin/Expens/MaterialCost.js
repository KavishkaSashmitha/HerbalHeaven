import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:8070/sup/materialCost";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function MaterialCost() {
  const [employees, setEmployees] = useState([]);
  const [totalMaterialCost, setTotalMaterialCost] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data && data.employees) {
          setEmployees(data.employees);
          calculateTotalMaterialCost(data.employees);
        } else {
          setError("No data found");
        }
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      });
  }, []);

  const calculateTotalMaterialCost = (employees) => {
    let total = 0;
    employees.forEach((employee) => {
      if (employee.materialCost) {
        Object.values(employee.materialCost).forEach((cost) => {
          if (cost !== null && typeof cost !== "undefined") {
            total += cost;
          }
        });
      }
    });
    setTotalMaterialCost(total);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="income_topic">Material Cost</h1>
      <div className="tbl_continer_incme">
        <table className="table_income">
          <thead>
            <tr className="table_income_tr">
              <th className="table_income_th">Employee</th>
              <th className="table_income_th">Material Cost</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td className="table_income_th">{employee.name}</td>
                <td className="table_income_th">
                  <ul>
                    {employee.materialCost ? (
                      Object.entries(employee.materialCost).map(
                        ([month, materialCost]) => (
                          <li key={month}>
                            {`${month}: $${materialCost ? materialCost.toFixed(2) : "-"}`}
                          </li>
                        )
                      )
                    ) : (
                      <li>-</li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="tot_amout">Total Material Cost:LKR {totalMaterialCost.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default MaterialCost;
