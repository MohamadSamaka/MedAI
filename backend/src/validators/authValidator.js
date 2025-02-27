const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const validateUserLogin = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).strict();

  const { error } = schema.validate(userData);
  if (error) 
    throw new JsonedResponseError(error.details[0].message, 400); 
}

module.exports = {
  validateUserLogin
};
