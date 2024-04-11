import React from "react";
import "./Income.css";

function NetIncome(props) {
  const { orderId, user, paymentStatus, orderStatus, total, shippingAddress } = props.orders || {};
  
  return (
    <tr>
      <td className="table_income_th">
        <p className="sub_par_dis">{orderId || '-'}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">{user || '-'}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">{paymentStatus || '-'}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">{orderStatus || '-'}</p>
      </td>
      <td className="table_income_th">
        <p className="sub_par_dis">{total ? `$${total.toFixed(2)}` : '-'}</p>
      </td>   
      <td className="table_income_th">
        <p className="sub_par_dis">{shippingAddress || '-'}</p>
      </td>
    </tr>
  );
}

export default NetIncome;
