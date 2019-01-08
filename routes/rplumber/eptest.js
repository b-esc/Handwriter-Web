const request = require('request');
const app = require('../../app.js');

app.post('/r_plumb',function(req,res){
    const msg = req.body.msg;
    const plumber_url = `http://127.0.0.1:7533/echo?msg=${msg}`;
    request(plumber_url,function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            console.log(info.msg);
            res.send(info.msg);
            //res.render('rplumbtest',{layout: 'main_legacy.hbs',msg:info.msg});

        } else{
            console.log("there was an error... \n \n \n");
            console.log(error);
        }
    });
});

app.post('/r_img_plumb',function(req,res){
    const img_name = req.body.img_name;
    const plumber_url = `http://127.0.0.1:7533/img_test?img_name=${img_name}`;
    request(plumber_url,function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            console.log(JSON.parse(body));
            res.send(JSON.parse(body));
            // let info = JSON.parse(body);
            // console.log(info.msg);
            // res.send(info.msg);
            //res.render('rplumbtest',{layout: 'main_legacy.hbs',msg:info.msg});

        } else{
            console.log("there was an error... \n \n \n");
            console.log(error);
        }
    });
});
