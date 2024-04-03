import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { SidebarWithBurgerMenu } from "../components/navBar";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/sup/getEmployees")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8070/sup/deleteEmployee/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.age.toString().includes(searchTerm.toLowerCase()) ||
      user.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-image01">
      <SidebarWithBurgerMenu />
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700  ">
        <div class="flex items-center justify-between gap-8 mb-8">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "",
            }}
          >
            <Card className="w-full max-w-4xl p-5 border-blue-gray-100 bg-blue-gray-50/50">
              <h1>List of Suppliers</h1>
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 border-blue-gray-100 bg-blue-gray-50/50"
              />


                <table className="w-full min-w-max table-auto text-left border-blue-gray-100 bg-blue-gray-50/50">
                  <thead>
                    <tr>
                      {[
                        "Name",
                        "Email",
                        "Age",
                        "Raw  Material",
                        "Country",
                        "Mobile",
                        "Address",
                        "Action",
                      ].map((head, index) => (
                        <th
                          key={index}
                          className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70 border-blue-gray-100 bg-blue-gray-50/50"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className=" border-blue-gray-100 bg-blue-gray-50/50"

                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70 border-blue-gray-100 bg-blue-gray-50/50"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className=" border-blue-gray-100 bg-blue-gray-50/50"
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          className="font-normal border-blue-gray-100 bg-blue-gray-50/50"
                        >
                          {user.email}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.age}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.jobRole}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.mobile}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.address}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/sup/update/${user._id}`}
                          className="btn btn-warning"
                        >
                          <Button color="blue">Update</Button>
                        </Link>
                        <Button
                          color="red"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to="/sup/addsup">
                <Button
                  color="amber"
                  className="py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Add New Supplier
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
