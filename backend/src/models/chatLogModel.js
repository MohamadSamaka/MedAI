const mongoose = require("mongoose");

const chatLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat_session: [
      {
        timestamp: { type: Date, default: Date.now },
        user_message: String,
        ai_response: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatLog", chatLogSchema);
