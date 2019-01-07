//https://thejackalofjavascript.com/uploading-files-made-fun/ just testing it
/*
    tmpDir:  __dirname + '../public/uploaded/tmp',
    uploadDir: __dirname + '../public/uploaded/files',
 */

//unforunately whoever forked this npm module and made it usable also changed how it works
//leaving og options as refrence
/*
var options = {
    tmpDir: '../public/uploaded/tmp',
    uploadDir: '../public/uploaded/files',
    uploadUrl:  '/uploaded/files/',
    storage : {
        type : 'local',
        aws : {
            accessKeyId :  'xxxxxxxxxxxxxxxxx', // required if aws
            secretAccessKey : 'xxxxxxxxxxxxxxxxxxxxxxx', // required if aws
            region : 'us-west-2', //make sure you know the region, else leave this option out
            bucketName : 'xxxxxxxxx' // required if aws
        }
    }
};
 */
var options = {
    tmpDir: './public/uploaded/tmp',
    uploadDir: './public/uploaded/files',
    uploadUrl:  './uploaded/files/',
    storages : [{type : 'local', tmpDir: './public/uploaded/tmp',uploadDir: './public/uploaded/files', uploadUrl:  './uploaded/files/',}],
    storage : {
        type : 'local',
        aws : {
            accessKeyId :  'xxxxxxxxxxxxxxxxx', // required if aws
            secretAccessKey : 'xxxxxxxxxxxxxxxxxxxxxxx', // required if aws
            region : 'us-west-2', //make sure you know the region, else leave this option out
            bucketName : 'xxxxxxxxx' // required if aws
        }
    }
};
var uploader = require('blueimp-file-upload-expressjs')(options);

module.exports = function (router) {
    router.get('/upload', function (req, res) {
        uploader.get(req, res, function (obj) {
            res.send(JSON.stringify(obj));
        });
    });

    router.post('/upload', function (req, res) {
        uploader.post(req, res, function (obj) {
            res.send(JSON.stringify(obj));
        });
    });

    router.delete('/uploaded/files/:name', function (req, res) {
        uploader.delete(req, res, function (obj) {
            res.send(JSON.stringify(obj));
        });
    });
    return router;
}