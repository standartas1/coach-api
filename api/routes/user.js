const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

//Create a new user
router.post("/signup", UserController.user_signup);

//Login
router.post("/login", UserController.user_login);

//Delete a user
router.delete("/:userId", checkAuth, UserController.user_delete);

//Get all users
router.get('/', checkAuth, UserController.getAllUsers);

//Get one user
router.get('/:userId', checkAuth, UserController.getUser);

module.exports = router;