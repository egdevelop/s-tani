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
    postValid,
    pilihValid,
    selesaiValid
} = require("./validator/valid");

const {loadRank, Login, Register, jwthash, stani, history, getForum, forum, komunitas, market, pilihTanaman, selesaiTanam} = require("./controller/general");
const { injectData } = require("./controller/iot");

//GET
router.get("/rank/:api", ValidApi, loadRank);
router.get("/forum/:api", ValidApi, getForum);
router.get("/komunitas/:api", ValidApi, komunitas);
router.get("/market/:api", ValidApi, market);
//POST
router.post("/inject/:api",injectValid, Validation, ValidApi,injectData);
router.post("/login/:api",loginValid,Validation,ValidApi,Login);
router.post("/regis/:api",regisValid,Validation,ValidApi,Register);
router.post("/hash/:api",hashValid,Validation,ValidApi,jwthash);
router.post("/rekom/:api",staniValid,Validation,ValidApi,stani);
router.post("/history/:api",historyValid,Validation,ValidApi,history);
router.post("/forum/:api",postValid,Validation,ValidApi,forum);
router.post("/pilih/:api",pilihValid,Validation,ValidApi,pilihTanaman);
router.post("/selesai/:api",selesaiValid,Validation,ValidApi,selesaiTanam);

module.exports = router;