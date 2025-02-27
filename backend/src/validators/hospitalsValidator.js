const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const doctorSchema = Joi.array().items(Joi.string());
// Common fields for both create and update
const hospitalSchema = {
  name: Joi.string().trim().min(3).max(100).required(),
  location: Joi.string().required().messages({
    "string.pattern.base": "Invalid location ID format",
    "any.required": "Location is required",
  }),
  phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10-15 digits",
    }),
  type: Joi.string().valid("Hospital", "Clinic").default("Hospital"),
  doctors: doctorSchema.optional(),
};

// Schema for creating a hospital (all fields required)
const validateHospitalCreation = (data) => {
  const schema = Joi.object(hospitalSchema);
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
};

// Schema for updating a hospital (fields optional)
const validateHospitalUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(100).optional(),
    locationId: Joi.string().optional(),
    phone: Joi.string()
      .pattern(/^\d{10,15}$/)
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be between 10-15 digits",
      }),
    type: Joi.string().valid("Hospital", "Clinic").optional(),
    doctors: doctorSchema.optional(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
};

module.exports = {
  validateHospitalCreation,
  validateHospitalUpdate,
};
