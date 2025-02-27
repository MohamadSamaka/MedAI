const mongoose = require("mongoose");

// Custom function to validate time format (HH:mm)
function validateTime(value) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

const doctorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expertise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expertise",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  workingTime: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      start_time: {
        type: String,
        required: true,
        validate: {
          validator: validateTime,
          message: (props) => `${props.value} is not a valid time format (HH:mm)!`,
        },
      },
      end_time: {
        type: String,
        required: true,
        validate: {
          validator: validateTime,
          message: (props) => `${props.value} is not a valid time format (HH:mm)!`,
        },
      },
    },
  ],
  appointments: [
    {
      appointment_time: { type: Date, required: true, index: true },
      appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
      },
    },
  ],
});

// Ensure appointments remain sorted by appointment_time before saving
doctorSchema.pre("save", function (next) {
  this.appointments.sort((a, b) => a.appointment_time - b.appointment_time);
  next();
});

// **Fix: Prevent Overwriting the Model**
module.exports = mongoose.model("Doctor", doctorSchema);

