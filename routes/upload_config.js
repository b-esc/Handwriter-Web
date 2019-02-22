//https://thejackalofjavascript.com/uploading-files-made-fun/ just testing it
/*
    tmpDir: './public/uploaded/tmp',
    uploadDir: './public/uploaded/files',
    uploadUrl:  '/uploaded/files/',
*/
var mutil = require('../database/dbutils.js');
var options = {
    tmpDir: './uploads/tmp',
    uploadDir: './uploads/unprocessed/',
    uploadUrl:  '/unprocessed/',
    maxPostSize: 11000000000, // 11 GB
    minFileSize: 1,
    maxFileSize: 10000000000, // 10 GB
    acceptFileTypes: /.+/i,
    // Files not matched by this regular expression force a download dialog,
    // to prevent executing any scripts in the context of the service domain:
    inlineFileTypes: /\.(gif|jpe?g|png)$/i,
    imageTypes: /\.(gif|jpe?g|png)$/i,
    imageVersions: {
        maxWidth: 80,
        maxHeight: 80
    },
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    },
    storages : [{type : 'local', tmpDir: './uploads/tmp',uploadDir: './uploads/unprocessed', uploadUrl:  '/unprocessed',}],
    storage : {
        type : 'local',
    },
    nodeStatic: {
        cache: 3600
    }

};

var uploader = require('blueimp-file-upload-expressjs')(options);

module.exports = function(router) {
    router.get('/upload', function(req, res) {
        uploader.get(req, res, function(err, obj) {
            console.log("error!: " + err);
            res.send(JSON.stringify(obj));
        });
    });

    router.post('/upload', function(req, res) {
        uploader.post(req, res, function(err, obj) {
            console.log("error!: " + err);
            res.send(JSON.stringify(obj));
        });

    });

    router.delete('/unprocessed/:name', function(req, res) {
        /*in addition to delete, process and refactor this function to processing*/
        console.log('\n\n PROCESSING BATCH \n\n');
        console.log(req.params.name);
        try{
        mutil.processFileBatch(req.params.name);
        }catch(err){
          console.log(err);
          throw(err);
        }
        uploader.delete(req, res, function(err, obj) {
            res.send(JSON.stringify(obj));
        });
    });
    return router;
}
