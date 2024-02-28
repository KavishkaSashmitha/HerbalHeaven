import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function User() {
  const [User, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/emp/getEmployees")
      .then((result) => setUser(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8070/emp/deleteEmployee/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="w=50 bg=white rounded p=3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Category</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {User.map((User) => {
              return (
                <tr key={User._id}>
                  <td>{User.name}</td>
                  <td>{User.email}</td>
                  <td>{User.age}</td>
                  <td>{User.jobRole}</td>
                  <td>{User.mobile}</td>
                  <td>{User.address}</td>
                  <td>
                    <Link
                      to={`/emp/update/${User._id}`}
                      // to="/update"
                      className="btn btn-warning"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(User._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/emp/add" className="btn btn-primary">
          Add New Suppliers
        </Link>
      </div>
    </div>
  );
}

export default User;
