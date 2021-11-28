const mongoose = require("mongoose");
const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  examples: {
    type: [],
    required: true,
  },
});
const wordModel = mongoose.model("WORD", wordSchema);
module.exports = wordModel;
