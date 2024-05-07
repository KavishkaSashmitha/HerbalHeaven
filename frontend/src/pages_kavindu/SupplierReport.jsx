import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Footer } from "../components/Footer";
import { jsPDF } from "jspdf";

const SupplierReport = () => {
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [name, setName] = useState("");
  const [rawMaterial1, setRawMaterial1] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/sup/getSupplier/${id}`)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);
        setRawMaterial1(userData.rawMaterial1);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const calculateTotalPayment = () => {
    const total = quantity * unitPrice;
    setTotalPayment(isNaN(total) ? 0 : total.toFixed(2));

    // Generate PDF
    // generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(20, 20, `Name: ${name}`);
    doc.text(20, 30, `Raw Material1: ${rawMaterial1}`);
    doc.text(20, 40, `Quantity: ${quantity}`);
    doc.text(20, 50, `Unit Price: ${unitPrice}`);
    doc.text(20, 60, `Total Payment: ${totalPayment}`);
    doc.save("supplier_report.pdf");
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <h1>Supplier Report</h1>
        <div className="mb-4">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
            className="mb-4"
          />
          <Input
            type="text"
            label="Raw Material_01"
            value={rawMaterial1}
            onChange={(e) => setRawMaterial1(e.target.value)}
            disabled
            className="mb-4"
          />
          <Input
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            className="mb-4"
          />
          <Input
            type="number"
            label="Unit Price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
            className="mb-4"
          />
          <p>Total Payment: {totalPayment}</p>
        </div>
        <Button color="blue" onClick={calculateTotalPayment}>
          Calculate Total Payment
        </Button>
        <Button color="blue" onClick={generatePDF}>
          Generate PDF
        </Button>
        <Link to="/sup">
          <Button color="blue-gray">Back</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default SupplierReport;
