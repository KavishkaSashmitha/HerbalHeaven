import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8070/sup/materialCost";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function EmpSalary() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data && data.employees) {
          setEmployees(data.employees);
        } else {
          setError("No data found");
        }
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div>
        <h1 className="income_topic">Employees Salary</h1>
        <div className="tbl_continer_incme">
          <table className="table_income">
            <thead>
              <tr className="table_income_tr">
                <th className="table_income_th">materialCost</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="table_income_th">
                    <p className="sub_par_dis">
                      {employee.materialCost ? (
                        <ul>
                          {Object.entries(employee.materialCost).map(
                            ([month, materialCost]) => (
                              <li key={month}>
                                {`${month}: $${
                                  materialCost ? materialCost.toFixed(2) : "-"
                                }`}
                              </li>
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
    </div>
  );
}

export default EmpSalary;
