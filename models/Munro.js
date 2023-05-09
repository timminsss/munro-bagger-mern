const mongoose = require("mongoose")

const munroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  altitude: {
    type: Number,
    required: true
  },
  difficulty: [{
    type: Number,
    required: true
  }],
  bog: {
    type: Number,
    default: true
  },
  distance: {
    type: Number,
    default: true
  },
  duration: {
    type: String,
    default: true
  },
  latitude: {
    type: Number,
    default: true
  },
  longitude: {
    type: Number,
    default: true
  },
})

module.exports = mongoose.model("Munro", munroSchema)
