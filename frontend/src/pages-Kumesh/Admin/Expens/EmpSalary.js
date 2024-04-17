import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:8070/api/posts/sallrypost";

const EmpSalary = () => {
  const [salary, setSalary] = useState([]);
  const [error, setError] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        if (response.data && response.data.salary) {
          setSalary(response.data.salary);
        } else {
          setError("No data found");
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchHandler();
  }, []);

  useEffect(() => {
    let total = 0;
    salary.forEach((employee) => {
      Object.values(employee.salary).forEach((amount) => {
        total += amount;
      });
    });
    setTotalSalary(total);
  }, [salary]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="income_topic">Employees Salary</h1>
      <div className="tbl_continer_incme">
        <table className="table_income">
          <thead>
            <tr className="table_income_tr">
              <th className="table_income_th">salary</th>
            </tr>
          </thead>
          <tbody>
            {salary.map((employee, index) => (
              <tr key={index}>
                <td className="table_income_th">
                  <p className="sub_par_dis">
                    {employee.salary ? (
                      <ul>
                        {Object.entries(employee.salary).map(
                          ([month, amount]) => (
                            <li key={month}>
                              {`${month}: LKR${amount.toFixed(2)}`}
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
        <h1 className="tot_amout">Total: LKR{totalSalary.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default EmpSalary;
