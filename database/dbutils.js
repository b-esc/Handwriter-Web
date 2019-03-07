var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/local";
var mongoose = require("mongoose");
mongoose.connect(url);
var fs = require('fs');
var path = require('path');
const request = require("request");
var db = mongoose.connection;
db.on("error", () => {
    console.log("error while connecting");
});
db.once("open", () => {
    console.log("hey weve connected to mongodb");
});
var imageSchema = new mongoose.Schema({
    name: String,
    letterCount: Number,
    date: String,
    data: []
});

const Image = mongoose.model("Image", imageSchema);


function getFeatures(fileName, callback) {
    console.log("incoming file: " + fileName);
    var url = `http://127.0.0.1:7091/plumbFeatures?img_name=${fileName}`;
    request(url, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            return callback(body);
            //return JSON.parse(body);
        } else throw err;
    });
}

module.exports = {
    Image: Image,
    getFeatures: function (fileName, callback) {
        console.log("incoming file: " + fileName);
        var url = `http://127.0.0.1:7091/plumbFeatures?img_name=${fileName}`;
        request(url, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                return callback(body);
                //return JSON.parse(body);
            } else throw err;
        });
    },
    saveBase64StrLocal: function (fileName, b64ImgStr) {
        fs.writeFile(
            __dirname + "/../uploads/" + fileName,
            b64ImgStr,
            "base64",
            err => {
                if (err) throw err;
                else console.log("saved image locally");
            }
        );
    },
    processFile: function (req, res) {
        try {
            filename = req.body.filename;
            //base64imgstr = new Buffer(req.body.img.split(",")[1], "base64");
            dbutils.saveBase64StrLocal(filename, base64imgstr);
            dbutils.getFeatures(filename, data => {

                fs.readdir(__dirname + "/../uploads/LetterPlots/" + info[0].name, (err, files) => {
                    if (err) {
                        console.log(err);
                        throw(err);
                    }
                    console.log("yoooo files length :" + files.length);
                    var toSave = new dbutils.Image({
                        name: filename,
                        letterCount: files.length,
                        date: Date(Date.now),
                        data: JSON.parse(data)
                    });
                    toSave.save(function (err) {
                        console.log("saved to database");
                    });
                });


            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    processFileBatch: function (name) {
        try {
            //filename = req.body.filename;
            //base64imgstr = new Buffer(req.body.img.split(",")[1], "base64");
            //dbutils.saveBase64StrLocal(filename, base64imgstr);
            var srclocation = path.resolve(__dirname) + "/../uploads/unprocessed/" + name;
            var dstlocation = path.resolve(__dirname) + "/../uploads/" + name;
            fs.copyFile(srclocation, dstlocation, (err) => {
                if (err) {
                    console.log(err);
                    throw(err);
                }
                else {
                    console.log("\n\nFILE WAS COPIED\n\n");
                }
            });
            getFeatures(name, data => {
                var toSave = new Image({
                    name: name,
                    //image: base64imgstr,
                    date: Date(Date.now),
                    data: JSON.parse(data)
                });
                toSave.save(function (err) {
                    console.log("saved to database");
                });
            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
}

