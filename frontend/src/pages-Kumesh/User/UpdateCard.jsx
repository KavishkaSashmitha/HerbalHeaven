import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SidebarWithBurgerMenu } from '../../components/navBar';
function UpdateCard() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const _id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/cards/${_id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.card));
    };
    fetchHandler();
  }, [_id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/cards/${_id}`, {
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
        alert("Card details Update successfully!");
        history("/carddetails");
      })
      .catch((err) => {
        console.error("Error adding card details:", err);
      });
  };
  return (
    <div>
       <SidebarWithBurgerMenu />
      <div className="Payment-full-box">
        <div className="Payment-full-box-set">
          <div>
            <p className="main-para">Update Your Card Details</p>
            {inputs && (
              <form onSubmit={handleSubmit}>
                <div className="method-set-card">
                  <div className="bil-box">
                    <h1 className="main-topic-bil">
                      <span className="number">1</span>Biling Info
                    </h1>
                    <label className="paymnt-lable">FULL NAME</label>
                    <br></br>
                    <input
                      className="paymnt-inpt"
                      type="text"
                      name="fullname"
                      placeholder="John Doe"
                      value={inputs.fullname}
                      onChange={handleChange}
                      required
                    ></input>
                    <br></br>
                    <label className="paymnt-lable">BILLING ADDRESS</label>
                    <br></br>
                    <input
                      className="paymnt-inpt"
                      type="text"
                      name="address"
                      value={inputs.address}
                      onChange={handleChange}
                      placeholder="abc/25/abc"
                      required
                    ></input>
                    <br></br>
                    <div className="method-set-card-form">
                      <div>
                        <label className="paymnt-lable">CITY</label>
                        <br></br>
                        <input
                          className="paymnt-inpt-two"
                          type="text"
                          name="city"
                          value={inputs.city}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        ></input>
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
                          placeholder="1234"
                          required
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
                      <option value="afghanistan">Afghanistan</option>
                      <option value="albania">Albania</option>
                      <option value="brazil">Brazil</option>
                      <option value="canada">Canada</option>
                      <option value="denmark">Denmark</option>
                      <option value="egypt">Egypt</option>
                      <option value="france">France</option>
                      <option value="germany">Germany</option>
                      <option value="india">India</option>
                      <option value="sri_lanka">Sri Lanka</option>
                    </select>
                  </div>
                  <div className="bil-box">
                    <h1 className="main-topic-bil">
                      <span className="number">2</span>Credit Card Info
                    </h1>
                    <label className="paymnt-lable">CARDHOLDER NAME</label>
                    <br></br>
                    <input
                      className="paymnt-inpt"
                      type="text"
                      value={inputs.cardholdername}
                      onChange={handleChange}
                      name="cardholdername"
                      placeholder="John Doe"
                      required
                    ></input>
                    <br></br>
                    <label className="paymnt-lable">CARD NUMBER</label>
                    <br></br>
                    <input
                      className="paymnt-inpt"
                      type="text"
                      value={inputs.cardnumber}
                      onChange={handleChange}
                      name="cardnumber"
                      placeholder="5645-6456-7665-0456"
                      required
                    ></input>
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
                          min="1900"
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
                      maxLength={3}
                      pattern="[0-9]*"
                    ></input>
                  </div>
                </div>

                <div className="end-btn">
                  <button className="btn-pro">Update</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCard;
