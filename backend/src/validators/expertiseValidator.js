const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const createExpertiseSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow("").optional(),
});

const updateExpertiseSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  description: Joi.string().optional(),
});

function validateExpertiseCreation(data) {
  const { error } = createExpertiseSchema.validate(data, { abortEarly: false });
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
}

function validateExpertiseUpdate(data) {
  const { error } = updateExpertiseSchema.validate(data, { abortEarly: false });
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
}

module.exports = {
  validateExpertiseCreation,
  validateExpertiseUpdate,
};
