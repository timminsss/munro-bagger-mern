const User = require("../models/User")
const Bagger = require("../models/Bagger")
const Munro = require("../models/Munro")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async(req, res) => {
  // lean - bring back json only without extra info
  // stop the passowrd being sent back
  const users = await User.find().select("-password").lean()
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" })
  }
  res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async(req, res) => {
  const { username, email, password, role } = req.body

  // confirm data exists
  if (!username || !email || !password || !Array.isArray(role) || !role.length) {
    return res.status(400).json({ message: "All fields are required" })
  }

  // check for duplicates
  const duplicateEmail = await User.findOne({ email }).lean().exec()
  const duplicateUsername = await User.findOne({ username }).lean().exec()
  if (duplicateEmail || duplicateUsername) {
    return res.status(409).json({ message: "Duplicate email or username" })
  }

  // hash password - encrypts password
  const hashPW = await bcrypt.hash(password, 10) // salt rounds

  const userObject = { username, email, "password": hashPW, role}

  // create and store new user
  const user = await User.create(userObject)
  if (user) {
    res.status(201).json({ message: `New user ${email} created` })
  } else {
    res.status(400).json({ message: "Inalid user data received" })
  }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async(req, res) => {
  const { id, username, email, role, active, password } = req.body

    // confirm data
    if (!id || !username || !Array.isArray(role) || !role.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: `All fields except password are required. ${id}, ${username}, ${role.length}, ${typeof active}` })
    }

    // does user exist
    const user = await User.findById(id).exec()
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // check for duplicates
    const duplicateUsername = await User.findOne({ username }).lean().exec()

    // allow updates to original user
    if ((duplicateUsername) && duplicateUsername?._id.toString() !== id) {
      return res.status(409).json({ message: 'Duplicate username' })
  }

    user.username = username
    user.email = email
    user.role = role
    user.active = active

    if (password) {
      // hash password
      user.password = await bcrypt.hash(password, 10) // salt rounds
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async(req, res) => {
  const { id } = req.body

  // confirm data
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }

  // does the user still have assigned bags?
  const bagger = await Bagger.findOne({ user: id }).lean().exec()
  if (bagger) {
      return res.status(400).json({ message: 'User has assigned bags' })
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({ message: "User not found" })
  }

  const result = await user.deleteOne()
  const reply = `Username ${result.username} with ID ${result._id} deleted`
  res.json(reply)

})

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}
