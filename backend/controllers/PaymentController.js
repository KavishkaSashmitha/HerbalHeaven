const Card = require("../model/paymentModel");

//Get Card Details
const getAllCard = async (req, res, next) => {
  let cards;
  try {
    cards = await Card.find();
  } catch (err) {
    console.log(err);
  }
  if (!cards) {
    return res.status(404).json({ message: "Card not found" });
  }
  return res.status(200).json({ cards });
};

//Insert card Details
const addCard = async (req, res, next) => {
  const {
    fullname,
    address,
    city,
    zip,
    country,
    cardholdername,
    cardnumber,
    expmonth,
    expyear,
    cvv,
  } = req.body;

  let cards;

  try {
    cards = new Card({
      fullname,
      address,
      city,
      zip,
      country,
      cardholdername,
      cardnumber,
      expmonth,
      expyear,
      cvv,
    });
    await cards.save();
  } catch (err) {
    console.log(err);
  }
  if (!cards) {
    return res.status(404).json({ message: "Unable to Add cards" });
  }
  return res.status(200).json({ cards });
};

//Get card Details Using ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let card;

  try {
    card = await Card.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!card) {
    return res.status(404).json({ message: "No card Found" });
  }

  return res.status(200).json({ card });
};

//Update card Details
const updateCard = async (req, res, next) => {
  const id = req.params.id;

  const {
    fullname,
    address,
    city,
    zip,
    country,
    cardholdername,
    cardnumber,
    expmonth,
    expyear,
    cvv,
  } = req.body;

  let cards;
  try {
    cards = await Card.findByIdAndUpdate(id, {
      fullname,
      address,
      city,
      zip,
      country,
      cardholdername,
      cardnumber,
      expmonth,
      expyear,
      cvv,
    });
    cards = await cards.save();
  } catch (err) {
    console.log(err);
  }

  if (!cards) {
    return res.status(404).json({ message: "Unable to update" });
  }
  return res.status(200).json({ cards });
};

const deleteCard = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedCard = await Card.findOneAndDelete({ _id: id });

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
 
    return res.status(200).json({ card: deletedCard });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteCard = deleteCard;
exports.getAllCard = getAllCard;
exports.addCard = addCard;
exports.getById = getById;
exports.updateCard = updateCard;
