const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.route("/").post(controller.createUser);
router.route("/login").post(controller.login);
router.route("/:id").put(controller.updateUser);

module.exports = router;
