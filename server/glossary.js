var router = require('express').Router();

var db = require('./db');
var find = require('./filter').find;

router.get('/api/glossary/entry/:id', function (req, res) {
  find('glossary', req.body).then(function(docs){
    res.json(docs);
  }, function(err){
    res.status(500).json({
      err: err
    });
  });
});

module.exports = router;
