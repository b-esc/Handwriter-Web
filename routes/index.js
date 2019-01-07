var express = require('express');
var router = express.Router();
var imgupload = require('./image_upload')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout: 'main.hbs' });
});

router.get('/rplumbtest',function(req,res){
    res.render('rplumbtest',{layout: 'main.hbs'});
});

router.get('/uploadtest',function(req,res){
    res.render('uploadtest',{layout: 'main.hbs'});
});

module.exports = router;
