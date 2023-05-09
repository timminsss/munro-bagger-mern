const User = require("../models/User")
const Bagger = require("../models/Bagger")
// const Munro = require("../models/Munro")
const asyncHandler = require('express-async-handler')
const mongoose = require("mongoose")

// @desc Get all munros bagged
// @route GET /baggers
// @access Private
const getAllMunroBags = asyncHandler(async(req, res) => {
  // Get all notes from MongoDB
  const baggers = await Bagger.find().lean()

  // // If no baggers
  if (!baggers?.length) {
      return res.status(400).json({ message: 'No baggers found' })
  }
  res.json(baggers)

})

const getAllMunroBagsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId

  const bagger = await Bagger.find({ user: userId })
    .populate("user", "-password")
    .lean()
  if (!bagger?.length) {
    return res.status(400).json({ message: "No munros found" })
  }
  res.json(bagger)
})

// @desc Create new munros bagged instance
// @route POST /baggers
// @access Private
const createNewMunrosBagged = asyncHandler(async(req, res) => {
  const { user, munro, completedDate, comments } = req.body

  // check user exists first
  const existingUser = await User.findById(user)
  if (!existingUser) {
    return res.status(400).json({ message: "User not found"})
  }

  // confirm data exists
  if (!user || !munro ) {
    return res.status(400).json({ message: "User and munro required" })
  }

  const baggerObject = { user, munro, completedDate, comments}
  // const baggerObject = { user: new mongoose.Types.ObjectId(userId), munro, completedDate, comments}

  // create and store new user
  const bagger = await Bagger.create(baggerObject)
  if (bagger) {
    res.status(201).json({ message: `New munros bagged by ${user} with munro ${munro} created` })
  } else {
    res.status(400).json({ message: "Inalid data received" })
  }
})

// // @desc Update a user
// // @route PATCH /users
// // @access Private
const updateMunrosBagged = asyncHandler(async(req, res) => {
  const { id, user, munro, completedDate, comments, bagged } = req.body

  // does user exist
  const existingUser = await User.findById(user).exec()
  if (!existingUser) {
    return res.status(400).json({ message: 'User not found' })
  }

  // confirm data
  if (!id || !munro|| typeof bagged !== 'boolean') {
      return res.status(400).json({ message: `Munro and bagged essential - ${id}` })
  }

  const bagger = await Bagger.findById(id).exec()
  // does munro bagged exist - TO BE UPDATED WHEN MUNROS ARE IN
  // if (!bagger) {
  //   return res.status(400).json({ message: "Munro bagged not found"})
  // }

  bagger.user = existingUser
  bagger.munro = munro
  bagger.completedDate = completedDate
  bagger.comments = comments
  bagger.bagged = bagged

  const updatedMunroBagged = await bagger.save()

  res.json({ message: `${updatedMunroBagged.munro} updated` })
})

// // @desc Delete a user
// // @route DELETE /users
// // @access Private
const deleteMunroBagged = asyncHandler(async(req, res) => {
  const { id } = req.body

  // confirm data
  if (!id) {
    return res.status(400).json({ message: 'Munro bagged id Required' })
  }

  // // Does the munro bagged exist to delete?
  const bagger = await Bagger.findById(id).exec()
  if (!bagger) {
    return res.status(400).json({ message: "Munros bagged not found" })
  }

  const result = await bagger.deleteOne()
  const reply = `Munro ${result.munro} with ID ${result._id} deleted`
  res.json(reply)

})

module.exports = {
  getAllMunroBags,
  getAllMunroBagsByUser,
  createNewMunrosBagged,
  updateMunrosBagged,
  deleteMunroBagged
}
