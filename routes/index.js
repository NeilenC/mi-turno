const express = require("express")
const router = express.Router ()
const users = require("./users")
// const branches = require("./branches")
// const shift = require("./shift")

router.use("/user", users)
// router.use("./branches", branches)
// router.use("./shift", shift)

module.exports = router