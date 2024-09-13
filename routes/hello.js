const express = require('express');

const router = express.Router();

router.get('/hello/:msg', (req, res) => {
  const data = {
    data: {
      msg: req.params.msg,
    },
  };

  res.json(data);
});

module.exports = router;
