// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.post("/:userId/friends/:friendId", userController.addFriend);
router.delete("/:userId/friends/:friendId", userController.removeFriend);

module.exports = router;
