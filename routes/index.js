const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const data = {
    data: {
      msg: 'Welcome to index page',
    },
  };

  res.json(data);
});

module.exports = router;
