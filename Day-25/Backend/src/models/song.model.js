const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  Url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;
