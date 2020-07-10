const express           = require('express'); 
const router            = express.Router();
const passport          = require('passport');
const authController    = require('../controllers/authController');
const validator          = require('../middlewares/validateMiddleware');

router.post("/signup", validator.registerValidation, authController.register);

router.post("/signin", validator.logInValidation, passport.authenticate('local', {failureRedirect:'/users/signin'}), authController.login);

router.post("/signout", authController.logout);

module.exports = router;