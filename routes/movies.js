var express = require('express');
var router = express.Router();

/* GET movies page. */
router.get('/', function(req, res, next) {
  res.render('movies', {title: 'Movie Listing'});
});

module.exports = router;