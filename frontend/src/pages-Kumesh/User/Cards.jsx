import React, { useEffect, useState, useRef } from "react";
import Card from "../User/CardDetails";
import CardBox from "./CardBox";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../../components/navBar";
import { FaAddressCard } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { useAuth } from "../../middleware/authContext";
const URL = "http://localhost:8070/cards";

const fetchHandler = async (token) => {
  return await axios
    .get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
function Cards() {
  const { token } = useAuth();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchHandler(token).then((data) => setCards(data.cards));
  }, [token]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Card Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"), //alret
  });
  return (
    <div>
      <SidebarWithBurgerMenu />
      <div className="ful-set-pay">
        <div className="ful-set-pay-card">
          <div className="btn-set-rwo">
            <Link to="/addnewcard">
              <button className="add-pay-btn">
                <FaAddressCard className="add-pay-btn-icon" />
                Add New Card
              </button>
            </Link>
            {/* <button className="add-pay-btn">
              <RiBankFill className="add-pay-btn-icon" />
              Add New Bank Account
            </button> */}
            <button className="add-pay-btn" onClick={handlePrint}>
              Download Card Details Report
            </button>
          </div>
          <div ref={componentRef}>
            <div className="card-details-box">
              {cards &&
                cards.map((card, i) => (
                  <div key={i}>
                    <CardBox card={card} />
                  </div>
                ))}
            </div>
            <div className="card-table-full">
              <table className="card-table">
                <th className="card-thead">
                  <th className="card-th" scope="col">
                    Card holder name
                  </th>
                  <th className="card-th" scope="col">
                    Address
                  </th>

                  <th className="card-th" scope="col">
                    ACTIONS
                  </th>
                </th>

                <tr className="card-tr">
                  {cards &&
                    cards.map((card, i) => (
                      <div key={i}>
                        <Card card={card} />
                      </div>
                    ))}
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
