import React, { useState } from "react";
import card from "./img/card.png";
import tic from "./img/tic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SidebarWithBurgerMenu } from '../../components/navBar';
function AddCard() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    fullname: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardholdername: "",
    cardnumber: "",
    expmonth: "",
    expyear: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => {
        alert("Card details added successfully!");
        history("/carddetails");
      })
      .catch((error) => {
        console.error("Error adding card details:", error);
      });
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/cards", {
        fullname: String(inputs.fullname),
        address: String(inputs.address),
        city: String(inputs.city),
        zip: String(inputs.zip),
        country: String(inputs.country),
        cardholdername: String(inputs.cardholdername),
        cardnumber: String(inputs.cardnumber),
        expmonth: String(inputs.expmonth),
        expyear: String(inputs.expyear),
        cvv: String(inputs.cvv),
      })
      .then((res) => res.data);
  };

  return (
    <div>
       <SidebarWithBurgerMenu />
      <div className="Payment-full-box">
        <div className="Payment-full-box-set">
          <div>
            <h1 className="main-tpoic">Add New Card Here..</h1>
            <p className="main-para">Saving the details of your credit/debit card</p>
            <div className="method-set">
              <div className="method-one method-box">
                <img src={tic} alt="tick" className="img-tic" />
                <img src={card} alt="card" className="img-paymt card-pay" />
                <p className="paymnt-topic">Card</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="method-set-card">
                <div className="bil-box">
                  <h1 className="main-topic-bil">
                  <span className="number">1</span>Biling Information
                  </h1>
                  <label className="paymnt-lable">FULL NAME</label>
                  <br></br>
                  <input
  className="paymnt-inpt"
  type="text"
  name="fullname"
  placeholder="Saman Perera"
  value={inputs.fullname}
  onChange={handleChange}
  onKeyPress={(event) => {
    // Check if the pressed key is a number or a special character
    if (/\d|\W/.test(event.key)) {
      event.preventDefault(); // Prevent default behavior (typing the key)
    }
  }}
/>
                  <br></br>
                  <label className="paymnt-lable">BILLING ADDRESS</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="address"
                    value={inputs.address}
                    onChange={handleChange}
                    placeholder="11/16, Wilabada Road, Gampaha."
                    required
                  ></input>
                  <br></br>
                  <div className="method-set-card-form">
                    <div>
                      <label className="paymnt-lable">CITY</label>
                      <br></br>
                      <input
  className="paymnt-inpt"
  type="text"
  name="city"
  placeholder="Gampaha"
  value={inputs.city}
  onChange={handleChange}
  onKeyPress={(event) => {
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  }}
  title="Please enter only letters"
  required
/>
                      <br></br>
                    </div>
                    <div>
                      <label className="paymnt-lable">ZIPCODE</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-two"
                        type="text"
                        name="zip"
                        value={inputs.zip}
                        onChange={handleChange}
                        placeholder="11550"
                        minLength={5}
                        maxLength={5}
                        pattern="[0-9]{5}"  // Use a regular expression to match exactly 5 digits
                        title="Please enter a valid 5-digit ZIP code"
                        required
                        onKeyPress={(event) => {
                          if (!/\d/.test(event.key)) { // If the key pressed is not a digit
                            event.preventDefault(); // Prevent default behavior (typing the key)
                          }
                        }}
                      ></input>
                      <br></br>
                    </div>
                  </div>

                  <label className="paymnt-lable">COUNTRY</label>
                  <br></br>
                  <select
                    name="country"
                    id="country"
                    value={inputs.country}
                    onChange={handleChange}
                    required
                    className="paymnt-inpt"
                  >
                    <option value="" required disabled selected>
                      Select Country
                    </option>
                   
                    <option value="india">India</option>
                    <option value="sri_lanka">Sri Lanka</option>
                  </select>
                </div>
                <div className="bil-box">
                  <h1 className="main-topic-bil">
                    <span className="number">2</span>Credit Card Information
                  </h1>
                  <label className="paymnt-lable">CARDHOLDER NAME</label>
                  <br></br>
                  <input
  className="paymnt-inpt"
  type="text"
  name="fullname"
  placeholder="Saman Perera"
  value={inputs.cardholdername}
  onChange={handleChange}
  onKeyPress={(event) => {
    // Check if the pressed key is a number or a special character
    if (/\d|\W/.test(event.key)) {
      event.preventDefault(); // Prevent default behavior (typing the key)
    }
  }}
/>
                  <br></br>
                  <label className="paymnt-lable">CARD NUMBER</label>
                  <br></br>
                  <input
  className="paymnt-inpt"
  type="text"
  value={inputs.cardnumber}
  onChange={(event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d]/g, ''); // Remove non-numeric characters
    const formattedValue = sanitizedValue.replace(/(\d{4})/g, '$1-').slice(0, 19); // Format to XXXX-XXXX-XXXX-XXXX
    handleChange({ target: { name: 'cardnumber', value: formattedValue } });
  }}
  maxLength={19}
  minLength={19}
  name="cardnumber"
  placeholder="5645645676650456"
  pattern="\d{4}-\d{4}-\d{4}-\d{4}"
  title="Please enter a valid card number in the format XXXX-XXXX-XXXX-XXXX"
  required
  onKeyPress={(event) => {
    if (event.key === '-' || (!/\d/.test(event.key) && event.key !== 'Backspace')) { // If the key pressed is a dash or not a digit (except Backspace)
      event.preventDefault(); // Prevent default behavior (typing the key)
    }
  }}
/>
                  <br></br>
                  <div className="method-set-card-form">
                    <div>
                      <label className="paymnt-lable">EXP MONTH</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-one"
                        type="month"
                        name="expmonth"
                        value={inputs.expmonth}
                        onChange={handleChange}
                        placeholder="Desember 10"
                        required
                      ></input>
                      <br></br>
                    </div>
                    <div>
                      <label className="paymnt-lable">EXP YEAR</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-one"
                        type="number"
                        value={inputs.expyear}
                        onChange={handleChange}
                        id="expyear"
                        name="expyear"
                        required
                        placeholder="YYYY"
                        min="2024"
                        max="2100"
                      ></input>
                      <br></br>
                    </div>
                  </div>
                  <label className="paymnt-lable">CVV NUMBER</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={inputs.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    minLength={3}
                    maxLength={3}
                    pattern="[0-9]*"
                    onKeyPress={(event) => {
                      if (!/\d/.test(event.key)) { // If the key pressed is not a digit
                        event.preventDefault(); // Prevent default behavior (typing the key)
                      }
                    }}
                  ></input>
                </div>
              </div>
              <div className="end-btn">
                <button className="btn-pro">Add Card </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
