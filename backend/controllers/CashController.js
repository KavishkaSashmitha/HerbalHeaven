const Cash = require("../model/CashModel");

//Insert cash Details
const addCash = async (req, res, next) => {
  const { fullname, address, city, zip, country } = req.body;

  let cash;

  try {
    cash = new Cash({
      fullname,
      address,
      city,
      zip,
      country,
    });
    await cash.save();
  } catch (err) {
    console.log(err);
  }
  if (!cash) {
    return res.status(404).json({ message: "Unable to Add cash" });
  }
  return res.status(200).json({ cash });
};

exports.addCash = addCash;
