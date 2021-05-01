// @ts-check

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");

const upload = multer({ dest: "./public/user/img" });
const {
    Validation,
    KomenValid,
    ValidApi,
    injectValid,
    loginValid,
    regisValid,
    hashValid,
    staniValid,
    historyValid,
    postValid
} = require("./validator/valid");

const {loadRank, Login, Register, jwthash, stani, history, getForum, forum} = require("./controller/general");
const { injectData } = require("./controller/iot");

//GET
router.get("/rank/:api", ValidApi, loadRank);
router.get("/forum/:api", ValidApi, getForum);

//POST
router.post("/inject/:api",injectValid, Validation, ValidApi,injectData);
router.post("/login/:api",loginValid,Validation,ValidApi,Login);
router.post("/regis/:api",regisValid,Validation,ValidApi,Register);
router.post("/hash/:api",hashValid,Validation,ValidApi,jwthash);
router.post("/rekom/:api",staniValid,Validation,ValidApi,stani);
router.post("/history/:api",historyValid,Validation,ValidApi,history);
router.post("/forum/:api",postValid,Validation,ValidApi,forum);

module.exports = router;