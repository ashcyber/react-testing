const express = require("express");
const router = express.Router();
const userCtrl = require("./users.controller");

router.get("/users", userCtrl.getUsers);
router.post("/users", userCtrl.createUser);
router.delete("/users/:id", userCtrl.deleteUser);

module.exports = router;
