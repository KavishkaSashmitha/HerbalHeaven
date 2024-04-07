// SupplierReport.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Footer } from "../components/Footer";

const SupplierReport = () => {
  // Correcting the component name
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const calculateTotalPayment = () => {
    const totalPayment = quantity * unitPrice;
    return isNaN(totalPayment) ? "" : totalPayment.toFixed(2);
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <h1>Supplier Report</h1>
        <div className="mb-4">
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
          <p>Total Payment: {calculateTotalPayment()}</p>
        </div>
        <Link to="/sup">
          <Button color="blue-gray">Back</Button>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default SupplierReport; // Correcting the export name
