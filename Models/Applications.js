const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    jid: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applications", ApplicationSchema);
