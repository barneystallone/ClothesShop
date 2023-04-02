const Joi = require('joi');

module.exports = {

    // VD: let [err, data] = await handlerPromise( promise )
    handlerPromise: (promise) => {
        return promise.then(data => ([undefined, data]))
            .catch(err => ([err, undefined]))
    },

    userValidate: data => {
        const userSchema = Joi.object({
            email: Joi.string().pattern(new RegExp('gmail.com$')).email().required(),
            password: Joi.string().min(4).max(32).required(),
            // resetToken: ,
        })

        return userSchema.validate(data);
    }
}