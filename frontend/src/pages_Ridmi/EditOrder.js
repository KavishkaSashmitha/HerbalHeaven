import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Option, Select } from "@material-tailwind/react";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";

export default function EditOrder() {
  const { id } = useParams();
  const [state, setState] = useState();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/orders/order/${id}`
      );
      if (response.data) {
        setState(response.data.order);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const submit = useCallback(
    async (e) => {
      await axios.put(`http://localhost:8070/api/orders/order/update/${id}`, {
        ...state,
      });
      fetchData();
      navigate("/admin-orders");
    },
    [fetchData, id, navigate, state]
  );
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  if (!state) {
    return <div className="container mx-auto mt-10">Loading...</div>;
  }
  return (
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
        <div className="flex flex-col flex-1 ">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <Card className="flex flex-col flex-1 ml-2">
            <div className="container mx-auto mt-10">
              <h2 className="text-2xl font-bold mb-5">Order Details</h2>
              <div className="bg-light-green-100 shadow-md rounded-lg px-8 py-6">
                <div className="mb-4">
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Customer Name:</span>{" "}
                    {state.user}
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Shipping Address:</span>{" "}
                    {state.shippingAddress.address},{" "}
                    {state.shippingAddress.city}, {state.shippingAddress.zip}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Payment Status:</span>
                    <Select
                      className=""
                      value={state.paymentStatus}
                      onChange={(e) =>
                        setState((cs) => ({
                          ...cs,
                          paymentStatus: e,
                        }))
                      }
                      label="Select Payment Status"
                    >
                      <Option value="Paid">Paid</Option>
                      <Option value="Unpaid">Unpaid</Option>
                      <Option value="COD">COD</Option>
                    </Select>
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Order Status:</span>
                    <Select
                      className=""
                      value={state.orderStatus}
                      onChange={(e) =>
                        setState((cs) => ({
                          ...cs,
                          orderStatus: e,
                        }))
                      }
                      label="Select Order Status"
                    >
                      <Option value="Preparing">Preparing</Option>
                      <Option value="Delivering">Delivering</Option>
                      <Option value="Canceled">Canceled</Option>
                    </Select>
                  </p>
                </div>
                <p className="flex items-center">
                  <span className="font-bold mr-2">Total:</span> Rs.
                  {state.total}
                </p>
                <h4 className="text-lg font-bold mt-3">Items:</h4>
                <ul>
                  {state.items.map((item, index) => (
                    <li key={index} className="text-blue-900">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={submit}
              >
                Update Status
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
