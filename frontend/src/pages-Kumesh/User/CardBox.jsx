// import React from "react";
// import "./CardDetails.css";
// function CardBox(props) {
//   const { address, cardholdername, cardnumber } = props.card;

//   return (
//     <div>
//       <div className="card-details-box">
//         <div className="card-set-pay">
//           <h1 className="card-num">{cardnumber}</h1>
//           <p>{address}</p>
//           <p>{cardholdername}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardBox;

import React from "react";
import "./CardDetails.css";

function CardBox(props) {
  const { address, cardholdername, cardnumber } = props.card;

  // Get the last four digits of the card number
  const lastFourDigits = cardnumber.slice(-4);

  // Replace the rest of the digits with 'x'
  const maskedCardNumber = "xxxx xxxx xxxx " + lastFourDigits;

  return (
    <div>
      <div className="card-details-box">
        <div className="card-set-pay">
          <h1 className="card-num">{maskedCardNumber}</h1>
          <p>{address}</p>
          <p>{cardholdername}</p>
        </div>
      </div>
    </div>
  );
}

export default CardBox;
