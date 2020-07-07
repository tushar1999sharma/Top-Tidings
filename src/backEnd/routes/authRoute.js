const express           = require('express'); 
const router            = express.Router();
const passport          = require('passport');
const authController    = require('../controllers/authController');

router.post("/signup", authController.register);

router.post("/signin", passport.authenticate('local', {failureRedirect:'/users/signin'}), authController.login);

router.post("/signout", authController.logout);

module.exports = router;