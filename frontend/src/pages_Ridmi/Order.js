import React, { useState, useEffect } from "react";
import axios from "axios";

export function getStatusColor(status) {
  switch (status) {
    case "Paid":
    case "Delivered":
      return "text-green-900 bg-green-500/20";
    case "Canceled":
    case "Unpaid":
      return "text-red-900 bg-red-500/20";
    case "Preparing":
      return "text-blue-900 bg-blue-500/20";
    default:
      return "";
  }
}

export default function Order() {
  const [orders, setOrders] = useState([]);

  function retriveOrder() {
    axios.get("http://localhost:8070/api/orders/orders").then((res) => {
      if (res.data.success) {
        setOrders(res.data.existingOrders);
      }
    });
  }

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8070/api/orders/order/delete/${id}`)
      .then((_res) => {
        alert("Deleted successfully");
        retriveOrder();
      });
  };

  useEffect(() => {
    retriveOrder();
  }, []);

  function filterData(orders, searchKey) {
    const result = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchKey) ||
        order.user.toLowerCase().includes(searchKey) ||
        order.shippingAddress.toLowerCase().includes(searchKey) ||
        order.total.toLowerCase().includes(searchKey)
    );

    setOrders(result);
  }

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/api/orders/orders").then((res) => {
      if (res.data.success) {
        filterData(res.data.existingOrders, searchKey);
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h4>All Orders List</h4>
        </div>
        <div className="col-lg-3 mt-2 mb-2" style={{ marginLeft: "960px" }}>
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={handleSearchArea}
          ></input>
        </div>
      </div>

      <table class="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Order ID
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Customer Name
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Shipping Address
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Payment Status
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Order Status
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Items
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Total
              </p>
            </th>
            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
              <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="flex items-center gap-3">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {order.orderId}
                  </p>
                </div>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {order.user}
                </p>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {order.shippingAddress}
                </p>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="w-max">
                  <div
                    class={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${getStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    <span class="">{order.paymentStatus}</span>
                  </div>
                </div>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="w-max">
                  <div
                    class={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    <span class="">{order.orderStatus}</span>
                  </div>
                </div>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="flex items-center gap-3">
                  <div class="flex flex-col">
                    <ul>
                      {order.items.map((m) => (
                        <li className="block font-sans text-sm antialiased font-normal leading-normal capitalize text-blue-gray-900">
                          {m.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="flex items-center gap-3">
                  <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                    Rs.{order.total}
                  </p>
                </div>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <a className="btn btn-warning" href={`/edit/${order._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;EDIT
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  onClick={() => onDelete(order._id)}
                >
                  <i className="fas fa-trash-alt"></i>&nbsp;DELETE
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
