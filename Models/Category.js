// Importing Mongoose

const mongoose = require("mongoose");

// Creating Category Schema

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Exporting Schema

module.exports = mongoose.model("Category", CategorySchema);
