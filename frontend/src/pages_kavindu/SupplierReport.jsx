import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Footer } from "../components/Footer";

const SupplierReport = ({ match }) => {
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [name, setName] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  const [errors, setErrors] = useState({});
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateTotalPayment = () => {
    const total = quantity * unitPrice;
    setTotalPayment(isNaN(total) ? 0 : total.toFixed(2));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/sup/getSupplier/${match.params.id}`
        );
        const { name, rawMaterial } = response.data;
        setName(name);
        setRawMaterial(rawMaterial);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };
    fetchData();
  }, [match.params.id]);

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
            label="Raw Material"
            value={rawMaterial}
            onChange={(e) => setRawMaterial(e.target.value)}
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
        <Link to="/sup">
          <Button color="blue-gray">Back</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default SupplierReport;
