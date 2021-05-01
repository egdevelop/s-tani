const { response } = require("express");
const db = require("./../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            const dataAkun = {
              id: hasil[0].id,
              nama: hasil[0].nama,
              email: hasil[0].username,
              resiko: hasil[0].resiko,
            };
            res.json(dataAkun);
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

  //STANI LAGIC
exports.stani = (req,res)=>{
  const {id}= req.body;
  db.query("SELECT * FROM test WHERE id_petani=? ORDER BY id DESC",[id],(err,hasil)=>{
    if(hasil.length > 0){
      db.query("SELECT * FROM tanaman WHERE suhu_min <= ? AND suhu_max >= ? AND tanah_min <= ? AND tanah_max >= ? AND udara_min <= ? AND udara_max >= ? AND ketinggian_min <= ? AND ketinggian_max >= ? ORDER BY rasio_pasar DESC LIMIT 3",
      [hasil[0].suhu,hasil[0].suhu,hasil[0].tanah,hasil[0].tanah,hasil[0].udara,hasil[0].udara,hasil[0].ketinggian,hasil[0].ketinggian],
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
}
  //END STANI