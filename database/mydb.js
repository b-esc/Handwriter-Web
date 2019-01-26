var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/local";
var router = require("../routes/index");

//unused
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
        base64imgstr = new Buffer(req.body.img.split(",")[1],"base64");
        var testsave = new Image({name:"testlol",image:base64imgstr});
        testsave.save(function(err){
            //if(err) return console.error(err);
            if(err) console.log(err);
            console.log("saved!");
        });
        console.log(base64imgstr);
        console.log("\n parse below --- \n");
        res.send({lol:"lol"});
    }catch(err){console.log(err)}
   //res.send(req);
});
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
