// @ts-check

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");

const upload = multer({ dest: "./public/user/img" });
const {
    Validation,
    KomenValid,
    ValidApi
} = require("./validator/valid");

const {loadRank} = require("./controller/general")

router.get("/rank/:api", ValidApi, loadRank);

module.exports = router;