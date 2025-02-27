const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    // Name of the hospital or clinical
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
      minlength: 3,
    },
    // Reference to a Locations document
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    // Array of doctor references associated with this hospital
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    // Optional phone field
    phone: {
      type: String,
      trim: true,
      required: true,
      maxlength: 15,
      minlength: 10,
    },
    // Optionally, you can differentiate between hospital and clinic
    type: {
      type: String,
      enum: ["Hospital", "Clinic"],
      default: "Hospital",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
