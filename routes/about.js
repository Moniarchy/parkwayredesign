var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/about', function(request, response, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;