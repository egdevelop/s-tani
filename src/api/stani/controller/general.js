const { response } = require("express");
const db = require("./../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

//load rank
exports.loadRank = (req,res) =>{
    db.query("SELECT * from tanaman ORDER BY rasio_pasar DESC",(err,hasil)=>{
        if(hasil){
            res.status(200).json(hasil);
        }else{
            res.json(err);
        }
    })
}

//PILIH TANAMAN
  exports.pilihTanaman = (req,res)=>{
    const {nama,id_petani} = req.body;
    db.query("UPDATE petani SET tanaman = ? , status_petanian = 1 WHERE id = ?",[nama,id_petani],(err,hasil)=>{
      if(hasil){
        res.status(200).json({
          pesan : "berhasil",
        })
      }else{
        res.status(501).json(err);
      }
    })
  }
//END

//SELESAI TANAMAN
exports.selesaiTanam = (req,res)=>{
  const {id_petani} = req.body;
  db.query("UPDATE petani SET tanaman = ? , status_petanian = 0 WHERE id = ?" ,["Belum",id_petani],(err,hasil)=>{
    if(hasil){
      res.status(200).json({
        pesan : "berhasil",
      })
    }else{
      res.status(501).json(err);
    }
  })
}
//END

// ROUTE LOGIN
exports.Login = (req, res) => {
    const { username, pw } = req.body;
    db.query('SELECT * FROM petani where username   = ?', [username], (err, hasil) => {
      if (hasil > 1) {
        return res.json({
          pesan: 'Terjadi kesalahan Silahkan Coba Lagi Nanti',
        });
      }
      if (hasil < 1) {
        res.json({
          pesan: 'username yang anda masukan salah',
        });
      } else {
        const hash = hasil[0].password;
        bcrypt.compare(pw, hash, (err, match) => {
          if (match) {
            fetch(`http://localhost:4000/weather?kota=${hasil[0].kota}`)
            .then((res) => res.json())
            .then((body) => {
              db.query("SELECT * FROM test WHERE id_petani=? ORDER BY id DESC",[hasil[0].id],(err,resultsx)=>{
                if(hasil.length > 0){
                  const dataAkun = {
                    id: hasil[0].id,
                    nama: hasil[0].nama,
                    email: hasil[0].username,
                    resiko: hasil[0].resiko,
                    cuaca: body.parameter[2].weather_day,
                    ketinggian: resultsx[0].ketinggian,
                    status_pertanian: hasil[0].status_petanian,
                  };
                  res.json(dataAkun);
                }else{
                  const dataAkun = {
                    id: hasil[0].id,
                    nama: hasil[0].nama,
                    email: hasil[0].username,
                    resiko: hasil[0].resiko,
                    cuaca: body.parameter[2].weather_day,
                    ketinggian: "None",
                    status_pertanian: hasil[0].status_petanian,
                  };
                  res.json(dataAkun);
                }
              })
            })
          } else {
            res.json({
              pesan: 'Maaf Password Anda Salah',
            });
          }
        });
      }
    });
  };
  // END LOGIN

  exports.Register = (req, res) => {
    const {
        username,
        pw,
        nama,
        resiko
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pw, salt);
    db.query('SELECT * FROM petani where username = ?', [username], (err, data) => {
      if (data.length > 0 || data.length == 1) {
        return res.json({
          pesan: 'Email Telah Digunakan',
        });
      }
      db.query(
        'INSERT INTO petani (nama,username,password,resiko)VALUES(?,?,?,?)',
        [
          nama,
          username,
          hash,
          resiko
        ],
        (err, hasil) => {
          if (hasil) {
            res.json({
              pesan: 'berhasil',
            });
          } else {
            res.status(401);
          }
          if (err) {
            res.json({
              pesan: 'Error (EG112)',
            });
          }
        }
      );
    });
  };
  // END REGISTER

  // HASH JWT TOKEN ROUTE
exports.jwthash = (req, res) => {
    const { access_token } = req.body;
    if (!access_token) {
      res.json({
        pesan: 'Terjadi Kesalahan (EG132)',
      });
    } else {
      const data = jwt.verify(access_token, process.env.SECRET_TOKEN);
      res.json(data);
    }
  };
  // END HASH

  //POST FORUM
  exports.forum = (req,res)=>{
    const{id,nama,isi} = req.body;
    db.query("INSERT INTO forum (id_petani,nama,isi)VALUES(?,?,?)",[id,nama,isi],(err,hasil)=>{
      if(hasil){
        res.status(200).json(hasil)
      }else{
        res.status(501).json({
          pesan:"Server Error"
        });
      }
    })
  }
  //END

  //GET POST
  exports.getForum = (req,res)=>{
    db.query("SELECT * FROM forum ORDER BY id DESC",(err,hasil)=>{
      if(hasil){
        res.status(200).json(hasil);
      }else{
        res.status(501).json(err);
      }
    })
  }
  //END

  //Komunitas
  exports.komunitas = (req,res)=>{
    db.query("SELECT nama,kota,tanaman FROM petani",(err,hasil)=>{
      if(hasil){
        res.status(200).json(hasil);
      }else{
        res.status(501).json(err);
      }
    })
  }

  //END
  
  //Market
  exports.market = (req,res)=>{
    db.query("SELECT * FROM marketplace",(err,hasil)=>{
      if(hasil){
        res.status(200).json(hasil);
      }else{
        res.status(501).json(err);
      }
    })
  }
  //END

  //HISTORY
  exports.history = (req,res)=>{
    const {id}= req.body;
    db.query("SELECT * FROM test WHERE id_petani=? ORDER BY id DESC",[id],(err,hasil)=>{
      if(hasil){
        res.status(200).json(hasil);
      }else{
        res.status(501).json(err);
      }
    })
  }
  //END

  //STANI LOGIC
exports.stani = (req,res)=>{
  const {id}= req.body;
  db.query("SELECT * FROM petani WHERE id = ?",[id],(err,body)=>{
    fetch(`http://localhost:4000/weather?kota=${body[0].kota}`)
            .then((res) => res.json())
            .then((resultss) => {
              db.query("SELECT * FROM test WHERE id_petani=? ORDER BY id DESC",[id],(err,hasil)=>{
                if(hasil.length > 0){
                  db.query("SELECT * FROM tanaman WHERE suhu_min <= ? AND suhu_max >= ? AND tanah_min <= ? AND tanah_max >= ? AND udara_min <= ? AND udara_max >= ? AND ketinggian_min <= ? AND ketinggian_max >= ? AND cuaca_min <= ? AND cuaca_max >= ? ORDER BY rasio_pasar DESC LIMIT 3",
                  [hasil[0].suhu,hasil[0].suhu,hasil[0].tanah,hasil[0].tanah,hasil[0].udara,hasil[0].udara,hasil[0].ketinggian,hasil[0].ketinggian,resultss.parameter[2].weather_day,resultss.parameter[2].weather_day],
                  (err,results)=>{
                    if(results){
                      res.status(200).json(results);
                    }else{
                      res.status(501).json(err);
                    }
                  })
                }else{
                  res.status(200);
                }
              })
            })
  })
}
  //END STANI