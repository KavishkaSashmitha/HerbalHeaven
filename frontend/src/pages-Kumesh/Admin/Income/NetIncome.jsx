import React from "react";
import "./Income.css";
function NetIncome(props) {
  const { _id, name, quantity, price } = props.cart;
  const Total = quantity*price;
  return (
    <tr>
      <td className="table_income_th">
        <p className="sub_par_dis">{name}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">{quantity}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">Rs.{price}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">Rs.{Total}</p>
      </td>
    </tr>
  );
}

export default NetIncome;
