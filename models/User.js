const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: [{
    type: String,
    default: "user"
  }],
  active: {
    type: Boolean,
    default: true
  }
})

// to delete all bagged instances when a user is deleted
// TO COME BACK TO

// userSchema.pre("remove", async function (next) {
//   const bagger = mongoose.model("Bagger")

//   try {
//     await bagger.deleteMany({ user: this._id })
//     next()
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = mongoose.model("User", userSchema)
