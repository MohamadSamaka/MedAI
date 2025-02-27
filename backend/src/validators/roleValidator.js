const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const validateRoleCreation = (userData) => {
  const schema = Joi.object({
    roleName: Joi.string().min(3).max(30).required(),
  }).strict();
  const { error } = schema.validate(userData);
  if (error) 
    throw new JsonedResponseError(error.details[0].message, 400); 
}

const validateRoleUpdate = (userData) => {
    const schema = Joi.object({
        roleName: Joi.string().min(3).max(30).required(),
    }).strict();
    const { error } = schema.validate(userData);
    if (error) 
      throw new JsonedResponseError(error.details[0].message, 400); 
  }


module.exports = {
    validateRoleCreation,
    validateRoleUpdate
};
