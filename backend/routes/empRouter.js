const router = require("express").Router();
const empController = require("../controllers/empController");

router.post("/add", empController.add);

router.get("/getEmployees", empController.getEmployees);

router.get("/getEmployee/:id", empController.getEmployee);

router.put("/updateEmployee/:id", empController.updateEmployee);

router.delete("/deleteEmployee/:id", empController.deleteEmployee);

module.exports = router;
