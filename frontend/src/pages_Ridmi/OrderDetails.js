import React, { Component } from 'react'
import axios from 'axios';

export default class OrderDetails extends Component {
  constructor(props){
    super(props);
      this.state = {
        order:{}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/order/${id}`).then((res)=> {
      if(res.data.success){
        this.setState({
          order:res.data.order
        });

        console.log(this.state.order);
      }
    })
  }

  render() {

    const {Ord_name,c_name,c_mobile,c_mail,Ord_Quantity,Shipping_Address} = this.state.order;

    return (
      <div style ={{marginTop:'20px'}} className='container' > 
        <h4>{Ord_name}</h4>
        <hr/>

        <dl className ="row">
          <dt className="col-sm-3">Item</dt>
          <dd className="col-sm-9">{Ord_name}</dd>

          <dt className="col-sm-3">customer Name</dt>
          <dd className="col-sm-9">{c_name}</dd>

          <dt className="col-sm-3">Mobile no.</dt>
          <dd className="col-sm-9">{c_mobile}</dd>

          <dt className="col-sm-3">E-mail Address</dt>
          <dd className="col-sm-9">{c_mail}</dd>

          <dt className="col-sm-3">Quantity</dt>
          <dd className="col-sm-9">{Ord_Quantity}</dd>

          <dt className="col-sm-3">Shipping Address</dt>
          <dd className="col-sm-9">{Shipping_Address}</dd>

        </dl>

        
      </div>
    )
  }
}
