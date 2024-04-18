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
    <div className="bg-white p-6 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-6">Material Cost</h1>
  <div className="overflow-x-auto">
    <table className="w-full divide-y divide-gray-200">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Material Cost</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {employees.map((employee, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
            <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <ul className="list-disc list-inside">
                {employee.materialCost ? (
                  Object.entries(employee.materialCost).map(([month, materialCost]) => (
                    <li key={month} className="text-green-600">{`${month}: LKR ${materialCost ? materialCost.toFixed(2) : "-"}`}</li>
                  ))
                ) : (
                  <li className="text-red-600">-</li>
                )}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="mt-6">
    <h2 className="text-lg font-bold">Total Material Cost: LKR {totalMaterialCost.toFixed(2)}</h2>
  </div>
</div>

  );
}

export default MaterialCost;
