const authValidation        = require('../validations/authValidation');

module.exports = {
    registerValidation: async (req, res, next) => {
        //validate user details
        const errMsg = await authValidation.userRegisterValidation(req.body);
        if (errMsg.error != null) {
            return res.json({
                status: 404,
                message: errMsg.error.details[0].message 
            })
        }
        return next();
    },

    logInValidation: async (req, res, next) => {
        //validate user details
        const errMsg = await authValidation.userLoginValidation(req.body);
        if (errMsg.error != null) {
            return res.json({
                status: 404,
                message: errMsg.error.details[0].message 
            })
        }
        return next();
    }
}