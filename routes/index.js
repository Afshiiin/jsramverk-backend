var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Welcome to index page"
        }
    };

    res.json(data);
});

module.exports = router;