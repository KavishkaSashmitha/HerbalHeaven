import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";

export default function EditOrder() {
  const { id } = useParams();
  const [state, setState] = useState();

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
    },
    [fetchData, id, state]
  );

  if (!state) {
    return <div className="container mx-auto mt-10">Loading...</div>;
  }
  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Order Details</h2>
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <p>
          <span className="font-bold">Order ID:</span> {state.orderId}
        </p>
        <p>
          <span className="font-bold">Customer Name:</span> {state.user}
        </p>
        <p>
          <span className="font-bold">Shipping Address:</span>{" "}
          {state.shippingAddress}
        </p>
        <p>
          <span className="font-bold">Payment Status:</span>

          <select
            value={state.paymentStatus}
            onChange={(e) =>
              setState((cs) => ({ ...cs, paymentStatus: e.target.value }))
            }
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="COD">COD</option>
          </select>
        </p>
        <p>
          <span className="font-bold">Order Status:</span>

          <select
            value={state.orderStatus}
            onChange={(e) =>
              setState((cs) => ({ ...cs, orderStatus: e.target.value }))
            }
          >
            <option value="Preparing">Preparing</option>
            <option value="Delivering">Delivering</option>
            <option value="Canceled">Canceled</option>
          </select>
        </p>
        <p>
          <span className="font-bold">Total:</span> Rs.{state.total}
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
      <Button onClick={submit}>Update Status</Button>
    </div>
  );
}
