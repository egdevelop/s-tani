const express = require('express');

const emojis = require('./emojis');
const stani = require('./stani/main')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/stani', stani);

module.exports = router;
