import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function SalaryReport() {
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");
  const [bsal, setBsal] = useState("");
  const [tax, setTax] = useState("");
  const [etf, setEtf] = useState("");
  const [epf, setEpf] = useState("");
  const [tallowance, setTallowance] = useState("");
  const [mbonus, setMbonus] = useState("");
  const [nsal, setNsal] = useState("");
  const [emp, setEmp] = useState(null);
  const [nameError, setNameError] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [jobRole, setJobRole] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8070/api/posts/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setEmp(json?.existingPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPosts();
  }, []);

  function Calculation() {
    const basicSalary = hours * rate;
    const etfValue = (basicSalary * 3) / 100;
    const epfValue = (basicSalary * 8) / 100;

    let taxValue, transportAllowance, monthlyBonus;

    if (basicSalary > 100000) {
      taxValue = (basicSalary * 10) / 100;
      transportAllowance = (basicSalary * 30) / 100;
      monthlyBonus = (basicSalary * 20) / 100;
    } else if (basicSalary > 50000) {
      taxValue = (basicSalary * 5) / 100;
      transportAllowance = (basicSalary * 20) / 100;
      monthlyBonus = (basicSalary * 15) / 100;
    } else {
      taxValue = (basicSalary * 2) / 100;
      transportAllowance = (basicSalary * 10) / 100;
      monthlyBonus = (basicSalary * 10) / 100;
    }

    const netSalary =
      basicSalary +
      (transportAllowance + monthlyBonus - (taxValue + etfValue + epfValue));

    const validEmployee = emp && emp.find((e) => e.name === employeeName);
    if (!validEmployee) {
      setNameError("Invalid employee name");
      return;
    }

    setJobRole(jobRole);
    setBsal(basicSalary);
    setTax(taxValue);
    setTallowance(transportAllowance);
    setMbonus(monthlyBonus);
    setEtf(etfValue);
    setEpf(epfValue);
    setNsal(netSalary);
  }

  function Generate() {
    const doc = new jsPDF();
    const data1 = [
      ["Employee Name", `${employeeName}`],
      ["Job Role", `${jobRole}`],
    ];

    const data2 = [
      ["Basic Salary", `Rs.${bsal} /=`],
      ["Tax", `Rs.${tax} /=`],
      ["ETF", `Rs.${etf} /=`],
      ["EPF", `Rs.${epf} /=`],
      ["Transport Allowance", `Rs.${tallowance} /=`],
      ["Monthly Bonus", `Rs.${mbonus} /=`],
      ["Net Salary", `Rs.${nsal} /=`],
    ];

    doc.setFont("times", "bold");
    doc.setFontSize(25);
    doc.text("Salary Details", 10, 10);

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    // Generate the table
    doc.autoTable({
      head: [["Employee Details", ""]],
      body: data1,
      margin: { top: 25 },
    });
    doc.autoTable({
      head: [["Description", "Amount"]],
      body: data2,
      margin: { top: 28 },
    });

    // Save the document
    doc.save("Employee Salary.pdf");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md">
      <h1 className="text-3xl mb-6 text-center">SALARY CALCULATOR</h1>
      <form className="space-y-4">
        <div>
          <label name="employeeName">Employee Name:</label>
          <input
            type="text"
            required
            onChange={(event) => {
              setEmployeeName(event.target.value);
              setNameError("");
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Employee Name"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>

        <div>
          <label name="jobRole">Job Role:</label>
          <input
            type="text"
            required
            onChange={(event) => {
              setJobRole(event.target.value);
              setNameError("");
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Employee Job Role"
          />
        </div>

        <div>
          <label name="workingHour">Working Hours (h):</label>
          <input
            type="number"
            required
            onChange={(event) => {
              setHours(event.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Working Hours"
          />
        </div>
        <div>
          <label name="hoursRate">Hourly Rate (Rs.):</label>
          <input
            type="number"
            required
            onChange={(event) => {
              setRate(event.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Hourly Rate (Rupees)"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={Calculation}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Calculate Salary
          </button>
        </div>

        <div>
          <label name="basicSalary">Basic Salary:</label>
          <input
            type="text"
            required
            value={`Rs.${bsal}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Basic Salary (Rupees)"
          />
        </div>

        <div>
          <label name="taxRate">Tax Rate:</label>
          <input
            type="text"
            required
            value={`Rs.${tax}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Tax (Rupees)"
          />
        </div>

        <div>
          <label name="etf">ETF:</label>
          <input
            type="text"
            required
            value={`Rs.${etf}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="ETF (Rupees)"
          />
        </div>

        <div>
          <label name="epf">EPF:</label>
          <input
            type="text"
            required
            value={`Rs.${epf}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="EPF (Rupees)"
          />
        </div>

        <div>
          <label name="transportAllowances">Transport Allowance:</label>
          <input
            type="text"
            required
            value={`Rs.${tallowance}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Transport Allowance (Rupees)"
          />
        </div>

        <div>
          <label name="monthlyBonus">Monthly Bonus:</label>
          <input
            type="text"
            required
            value={`Rs.${mbonus}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Monthly Bonus (Rupees)"
          />
        </div>

        <div>
          <label name="netSalary">Net Salary:</label>
          <input
            type="text"
            required
            value={`Rs.${nsal}`}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Net Salary (Rupees)"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={Generate}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Generate Salary Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default SalaryReport;
