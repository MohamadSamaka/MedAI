const Joi = require("joi");
const mongoose = require("mongoose");

const validateDoctor = (data) => {
  const schema = Joi.object({
    id: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }).required().messages({
      "any.invalid": "Invalid User ID format",
      "any.required": "User ID is required"
    }),

    expertise: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }).required().messages({
      "any.invalid": "Invalid Expertise ID format",
      "any.required": "Expertise ID is required"
    }),

    location: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }).required().messages({
      "any.invalid": "Invalid Location ID format",
      "any.required": "Location ID is required"
    }),

    workingTime: Joi.array()
      .items(
        Joi.object({
          day: Joi.string()
            .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
            .required()
            .messages({
              "any.only": "Invalid day format",
              "any.required": "Day is required",
            }),
          start_time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
              "string.pattern.base": "Start time must be in HH:mm format",
              "any.required": "Start time is required",
            }),
          end_time: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
              "string.pattern.base": "End time must be in HH:mm format",
              "any.required": "End time is required",
            }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.min": "At least one working time entry is required",
        "any.required": "Working time is required",
      }),

    appointments: Joi.array()
      .items(
        Joi.object({
          appointment_time: Joi.date().iso().required().messages({
            "date.base": "Appointment time must be a valid ISO date",
            "any.required": "Appointment time is required",
          }),
          appointment_id: Joi.string()
            .custom((value, helpers) => {
              if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
              }
              return value;
            })
            .required()
            .messages({
              "any.invalid": "Invalid Appointment ID format",
              "any.required": "Appointment ID is required",
            }),
        })
      )
      .optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = validateDoctor;
