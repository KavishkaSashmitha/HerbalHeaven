import React, { useState } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../components/navBar";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/sup/addsup", {
        name,
        email,
        age,
        rawMaterial,
        quantity,
        mobile,
        address,
      })
      .then((result) => {
        console.log(result);
        navigate("/sup");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-image01">
      <SidebarWithBurgerMenu />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "",
        }}
      >
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="white"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="black">
              Add New Suppliers
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              size="lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Age"
              size="lg"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              label="Raw Material"
              size="lg"
              value={rawMaterial}
              onChange={(e) => setRawMaterial(e.target.value)}
            />
            <Input
              label="Quantity"
              size="lg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              label="Mobile"
              size="lg"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Input
              label="Address"
              size="lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <button
              class="m-2 relative select-none rounded-lg bg-orange-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              onClick={Submit}
            >
              &nbsp;Add New Supplier
            </button>
            {/* <Button onClick={Submit} variant="gradient" fullWidth>
            Submit
          </Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default CreateUser;
