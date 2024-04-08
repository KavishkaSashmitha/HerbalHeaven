import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { navigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Footer } from "../components/Footer";

const SupplierReport = ({ match }) => {
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [name, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  const { id } = useParams();

  const [totalPayment, setTotalPayment] = useState(0);

  const calculateTotalPayment = () => {
    const total = quantity * unitPrice;
    setTotalPayment(isNaN(total) ? 0 : total.toFixed(2));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8070/sup/getSupplier/${id}`)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);

        setRawMaterial(userData.rawMaterial);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // const handlePayment = () => {
  //   const confirmed = window.confirm("Are you sure you want to update?");
  //   if (confirmed) {
  //     axios
  //       .put(`http://localhost:8070/sup/updatePayment/${id}`, {
  //         payment,
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         navigate("/sup");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

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
