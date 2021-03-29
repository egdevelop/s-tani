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