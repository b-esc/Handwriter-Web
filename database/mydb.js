var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/local";
var router = require("../routes/index");
var mongoose = require('mongoose');
mongoose.connect(url);
var multer = require('multer');

var db = mongoose.connection;
db.on('error',()=>{
    console.log('error while connecting');
});
db.once('open',()=>{
    console.log('hey weve connected');
});

var imageSchema = new mongoose.Schema({
    name: String,
    image: Buffer
});


const Image = mongoose.model('Image',imageSchema);

router.post('/fileUpload',(req,res)=>{
    try {
        console.log(JSON.stringify(req));
        console.log('did we even hit router.post?');
        console.log(req);
        console.log("\n stingify below --- \n");
        console.log(JSON.parse(req));
    }catch(err){console.log(err)}
   //res.send(req);
});
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
