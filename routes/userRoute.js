const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const userAuthentication = require("../middleware/auth");

router.put(
  "/saveUser/:id",
  userAuthentication.authenticate,
  userController.saveUser
);

router.get(
  "/getUser/:id",
  userAuthentication.authenticate,
  userController.getUser
);

module.exports = router;
