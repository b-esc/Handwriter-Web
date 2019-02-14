var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/local";
var router = require("../routes/index");
var fs = require("fs");
var path = require("path");
const request = require("request");
var app = require("../app");
var mongoose = require("mongoose");
mongoose.connect(url);
var multer = require("multer");

var db = mongoose.connection;
db.on("error", () => {
  console.log("error while connecting");
});
db.once("open", () => {
  console.log("hey weve connected to mongodb");
});

var imageSchema = new mongoose.Schema({
  name: String,
  image: Buffer,
  date: String,
  data: []
});

const Image = mongoose.model("Image", imageSchema);

/*router.post('/fileUpload',(req,res)=>{
    try {
        //console.log(JSON.stringify(req));
        console.log('did we even hit router.post?');
        filename = req.body.filename;
        base64imgstr = new Buffer(req.body.img.split(",")[1],"base64");
        var testsave = new Image({name:filename,image:base64imgstr});
        testsave.save(function(err){
            //if(err) return console.error(err);
            if(err) console.log(err);
            console.log(__dirname);
            console.log("saved!");
            saveBase64StrLocal(filename,base64imgstr);
            getFeatures(filename,function(data){
                res.send(JSON.parse(data));
            });

            //res.send({test:'lol'});
            //res.send(JSON.stringify(features));
        });
    }catch(err){console.log(err)}
   //res.send(req);
});*/


/*Image.find({},function(err,images){
    images.forEach(function(image){
      console.log(image);
    })
  });*/

router.post("/allResults", (req,res)=>{
  Image.find({},function(err,images){
    console.log(images);
  });
});

router.post("/fileUpload", (req, res) => {

    try {
    filename = req.body.filename;
    base64imgstr = new Buffer(req.body.img.split(",")[1], "base64");
    saveBase64StrLocal(filename, base64imgstr);
    getFeatures(filename, data => {
      var toSave = new Image({
        name: filename,
        image: base64imgstr,
        date: Date(Date.now),
        data: JSON.parse(data)
      });
      toSave.save(function(err){
        console.log("saved to database");
      });
    });

  } catch (err) {
    console.log(err);
    throw err;
  }
});

function getFeatures(fileName, callback) {
  console.log("incoming file: " + fileName);
  var url = `http://127.0.0.1:5158/plumbFeatures?img_name=${fileName}`;
  request(url, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      return callback(body);
      //return JSON.parse(body);
    } else throw err;
  });
}

function saveBase64StrLocal(fileName, b64ImgStr) {
  fs.writeFile(
    __dirname + "/../uploads/" + fileName,
    b64ImgStr,
    "base64",
    err => {
      if (err) throw err;
      else console.log("saved image locally");
    }
  );
}


// app.post('/r_img_plumb',function(req,res){
//     const img_name = req.body.img_name;
//     const plumber_url = `http://127.0.0.1:7533/img_test?img_name=${img_name}`;
//     request(plumber_url,function callback(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//             console.log(JSON.parse(body));
//             res.send(JSON.parse(body));
//             // let info = JSON.parse(body);
//             // console.log(info.msg);
//             // res.send(info.msg);
//             //res.render('rplumbtest',{layout: 'main_legacy.hbs',msg:info.msg});
//
//         } else{
//             console.log("there was an error... \n \n \n");
//             console.log(error);
//         }
//     });
// });

/*

wow im amateur lool

ok so reading strategy would be

file name -> fetch from db -> save it locally

-> plumb file name

!! need to ensure everything has a unique name consequently :(

upload: just upload images to mongodb..
process: process and get
analyze handwriting:
 */
