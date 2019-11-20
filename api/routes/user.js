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

//router.get('/', checkAuthUser.auth, usersController.getAllUsers);
// router.post('/login', usersController.login);
// router.post('/signup', usersController.signup);
// router.get('/:userId', checkAuthUser.auth, usersController.getUser);
// router.patch('/:userId', checkAuthUser.auth, usersController.editUser);
// router.delete('/:userId', checkAuthUser.auth, usersController.deleteUser);

module.exports = router;