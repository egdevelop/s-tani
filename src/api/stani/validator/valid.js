const { check, body, validationResult } = require('express-validator');

const { API_KEY } = process.env;
exports.ValidApi = (req, res, next) => {
  const { api } = req.params;
  if (api == API_KEY) {
    next();
  } else {
    res.json({
      message: 'WHO ARE YOU',
    });
  }
};

exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(501).json({
      pesan: errors.array()[0].msg,
    });
  }
  next();
};


exports.KomenValid = [
    check('id', 'Terjadi Masalah Silahkan Coba Lagi Nanti').notEmpty(),
    check('nama', 'Terjadi Masalah Silahkan Coba Lagi Nanti').notEmpty(),
    check('foto', 'Terjadi Masalah Silahkan Coba Lagi Nanti').notEmpty(),
    check('isi', 'Komentar tidak boleh kosong').notEmpty(),
  ];

  exports.injectValid = [
    check('id', 'ID akun kosong').notEmpty(),
    check('temp', 'Suhu Kosong').notEmpty(),
    check('humi', 'Kelembaban tanah kosong').notEmpty(),
    check('soil', 'Udara Kosong').notEmpty(),
    check('altitude', 'Ketinggian Kosong').notEmpty(),
  ];

  exports.regisValid = [
    check('nama', 'Nama tidak boleh kosong').notEmpty(),
    check('username', 'Username tidak boleh kosong').notEmpty(),
    check('pw', 'Password tidak boleh kosong').notEmpty(),
  ];
  exports.loginValid = [
    check('username', 'Username tidak boleh kosong').notEmpty(),
    check('pw', 'Password tidak boleh kosong').notEmpty(),
  ];
  exports.hashValid = [
    check('access_token', 'access token tidak boleh kosong').notEmpty(),
  ];
  exports.staniValid = [
    check('id', 'Server Error Silahkan hubungi admin').notEmpty(),
  ];
  exports.historyValid = [
    check('id', 'Server Error Silahkan hubungi admin').notEmpty(),
  ];
  exports.postValid = [
    check('id', 'Server Error Silahkan hubungi admin').notEmpty(),
    check('nama', 'Server Error Silahkan hubungi admin').notEmpty(),
    check('isi', 'Isi tidak boleh kosong').notEmpty(),
  ];
  exports.pilihValid = [
    check('id_petani', 'Server Error Silahkan hubungi admin').notEmpty(),
    check('nama', 'Server Error Silahkan hubungi admin').notEmpty(),
  ];
  exports.selesaiValid = [
    check('id_petani', 'Server Error Silahkan hubungi admin').notEmpty(),
  ];