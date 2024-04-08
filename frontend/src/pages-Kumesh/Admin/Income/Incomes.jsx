import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cartdetails from "./NetIncome";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { FaAddressCard } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8070/api/user/cart/admin/cart";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function Incomes() {
  const [cart, setCarts] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setCarts(data.cart));
  }, []);
  console.log(cart);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"), //alret
  });
  return (
    <div>
      <SidebarWithBurgerMenu />
      <button onClick={handlePrint} className="dwon_repot_income"> Download Report</button>
      <div ref={componentRef} >
      <h1 className="income_topic">Income Details</h1>
      <div className="tbl_continer_incme">
        <table className="table_income">
          <thead>
            <tr className="table_income_tr">
              <th className="table_income_th">Name</th>
              <th className="table_income_th">quantity</th>
              <th className="table_income_th">price</th>
              <th className="table_income_th">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((cart, i) => <Cartdetails key={i} cart={cart} />)}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default Incomes;
