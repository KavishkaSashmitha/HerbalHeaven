import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmpSalary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilePdf } from "@fortawesome/free-solid-svg-icons"; // Assuming you have imported the faFilePdf icon
import jsPDF from "jspdf";
import { DefaultSidebar } from "../../../components/Manager-Sidebar";
import MonthlySalChart from "../../../pages_Pasindu/Emp_Tot_SalChart";
import AdminNavbar from "../../../components/AdminNavbar";
import { Card } from "@material-tailwind/react";

const URL = "http://localhost:8070/api/posts/sallrypost";

const EmpSalary = () => {
  const [salary, setSalary] = useState([]);
  const [error, setError] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };

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

    // Function to convert image to base64
    const getBase64FromImageUrl = (url, callback) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg');
            callback(dataURL);
        };
        img.src = url;
    };

    // Path to your local logo image
    const logoPath = 'logo/logo-1.png'; // Replace with your logo path

    // Load local logo and add to PDF
    getBase64FromImageUrl(logoPath, (logoDataURL) => {
        const logoWidth = 50; // Adjust the width of the logo as needed
        const logoHeight = 50; // Adjust the height of the logo as needed
        doc.addImage(logoDataURL, 'JPEG', 10, 10, logoWidth, logoHeight); // Adjust the position of the logo

        // Title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Employees Salary Report", 70, 30); // Adjust the position of the title

        // Content
        // Content
// Content
// Content
let yOffset = 50; // Adjust the initial vertical position
const columnWidth = 80; // Adjust column width as needed

// Header row
doc.setFont('helvetica', 'bold');
doc.setDrawColor(0); // Black color for border
doc.setFillColor(200); // Gray color for header background
doc.rect(10, yOffset, columnWidth * 2, 10, 'FD');
doc.setTextColor(0); // Black color for text
doc.text('Employee', 15, yOffset + 8);
doc.text('Salary (LKR)', columnWidth + 15, yOffset + 8);

// Data rows
doc.setFont('helvetica', 'normal');
yOffset += 10;
Object.entries(salaryByMonth).forEach(([month, salaries]) => {
    doc.setFont('helvetica', 'bold');
   
    
    doc.text(`${month} Salary`, 15, yOffset + 4);
    doc.setFont('helvetica', 'normal');
    salaries.forEach((entry, index) => {
        const rowHeight = 7;
        const y = yOffset + (index * rowHeight) + 7;
        doc.rect(10, y, columnWidth, rowHeight);
        doc.text(entry.name, 15, y + 4);
        doc.text(entry.amount.toFixed(2), columnWidth + 15, y + 4);
    });
    yOffset += (salaries.length * 7) + 10; // Add space for header and data rows, plus some additional padding
});

// Separator
doc.setLineWidth(0.5);


// Total Salary
doc.setFont('helvetica', 'bold');

doc.text('Total Salary', 15, yOffset + 12);
doc.text(`LKR ${totalSalary.toFixed(2)}`, columnWidth + 15, yOffset + 12);

        // Save PDF
        doc.save("employees_salary_report.pdf");
    });
};



  return (
    <div>
      <div
        className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
        style={{ backgroundColor: "#02353c" }}
      >
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`sidebar w-68 bg-custom-color text-white ${
              open ? "block" : "hidden"
            }`}
          >
            <DefaultSidebar open={open} handleOpen={setOpen} />
          </div>
          <div className="flex flex-col flex-1 overflow-auto">
            <AdminNavbar toggleSidebar={toggleSidebar} />
            <Card className="flex flex-1">
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
                    {Object.entries(salaryByMonth).map(
                      ([month, salaries], index) => (
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
                      )
                    )}
                  </tbody>
                </table>
                <h1 className="tot_amout">
                  Total: LKR {totalSalary.toFixed(2)}
                </h1>
              </div>
              <div className="pt-3">
                <div>
                  <MonthlySalChart />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpSalary;
