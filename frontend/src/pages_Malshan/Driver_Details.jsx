import React, { Component } from 'react';
import axios from 'axios';

export default class Driver_Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transport: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/api/transports/transport/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          transport: res.data.transport
        });
      }
    });
  }

  render() {
    const { d_name, d_mobile, dob, gender, vehicle_type, vehicle_No } = this.state.transport;

    return (

      <div className="max-w-screen-md mx-auto mt-4">
        <h1 style={{ fontSize: '30px', fontWeight: '650' }}>Driver Details</h1>
      
      <div className="max-w-screen-md mx-auto mt-20">
      
        <h4 className="text-2xl font-semibold">{d_name}</h4>
        <hr className="my-4 border-gray-300" />

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          <div className="py-2">
            <dt className="font-semibold">Name</dt>
            <dd>{d_name}</dd>
          </div>

          <div className="py-2">
            <dt className="font-semibold">Mobile Number</dt>
            <dd>{d_mobile}</dd>
          </div>

          <div className="py-2">
            <dt className="font-semibold">Date of Birth</dt>
            <dd>{dob}</dd>
          </div>

          <div className="py-2">
            <dt className="font-semibold">Gender</dt>
            <dd>{gender}</dd>
          </div>

          <div className="py-2">
            <dt className="font-semibold">Vehicle Type</dt>
            <dd>{vehicle_type}</dd>
          </div>

          <div className="py-2">
            <dt className="font-semibold">Vehicle Number</dt>
            <dd>{vehicle_No}</dd>
          </div>
        </dl>
      </div>
      </div>
    );
  }
}
