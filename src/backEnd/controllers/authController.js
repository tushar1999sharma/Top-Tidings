const User                  = require('../models/userModel');
const bcrypt                = require('bcrypt');
const passport              = require('passport');
const jwt                   = require('jsonwebtoken');
const config                = require('../config/index');
const authValidation        = require('../validations/authValidation');
const saltRound             = 10;

module.exports = {
    register: async (req, res) => {
        //validate user details
        const errMsg = await authValidation.userRegisterValidation(req.body);
        if (errMsg.error != null) {
            return res.json({
                status: 404,
                message: errMsg.error.details[0].message 
            })
        }

        //destructure req.body data
        const { name, email, password, confirmPass } = req.body;
        
        //check if email is unique or not
        const isEmailExist = await User.findOne({email: email});
        if (isEmailExist) {
            return res.json({
                status: 404,
                message: "email already exist" 
            })
        }
        
        //chk if both password same or not
        if (password != confirmPass) {
            console.log("password not match");
            return res.json({
                status: 404,
                message: "password not match" 
            })
        }
        
        //create hash of password
        try {
            const salt = await bcrypt.genSalt(saltRound);
            const hash = await bcrypt.hash(password, salt);
            
            try {
                //now save user into database
                const newUser = await User.create({ name: name, email: email, password: hash });
                console.log("New User Registered", newUser);

                //log in user
                req.login(newUser, function(err) {
                    if(err) {
                        console.log("error in log in ", err);
                        return res.json({
                            status: 404,
                            message: "can't log in user" 
                        })
                    }
                })

                try {
                    //assign jwt token to user
                    const token = jwt.sign({ id: req.user._id }, 
                                            config.secretOrKey, 
                                            { expiresIn: '24h' }
                                        ); 
                    console.log("user regeistered and logged in ", req.user, " with token ", token);
                    return res.json({
                        status: 200,
                        message: "user successfully Registered",
                        user: req.user,
                        jwt: token
                    })
                } 
                catch (err) {
                    console.log("error in assigning token ", err);
                    return res.json({
                        status: 404,
                        message: "error in assigning code" 
                    })
                }
            } 
            catch (err) {
                console.log("error in saving user to database ", err);
                return res.json({
                    status: 404,
                    message: "can't save user to database" 
                })
            }
        } 
        catch (err) {
            console.log("can't hash password ", err);   
            return res.json({
                status: 404,
                message: "can't create hash of password" 
            })
        }
    },

    login: async (req, res) => {
        //validate user details
        const errMsg = await authValidation.userLoginValidation(req.body);
        if (errMsg.error != null) {
            return res.json({
                status: 404,
                message: errMsg.error.details[0].message 
            })
        }

        try {
            //assign jwt token to user
            const token = jwt.sign({ id: req.user._id }, 
                                    config.secretOrKey, 
                                    { expiresIn: '24h' }
                                ); 
            console.log("user logged in ", req.user, " with token ", token);
            return res.json({
                status: 200,
                message: "user successfully logged in",
                user: req.user,
                jwt: token
            })
        } 
        catch (err) {
            console.log("error in assigning token ", err);
            return res.json({
                status: 404,
                message: "error in assigning code" 
            })
        }
    },

    logout: (req, res) => {
        try {
            console.log("Log out ", req.user);
            req.logout();
            return res.json({
                status: 200,
                message: "User successfully logged out"
            })
        } 
        catch (err) {
            console.log(err);
            return res.json({
                status: 404,
                message: "Something went wrong can't log out user"
            })
        }
    }
}