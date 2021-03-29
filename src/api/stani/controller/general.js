const { response } = require("express");
const db = require("./../config/db");

//load rank
exports.loadRank = (req,res) =>{
    db.query("SELECT * from tanaman ORDER BY rasio_pasar DESC",(err,hasil)=>{
        if(hasil){
            res.status(200).json(hasil);
        }else{
            res.json(err);
            // res.status(501).json({
            //     pesan: "Terjadi kesalahan",
            // });
        }
    })
}