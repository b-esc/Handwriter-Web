//var MongoClient = require("mongodb").MongoClient;
//var url = "mongodb://localhost:27017/local";
var dbutils = require('./dbutils');
var router = require("../routes/index");
var fs = require("fs");
var path = require("path");
const request = require("request");
var app = require("../app");
//var mongoose = require("mongoose");
//mongoose.connect(url);
// var multer = require("multer");
//
// var db = mongoose.connection;
// db.on("error", () => {
//   console.log("error while connecting");
// });
// db.once("open", () => {
//   console.log("hey weve connected to mongodb");
// });

// var imageSchema = new mongoose.Schema({
//   name: String,
//   image: Buffer,
//   date: String,
//   data: []
// });

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
    try {
        dbutils.Image.find({}, function (err, images) {
            res.send(images);
            //console.log(images);
        });
    }catch(err){
        console.log(err);
        throw(err);
    }
});

router.get("/inspectImage/*",(req,res) =>{
  res.render('inspectdoc',{layout:'main.hbs'});
});


/**
 * March 19 Interactive Feature Approach
 * Last Weekend: Enabled single queries / image viewing..
 * AddLetterImages works
 * 0. Handle binary images -> jpg/png images in and out of mongodb to browser
 * 1. Insert features into mongo with letterImages
 * 2. Dump all letters into page
 * 3. Look at old python pixel proportion project for handling image modification / highlights
 * 4. Add individual letters to appear onclick of each row of any "Results" table
 * 5. Enable click to feature
 * 6. Prune unneeded features
 * 7. Grouping project..
 * 8. Synch grouping with individual feature pruning
 */
router.get("/inspectGet/:name" , (req,res) =>{
  //res.send("name is " + req.params.name);
    try{
    dbutils.Image.find({name:req.params.name},function(err,info){
      //console.log(info);
      res.send(info);
    });
  }catch(err){
    console.log(err);
    throw(err);
  }
});

router.post("/fileUpload", (req, res) => {

    try {
    filename = req.body.filename;
    base64imgstr = new Buffer(req.body.img.split(",")[1], "base64");
    dbutils.saveBase64StrLocal(filename, base64imgstr);
    dbutils.getFeatures(filename, data => {
      var toSave = new dbutils.Image({
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

// function getFeatures(fileName, callback) {
//   console.log("incoming file: " + fileName);
//   var url = `http://127.0.0.1:5158/plumbFeatures?img_name=${fileName}`;
//   request(url, (err, res, body) => {
//     if (!err && res.statusCode == 200) {
//       return callback(body);
//       //return JSON.parse(body);
//     } else throw err;
//   });
// }
//
// function saveBase64StrLocal(fileName, b64ImgStr) {
//   fs.writeFile(
//     __dirname + "/../uploads/" + fileName,
//     b64ImgStr,
//     "base64",
//     err => {
//       if (err) throw err;
//       else console.log("saved image locally");
//     }
//   );
// }


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
module.exports = router;
