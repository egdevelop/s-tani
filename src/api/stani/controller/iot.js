const { response } = require("express");
const db = require("./../config/db");
const fetch = require('node-fetch');

exports.injectData = (req,res) =>{
    const {id,temp,humi,soil,altitude} = req.body;
    const tanggal = new Date();
    db.query("SELECT kota FROM petani WHERE id=?",[id],(err,o)=>{
    fetch(`http://localhost:4000/weather?kota=${o[0].kota}`)
    .then((res) => res.json())
    .then((body) => {
        db.query("INSERT INTO test (id_petani,waktu,suhu,tanah,udara,ketinggian,cuaca)VALUES(?,?,?,?,?,?,?)",[id,tanggal,temp,humi,soil,altitude,body.parameter[2].weather_day],(err,hasil)=>{
            if(hasil){
                res.status(200).json(hasil);
            }else{
                res.json(err);
            }
        })
    })
    })
    
}