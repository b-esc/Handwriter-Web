var createError = require('http-errors');
var express = require('express');
var multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./database/mydb');
var bodyParser = require('body-parser');


var app = express();

//module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:'50mb'}));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));

// app.use('/public',express.static(path.join(__dirname, '/public')));
//app.use('/rplumber',express.static(path.join(__dirname, '/rplumber')));

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'rplumber')));
// app.post('/multerupload', upload.single('upload-targ'), function (req, res, next) {
//     console.log("should output some file stuff yea?");
//     console.log(req.file);
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/db',dbRouter);
var rplumber = require('./routes/rplumber/eptest.js');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
