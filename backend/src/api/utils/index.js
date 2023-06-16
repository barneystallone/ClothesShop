const Joi = require('joi')

module.exports = {
  // VD: let [err, data] = await handlerPromise( promise )
  handlerPromise: (promise) => {
    return promise.then((data) => [undefined, data]).catch((err) => [err, undefined])
  },
  capitalizeWords: (str) => {
    return str
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
  },

  userValidate: (data) => {
    const userSchema = Joi.object({
      email: Joi.string().pattern(new RegExp('gmail.com$')).email().required(),
      password: Joi.string().min(4).max(32).required(),
      // resetToken: ,
    })

    return userSchema.validate(data)
  },
  searchKeywordValidate: (data) => {
    const searchSchema = Joi.object({
      keyword: Joi.string()
        .trim()
        .min(2)
        .pattern(new RegExp(/^[\p{L}\d\s]+$/u))
        .required(),
      page: Joi.number().min(1),
      // resetToken: ,
    })

    return searchSchema.validate(data)
  },
  // getAllProductRequestValidate: (data) => {
  //   const searchSchema = Joi.object({
  //     keyword: Joi.string()
  //       .trim()
  //       .min(2)
  //       .pattern(new RegExp(/^[\p{L}\d\s]+$/u)),
  //     c: Joi.string(),
  //     page: Joi.number().min(1),
  //     // resetToken: ,
  //   })

  //   return searchSchema.validate(data)
  // },

  productValidate: (data) => {
    const productSchema = Joi.object({
      title: Joi.string().max(50).required(),
      slug: Joi.string().max(60).required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category_id: Joi.string().required().max(4),
      // resetToken: ,
    })

    return productSchema.validate(data)
  },
}
