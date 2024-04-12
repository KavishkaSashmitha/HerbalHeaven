const router = require("express").Router();
const supControllers = require("../controllers/supControllers");
const Sup = require("../model/supModel");

router.post("/addsup", supControllers.addsup);

router.get("/getSuppliers", supControllers.getEmployees);

router.get("/getSupplier/:id", supControllers.getEmployee);

router.put("/updateSupplier/:id", supControllers.updateEmployee);

router.delete("/deleteSupplier/:id", supControllers.deleteEmployee);

router.delete("/updatePayment/:id", supControllers.updatePayment);

//cost
router.put("/materialCost/:id", (req, res) => {
  const { id } = req.params;
  const { month, amount } = req.body;

  const matcostUpdate = { [`materialCost.${month.toLowerCase()}`]: amount };
  Sup.findByIdAndUpdate(id, {
    $set: matcostUpdate,
  })
    .then(() => {
      return res.status(200).json({
        success: "Updated Syccesfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

module.exports = router;
