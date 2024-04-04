import React, { Component } from 'react';
import axios from 'axios';

export default class Transport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transports: [],
    };
  }

  componentDidMount() {
    this.retrieveTransport();
  }

  retrieveTransport() {
    axios.get("http://localhost:8070/api/transports/transports").then((res) => {
      if (res.data.success) {
        this.setState({
          transports: res.data.existingTransports,
        });
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/transport/delete/${id}`).then((res) => {
      alert("Deleted successfully");
      this.retrieveTransport();
    });
  }

  filterData(transports, searchKey) {
    const result = transports.filter((transport) =>
      transport.d_name.toLowerCase().includes(searchKey) ||
      transport.d_mobile.toLowerCase().includes(searchKey) ||
      transport.dob.toLowerCase().includes(searchKey) ||
      transport.gender.toLowerCase().includes(searchKey) ||
      transport.vehicle_type.toLowerCase().includes(searchKey) ||
      transport.vehicle_No.toLowerCase().includes(searchKey)
    );

    this.setState({ transports: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/transports").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingTransports, searchKey);
      }
    });
  }

  render() {
    return (
      <div className="center" style={{ marginLeft: '25%' }}>
        <div className="row">
          <h1 style={{ fontSize: '30px', fontWeight: '650' }}>All Drivers List</h1>
          <div className="mt-2 mb-2 lg:col-span-3 lg:ml-auto" style={{ marginLeft: '75%', height: '40px' }}>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md lg:w-auto focus:outline-none"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea} />
          </div>
        </div>

        &nbsp;
        &nbsp;

        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Driver Name</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Vehicle Type</th>
              <th className="px-4 py-2">Vehicle Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transports.map((transport, index) => (
              <tr key={index}>
                <td className="px-4 py-1 border-0">{index + 1}</td>
                <td className="px-4 py-2 border-0">
                  <a href={`/transport/${transport._id}`} className="text-blue-500 hover:underline">
                    {transport.d_name}
                  </a>
                </td>
                <td className="px-0 py-0 border-0" style={{ textAlign: "center" }}>{transport.d_mobile}</td>
                <td className="px-4 py-2 border-0" style={{ textAlign: 'left' }}>{transport.gender}</td>
                <td className="px-4 py-2 border-0" style={{ textAlign: 'left' }}>{transport.vehicle_type}</td>
                <td className="px-4 py-2 border-0" style={{ textAlign: 'left' }}>{transport.vehicle_No}</td>
                <td className="px-4 py-2 border-0">
                  <a className="relative inline-block btn btn-warning" style={{ color: '#33542d' }} href={`/edit/${transport._id}`}>
                    <i className="mr-1 fas fa-edit"></i>
                  </a>

                  &nbsp;
                  &nbsp;

                  <button className="relative inline-block btn btn-danger" style={{ color: 'red' }} onClick={() => this.onDelete(transport._id)}>
                    <i className="mr-1 fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        &nbsp;
        &nbsp;

        <button
          className="flex select-none items-center gap-3 rounded-lg bg-green-700 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            strokeWidth="5" className="w-4 h-4">
            <path
              d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
            </path>
          </svg>
          <a href="/add" style={{ textDecoration: 'none', color: 'white' }}>Add New Driver</a>
        </button>
      </div>
    );
  }
}
