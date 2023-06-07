const express = require("express");
const router = express.Router();
const controller = require("../controllers/peopleController");

router.route("/").post(controller.createPerson);

module.exports = router;
