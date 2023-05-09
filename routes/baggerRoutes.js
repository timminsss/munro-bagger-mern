const express = require("express")
const router = express.Router()
const baggersController = require("../controllers/baggersController")

router.route("/").get(baggersController.getAllMunroBags)
router.route("/users/:userId")
    .get(baggersController.getAllMunroBagsByUser)
    .post(baggersController.createNewMunrosBagged)
    .patch(baggersController.updateMunrosBagged)
    .delete(baggersController.deleteMunroBagged)

module.exports = router
baggersController.createNewMunrosBagged

// /users/:userId
