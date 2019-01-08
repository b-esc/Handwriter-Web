var express = require('express');
var router = express.Router();
var upload_config = require('./upload_config')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout: 'main.hbs' });
});

router.get('/rplumbtest',function(req,res){
    res.render('rplumbtest',{layout: 'main.hbs'});
});

router.get('/uploadtest',function(req,res){
    res.render('uploadtest',{layout: 'main_legacy.hbs'});
});

module.exports = router;
