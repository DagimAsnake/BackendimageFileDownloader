const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const imageSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // firstName: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = model("Image", imageSchema);
