const mongoose = require("mongoose")

const baggerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    munro: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Munro"
    },
    bagged: {
      type: Boolean,
      default: false
    },
    completedDate: {
      type: Date
    },
    comments: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Bagger", baggerSchema)
