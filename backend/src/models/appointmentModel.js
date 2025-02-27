const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  experties: { type: mongoose.Schema.Types.ObjectId, ref: "Experties", required : true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  dateTime: { type: Date, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
