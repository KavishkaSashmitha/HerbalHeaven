const router = require("express").Router();
const supController = require("../controllers/supController");

router.post("/addsup", supController.addsup);

router.get("/getSuppliers", supController.getSuppliers);

router.get("/getSupplier/:id", supController.getSupplier);

router.put("/updateSupplier/:id", supController.updateSupplier);

router.delete("/deleteSupplier/:id", supController.deleteSupplier);

module.exports = router;
