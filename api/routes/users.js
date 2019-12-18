const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users');
const userCheckAuth = require('../middleware/user-check-auth');

//Create a new user
router.post("/signup", UserController.signup);

//Login
router.post("/login", UserController.login);

//Delete a user
router.delete("/:userId", userCheckAuth.auth, UserController.deleteUser);

//Get all users
router.get('/', userCheckAuth.auth, UserController.getAllUsers);

//Get one user
router.get('/:userId', userCheckAuth.auth, UserController.getUser);

router.patch('/:userId', userCheckAuth.auth, UserController.editUser);

module.exports = router;