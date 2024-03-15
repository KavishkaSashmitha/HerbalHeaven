import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function SalaryReport() {
  const [hours, setHours] = useState();
  const [rate, setRate] = useState();
  const [bsal, setBsal] = useState();
  const [tax, setTax] = useState();
  const [etf, setEtf] = useState();
  const [epf, setEpf] = useState();
  const [tallowance, setTallowance] = useState();
  const [mbonus, setMbonus] = useState();
  const [nsal, setNsal] = useState();
  const [emp, setEmp] = useState(null);
  const [nameError, setNameError] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [jobRole, setJobRole] = useState("");

  useEffect(() => {
    const fetchposts = async () => {
      const response = await fetch("http://localhost:8070/api/posts/posts");
      const json = await response.json();

      if (response.ok) {
        setEmp(json?.existingPosts);
      }
    };
    fetchposts();
  }, []);

  function Calculation() {
    const bsal = hours * rate;
    const etf = (bsal * 3) / 100;
    const epf = (bsal * 8) / 100;

    let tax, tallowance, mbonus;

    if (bsal > 100000) {
      tax = (bsal * 10) / 100;
      tallowance = (bsal * 30) / 100;
      mbonus = (bsal * 20) / 100;
    } else if (bsal > 50000) {
      tax = (bsal * 5) / 100;
      tallowance = (bsal * 20) / 100;
      mbonus = (bsal * 15) / 100;
    } else {
      tax = (bsal * 2) / 100;
      tallowance = (bsal * 10) / 100;
      mbonus = (bsal * 10) / 100;
    }

    const nsal = bsal + (tallowance + mbonus - (tax + etf + epf));

    const validEmployee = emp && emp.find((e) => e.name === employeeName);
    if (!validEmployee) {
      setNameError("Invalid employee name");
      return;
    }

    setJobRole(jobRole);
    setBsal(bsal);
    setTax(tax);
    setTallowance(tallowance);
    setMbonus(mbonus);
    setEtf(etf);
    setEpf(epf);
    setNsal(nsal);
  }

  function Generate() {
    const doc = new jsPDF();
    const data = [
      ["Employee Name", `${employeeName}`],
      ["Job Role", `${jobRole}`],
      ["Basic Salary", `${bsal} Rupees`],
      ["Tax", `${tax} Rupees`],
      ["ETF", `${etf} Rupees`],
      ["EPF", `${epf} Rupees`],
      ["Transport Allowance", `${tallowance} Rupees`],
      ["Monthly Bonus", `${mbonus} Rupees`],
      ["Net Salary", `${nsal} Rupees`],
    ];

    doc.setFont("times", "bold");
    doc.setFontSize(25);
    doc.text("Salary Details", 10, 10);

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const tableProps = {};

    // Generate the table
    doc.autoTable({
      head: [["Description", "Amount"]],
      body: data,
      ...tableProps,
    });

    // Save the document
    doc.save("salary.pdf");
  }

  return (
    <div className="center">
      <h1>SALARY CALCULATOR</h1>
      <form>
        <div className="inputbox">
          <input type="text" required 
          onChange={(event) => {
            setJobRole(event.target.value);
            setNameError("");
          }}/>
          <span>Employee Job Role</span>
        </div>
        <div className="inputbox">
          <input
            type="text"
            onChange={(event) => {
              setEmployeeName(event.target.value);
              setNameError("");
            }}
            required
          />
          <span>Employee Name</span>

          {nameError && <p className="error">{nameError}</p>}
        </div>
        <div className="inputbox">
          <input
            type="number"
            required
            onChange={(event) => {
              setHours(event.target.value);
            }}
          />
          <span>Working Hours</span>
        </div>
        <div className="inputbox">
          <input
            type="number"
            required
            onChange={(event) => {
              setRate(event.target.value);
            }}
          />
          <span>Hourly Rate (Rupees)</span>
        </div>
        <div className="inputbutton">
          <input type="button" onClick={Calculation} value="Calculate Salary" />
        </div>
        <div className="inputbox">
          <input type="text" required value={bsal} />
          <span>Basic Salary (Rupees)</span>
        </div>
        <div className="inputbox">
          <input type="text" required value={tax} />
          <span>Tax (Rupees)</span>
        </div>
        <div className="inputbox">
          <input type="text" required value={etf} />
          <span>ETF (Rupees)</span>
        </div>
        <div className="inputbox">
          <input type="text" required value={epf} />
          <span>EPF (Rupees)</span>
        </div>
        <div className="inputbox">
          <input type="text" required value={tallowance} />
          <span>Transport Allowance (Rupees)</span>
        </div>
        <div className="inputbox">
          <input type="text" required value={mbonus} />
          <span>Monthly Bonus (Rupees)</span>
        </div>
        <div className="inputbox">
          <input type="text" required value={nsal} />
          <span>Net Salary (Rupees)</span>
        </div>

        <div className="inputbutton">
          <input
            type="button"
            onClick={Generate}
            value="Generate Salary Report"
          />
        </div>
      </form>
    </div>
  );
}

export default SalaryReport;
