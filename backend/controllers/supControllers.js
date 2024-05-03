const Emp = require("../model/supModel");

const supController = {
  //create new suppliers

  //req ekn body ek gnnwa.req ekn body ek arn data base eke store krl record ek add krnw.success unoth res ek succes kiyl ywnwa nethnm error msg kk display krnwa.
  addsup: async (req, res) => {
    try {
      const {
        name,
        email,
        rawMaterial1,
        rawMaterial2,
        rawMaterial3,
        mobile,
        address,
      } = req.body;

      if (
        !name ||
        !email ||
        !rawMaterial1 ||
        !rawMaterial2 ||
        !rawMaterial3 ||
        !mobile ||
        !address
      )
        return res.status(400).json({ msg: "Please fill the all fields." });

      const newEmp = new Emp({
        name,
        email,

        rawMaterial1,
        rawMaterial2,
        rawMaterial3,

        mobile,
        address,
      });

      await newEmp.save();

      return res.status(200).json({ msg: "Employee successfully added." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //read all suppliers details

  getEmployees: async (req, res) => {
    try {
      const employees = await Emp.find();
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //view only one suppliers details

  getEmployee: async (req, res) => {
    try {
      const emp = await Emp.findById(req.params.id);
      return res.status(200).json(emp);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //update suppliers details

  updateEmployee: async (req, res) => {
    try {
      const {
        name,
        email,
        rawMaterial1,
        rawMaterial2,
        rawMaterial3,
        mobile,
        address,
      } = req.body;
      await Emp.findByIdAndUpdate(req.params.id, {
        name,
        email,

        rawMaterial1,
        rawMaterial2,
        rawMaterial3,

        mobile,
        address,
      });

      return res.status(200).json({ msg: "Record succesfully update." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //delete suppliers

  deleteEmployee: async (req, res) => {
    try {
      const emp = await Emp.findByIdAndDelete(req.params.id);
      if (!emp) return res.status(400).json({ msg: "No employee records!" });

      return res.status(200).json({ msg: "Succesfully deleted." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //update payment

  updatePayment: async (req, res) => {
    try {
      const { payment } = req.body;
      await Emp.findByIdAndUpdate(req.params.id, {
        payment,
      });

      return res.status(200).json({ msg: "Record succesfully update." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllPyment: async (req, res, next) => {
    let employees;
    try {
      employees = await Emp.find();
    } catch (err) {
      console.log(err);
    }
    if (!employees) {
      return res.status(404).json({ message: "employees not found" });
    }
    return res.status(200).json({ employees });
  },
};

module.exports = supController;
