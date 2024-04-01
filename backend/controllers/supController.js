const Supplier = require("../model/supModel");

const supController = {
  //create new supplier

  //req ekn body ek gnnwa.req ekn body ek arn data base eke store krl record ek add krnw.success unoth res ek succes kiyl ywnwa nethnm error msg kk display krnwa.
  addsup: async (req, res) => {
    try {
      const { name, email, age, rawMaterial, quantity, mobile, address } =
        req.body;

      if (
        !name ||
        !email ||
        !age ||
        !rawMaterial ||
        !quantity ||
        !mobile ||
        !address
      )
        return res.status(400).json({ msg: "Please fill the all fields." });

      const newSup = new Supplier({
        name,
        email,
        age,
        rawMaterial,
        quantity,
        mobile,
        address,
      });

      await newSup.save();

      return res.status(200).json({ msg: "Employee successfully added." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //read all suppliers details

  getSuppliers: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      return res.status(200).json(suppliers);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //view only one supplier details

  getSupplier: async (req, res) => {
    try {
      const supp = await Supplier.findById(req.params.id);
      return res.status(200).json(supp);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //update supplier details

  updateSupplier: async (req, res) => {
    try {
      const { name, email, age, rawMaterial, mobile, address } = req.body;
      await Supplier.findByIdAndUpdate(req.params.id, {
        name,
        email,
        age,
        rawMaterial,
        quantity,
        mobile,
        address,
      });

      return res.status(200).json({ msg: "Record succesfully update." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //delete supplier

  deleteSupplier: async (req, res) => {
    try {
      const supp = await Supplier.findByIdAndDelete(req.params.id);
      if (!supp) return res.status(400).json({ msg: "No employee records!" });

      return res.status(200).json({ msg: "Succesfully deleted." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = supController;
