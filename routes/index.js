var express = require('express');
var router = express.Router();
var upload_config = require('./upload_config')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {layout: 'main.hbs'});
});

router.get('/rplumbtest', function(req, res) {
  res.render('rplumbtest', {layout: 'main.hbs'});
});

router.get('/uploadtest', function(req, res) {
  res.render('uploadtest', {layout: 'main_legacy.hbs'});
});

router.get('/plumbloadtest', function(req, res) {
  res.render('plumbloadtest', {layout: 'main.hbs'});
});

router.get('/croptest', function(req, res) {
  res.render('croptest', {layout: 'main.hbs'});
});

router.get('/particletest', function(req, res) {
  res.render('particletest', {layout: 'main.hbs'});
});

router.get('/newdocuments', function(req, res) {
  res.render('newdocuments', {layout: 'main.hbs'});
});

router.get('/docsingle', function(req, res) {
  res.render('docsingle', {layout: 'main.hbs'});
});

router.get('/docsingle_nc', function(req, res) {
  res.render('docsingle_nc', {layout: 'main.hbs'});
});

router.get('/results', function(req, res) {
  res.render('results', {layout: 'main.hbs'});
});

module.exports = router;
