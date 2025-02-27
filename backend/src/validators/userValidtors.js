const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const workingTimeSchema = Joi.array().items(
  Joi.object({
    day: Joi.string().valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ).required(),
    start_time: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    end_time: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
  })
);

const appointmentSchema = Joi.array().items(
  Joi.object({
    appointment_time: Joi.date().required(),
    appointment_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  })
);

// Doctor validation schema for user creation (all fields required)
const doctorCreationSchema = Joi.object({
  expertise: Joi.string().required(),
  location: Joi.string().required(),
  workingTime: workingTimeSchema.required(),
  appointments: appointmentSchema.optional()
}).optional();

// Doctor validation schema for user update (all fields optional)
const doctorUpdateSchema = Joi.object({
  expertise: Joi.string().optional(),
  location: Joi.string().required(),
  workingTime: workingTimeSchema.optional(),
  appointments: appointmentSchema.optional()
}).optional();

const validateUserCreation = (data) => {
  // Convert DateOfBirth in userData from string to Date if needed
  if (data.userData && typeof data.userData.DateOfBirth === 'string') {
    data.userData.DateOfBirth = new Date(data.userData.DateOfBirth);
  }
  
  const schema = Joi.object({
    userData: Joi.object({
    Fname: Joi.string().min(3).max(30).required(),
    Lname: Joi.string().min(3).max(30).required(),
    idPerson: Joi.string().min(8).max(10).required(),
    phone: Joi.string().length(13).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    DateOfBirth: Joi.date().iso().required(),
    address: Joi.string().required(),
    roleId: Joi.string().required(),
    }).required(),
    doctorData: doctorCreationSchema
  }).strict();
  
  const { error } = schema.validate(data);
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
};

const validateUserUpdate = (data) => {
  // Convert DateOfBirth in userData from string to Date if needed
  if (data.userData && typeof data.userData.DateOfBirth === 'string') {
    data.userData.DateOfBirth = new Date(data.userData.DateOfBirth);
  }
  
  const schema = Joi.object({
    userData: Joi.object({
      _id: Joi.string().required(),
      Fname: Joi.string().min(3).max(30).optional(),
      Lname: Joi.string().min(3).max(30).optional(),
      idPerson: Joi.string().min(8).max(10).optional(),
      phone: Joi.string().length(13).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),
      DateOfBirth: Joi.date().iso().optional(),
      address: Joi.string().optional(),
      roleId: Joi.string().optional(),
    }).required(),
    doctorData: doctorUpdateSchema
  }).strict();
  
  const { error } = schema.validate(data);
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
};

module.exports = {
  validateUserCreation,
  validateUserUpdate,
};
