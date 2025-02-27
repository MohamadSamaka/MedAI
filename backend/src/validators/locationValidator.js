const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const createLocationSchema = Joi.object({
  locationName: Joi.string().min(1).max(100).required(),
});

const updateLocationSchema = Joi.object({
  locationName: Joi.string().min(1).max(100).optional(),
});

function validateLocationCreation(data) {
  const { error } = createLocationSchema.validate(data);
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
}

function validateLocationUpdate(data) {
  const { error } = updateLocationSchema.validate(data);
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
}

module.exports = {
  validateLocationCreation,
  validateLocationUpdate,
};
