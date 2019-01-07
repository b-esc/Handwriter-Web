var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout: 'main.hbs' });
});

router.get('/rplumbtest',function(req,res){
    res.render('rplumbtest',{layout: 'main.hbs'});
});

module.exports = router;
