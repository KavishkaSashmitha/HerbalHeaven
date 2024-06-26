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

const URL = "http://localhost:8070/cards/get/usercards";

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
    fetchHandler(token).then((data) => setCards(data.card));
  }, [token]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Card Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"), //alert
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
          <div className="card-layout">
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
                <tbody>
                  <tr className="card-tr">
                    {cards &&
                      cards.map((card, i) => (
                        <td key={i}>
                          <Card card={card} />
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
