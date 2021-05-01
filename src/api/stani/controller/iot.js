const { response } = require("express");
const db = require("./../config/db");

exports.injectData = (req,res) =>{
    const {id,temp,humi,soil,altitude} = req.body;
    const tanggal = new Date();
    db.query("INSERT INTO test (id_petani,waktu,suhu,tanah,udara,ketinggian)VALUES(?,?,?,?,?,?)",[id,tanggal,temp,humi,soil,altitude],(err,hasil)=>{
        if(hasil){
            res.status(200).json(hasil);
        }else{
            res.json(err);
        }
    })
}