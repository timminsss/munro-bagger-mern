const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)
router.route("/:id").get(usersController.getOneUser)

module.exports = router
