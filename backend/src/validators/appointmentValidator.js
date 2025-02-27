const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const createAppointmentSchema = Joi.object({
  experties: Joi.string().min(1).max(100).required(),
  location: Joi.string().min(1).max(100).required(),
  // Accept any string for doctor field without a pattern check
  doctor: Joi.string().optional(),
  // Accept an array of strings for doctors without pattern validation
  doctors: Joi.array().items(Joi.string()).optional(),
  dateTime: Joi.date().iso().required(),
  
  // Accept any string for patient, allowing null as well
  patient: Joi.string().optional().allow(null),
});

/*
const updateAppointmentSchema = Joi.object({
  experties: Joi.string().min(1).max(100).optional(),
  location: Joi.string().min(1).max(100).optional(),
  doctor: Joi.string().optional(),
  dateTime: Joi.date().iso().optional(),

  patient: Joi.string().optional().allow(null),
});
*/


function validateAppointmentCreation(data) {
  const { error } = createAppointmentSchema.validate(data, {
    abortEarly: false,
  });
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
}

function validateAppointmentUpdate(data) {
  const { error } = updateAppointmentSchema.validate(data, {
    abortEarly: false,
  });
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
}

module.exports = {
  validateAppointmentCreation,
 // validateAppointmentUpdate,
};
