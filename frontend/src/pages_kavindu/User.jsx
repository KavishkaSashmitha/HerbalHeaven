import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/emp/getEmployees")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/emp/deleteEmployee/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="w-full max-w-4xl p-5">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {[
              "Name",
              "Email",
              "Age",
              "Category",
              "Mobile",
              "Address",
              "Action",
            ].map((head, index) => (
              <th
                key={index}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="even:bg-blue-gray-50/50">
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
                  color="blue-gray"
                  className="font-normal"
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
                  to={`/emp/update/${user._id}`}
                  className="btn btn-warning"
                >
                  <Button color="Blue">Update</Button>
                </Link>
                <Button color="red" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/emp/add" className="btn btn-primary">
        <Button color="Blue">Add New Suppliers</Button>
      </Link>
    </Card>
  );
};

export default User;
