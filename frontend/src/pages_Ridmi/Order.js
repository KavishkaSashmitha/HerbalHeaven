import React, { Component } from 'react'
import axios from 'axios';


export default class Order extends Component {
  constructor(props){
    super(props);

    this.state={
      orders:[]
    };    

  }

  componentDidMount(){
    this.retriveOrder()
}

retriveOrder(){
    axios.get("http://localhost:8070/api/orders/orders").then((res) =>{
        if(res.data.success){
            this.setState({
                orders:res.data.existingOrders
            })

            console.log(this.state.orders)
        }
      });
    }


    onDelete= (id) => {
      axios.delete(`/order/delete/${id}`).then((res) =>{
        alert("Deleted successfully");
        this.retriveOrder();
      })
    }

    filterData(orders,searchKey){

      const result = orders.filter((order) =>
      order.Ord_name.toLowerCase().includes(searchKey)||
      order.c_name.toLowerCase().includes(searchKey)||
      order.c_mobile.toLowerCase().includes(searchKey)||
      order.c_mail.toLowerCase().includes(searchKey)||
      order.Ord_Quantity.toLowerCase().includes(searchKey)||
      order.Shipping_Address.toLowerCase().includes(searchKey)
 
      )
      
      this.setState({orders:result})

    }



    handleSearchArea = (e) => {
      const searchKey = e.currentTarget.value;

      axios.get("/orders").then((res) =>{
        if(res.data.success){

          this.filterData(res.data.existingOrders,searchKey)
        }
      });
    }


  render() {
    return (

      <div className = "container">
      <div classname="row">
        <div classname = "col-lg-9 mt-2 mb-2">
          <h4>All Orders List</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2" style={{marginLeft:'960px'}}>
            <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={this.handleSearchArea}>

            </input>
          </div>
      </div>


       <table className = "table table-hover" style={{marginTop:'40px'}}>
        <thead>
          <tr>
            <th scope = "col">ID</th>
            <th scope = "col">Item Name</th>
            <th scope = "col">Customer Name</th>
            <th scope = "col">Mobile number</th>
            <th scope = "col">E mail Address</th>
            <th scope = "col">Quantity</th>
            <th scope = "col">Shipping Address</th>
            <th scope = "col">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map((orders,index) =>(
            <tr key = {index}>
              <th scope="row">{index+1}</th>
              <td>
                <a href = {`/order/${orders._id}`} style={{textDecoration:'none'}}>
                {orders.Ord_name}
              </a>
              </td>
              <td>{orders.c_name}</td> 
              <td>{orders.c_mobile}</td>
              <td>{orders.c_mail}</td>
              <td>{orders.Ord_Quantity}</td>
              <td>{orders.Shipping_Address}</td>
              
              <td>
                <a className ="btn btn-warning" href={`/edit/${orders._id}`}>
                  <i className ="fas fa-edit"></i>&nbsp;EDIT
                </a>

                &nbsp;   

                <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(orders._id)}>
                  <i className ="fas fa-trash-alt"></i>&nbsp;DELETE
                </a>

              </td>
            </tr>
          ))}
        </tbody>


       </table>

       <button className = "btn btn-success"><a href = "/add" style ={{textDecoration:'none', color:'white'}}>Add New Order</a></button>

      </div>
    )
  }
}
