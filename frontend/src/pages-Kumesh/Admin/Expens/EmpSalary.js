import React, { useEffect, useState } from "react";
import axios from "axios";
import './EmpSalary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons'; // Assuming you have imported the faFilePdf icon
import jsPDF from 'jspdf';


const URL = "http://localhost:8070/api/posts/sallrypost";

const EmpSalary = () => {
  const [salary, setSalary] = useState([]);
  const [error, setError] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSalary = salary.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Organize salary data by month
  const salaryByMonth = {};
  filteredSalary.forEach((employee) => {
    Object.entries(employee.salary).forEach(([month, amount]) => {
      if (!salaryByMonth[month]) {
        salaryByMonth[month] = [];
      }
      salaryByMonth[month].push({ name: employee.name, amount });
    });
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo image
    const logoWidth = 50; // Adjust the width of the logo as needed
    const logoHeight = 50; // Adjust the height of the logo as needed
    
    doc.text("Employees Salary Report", 70, 30); // Adjust the position of the title
    
    let yOffset = 50; // Adjust the initial vertical position
    Object.entries(salaryByMonth).forEach(([month, salaries]) => {
      doc.text(`${month} Salary:`, 10, yOffset);
      yOffset += 10;
      salaries.forEach((entry) => {
        doc.text(`${entry.name}: LKR ${entry.amount.toFixed(2)}`, 20, yOffset);
        yOffset += 7;
      });
    });
    
    // Add total salary
    doc.text(`Total Salary: LKR ${totalSalary.toFixed(2)}`, 10, yOffset);
    
    doc.save("employees_salary_report.pdf");
  };
 

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <button onClick={generatePDF} className="report-button">
          <FontAwesomeIcon icon={faFilePdf} />
          Generate Report
        </button>
      </div>
      <h1 className="income_topic">Employees Salary</h1>
      <div className="tbl_continer_incme">
        <table className="table_income">
          <thead>
            <tr className="table_income_tr">
              <th className="table_income_th">Month</th>
              <th className="table_income_th">Employee</th>
              <th className="table_income_th">Salary</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(salaryByMonth).map(([month, salaries], index) => (
              <tr key={index}>
                <td className="table_income_td">{month}</td>
                <td className="table_income_td">
                  {salaries.map((entry, idx) => (
                      <div key={idx}>{entry.name}</div>
                  ))}
                </td>
                <td className="table_income_td">
                  {salaries.map((entry, idx) => (
                      <div key={idx}>LKR {entry.amount.toFixed(2)}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 className="tot_amout">Total: LKR {totalSalary.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default EmpSalary;
