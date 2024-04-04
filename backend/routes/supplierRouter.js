const router = require("express").Router();
const supControllers = require("../controllers/supControllers");

router.post("/addsup", supControllers.addsup);

router.get("/getSuppliers", supControllers.getEmployees);

router.get("/getSupplier/:id", supControllers.getEmployee);

router.put("/updateSupplier/:id", supControllers.updateEmployee);

router.delete("/deleteSupplier/:id", supControllers.deleteEmployee);

module.exports = router;
