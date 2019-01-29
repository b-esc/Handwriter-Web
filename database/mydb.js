var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/local";
var router = require("../routes/index");
var fs = require('fs');
var path = require('path');
const request = require('request');
var app = require("../app");
var mongoose = require('mongoose');
mongoose.connect(url);
var multer = require('multer');

var db = mongoose.connection;
db.on('error',()=>{
    console.log('error while connecting');
});
db.once('open',()=>{
    console.log('hey weve connected to mongodb');
});

var imageSchema = new mongoose.Schema({
    name: String,
    image: Buffer
});


const Image = mongoose.model('Image',imageSchema);

router.post('/fileUpload',(req,res)=>{
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
            features = getFeatures(filename);
            console.log('gonna output features!!');
            console.log(typeof(features));
            res.send({test:'lol'});
            //res.send(JSON.stringify(features));
        });
    }catch(err){console.log(err)}
   //res.send(req);
});

function getFeatures(fileName){
    var url = `http://127.0.0.1:5158/plumbFeatures?img_name=${fileName}`;
    request(url,(err,res,body) =>{
        if(!err && res.statusCode == 200){
            console.log("gonna get body from get features!!");
            console.log(body);
            res.send(body);
            //return JSON.parse(body);
        }
        else throw(err);
    });
}

function saveBase64StrLocal(fileName, b64ImgStr){
    fs.writeFile(__dirname + "/../uploads/"+fileName,b64ImgStr,'base64',(err) => {
        if(err) throw err;
        else console.log('saved image!!');
    });
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

// var storage = multer.diskStorage({
//     destination: (req,file,cb) =>{
//         cb(null,'public/uploaded')
//     },
//     filename: (req,file,cb) => {
//         cb(null,file.fieldname + '-' + Date.now())
//     }
// });
// var upload = multer({storage:storage});
//

//
// var uploadDocuments = function(db,colname,path,callback){
//     var collection = db.collection(colname);
//     collection.insertOne({'imagePath':filePath})
// }
// MongoClient.connect(url, function(err, client) {
//     if (err) throw err;
//     var db = client.db('local');
//     console.log("Database connected!");
//     var collection = db.collection('test').find();
//     //console.log(cursor);
//     collection.forEach(function(result){
//         console.log(JSON.stringify(result));
//     });
//     client.close();
// });
