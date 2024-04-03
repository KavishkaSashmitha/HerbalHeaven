const router = require("express").Router();
const supControllers = require("../controllers/supControllers");

router.post("/addsup", supControllers.addsup);

router.get("/getEmployees", supControllers.getEmployees);

router.get("/getEmployee/:id", supControllers.getEmployee);

router.put("/updateEmployee/:id", supControllers.updateEmployee);

router.delete("/deleteEmployee/:id", supControllers.deleteEmployee);

module.exports = router;
