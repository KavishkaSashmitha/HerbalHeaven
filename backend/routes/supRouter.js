const router = require("express").Router();
const supController = require("../controllers/supController");

router.post("/addsup", supController.addsup);

router.get("/getEmployees", supController.getEmployees);

router.get("/getEmployee/:id", supController.getEmployee);

router.put("/updateEmployee/:id", supController.updateEmployee);

router.delete("/deleteEmployee/:id", supController.deleteEmployee);

module.exports = router;
