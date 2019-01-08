const request = require('request');
const app = require('../../app.js');

app.post('/r_plumb',function(req,res){
    const msg = req.body.msg;
    const plumber_url = `http://127.0.0.1:5158/echo?msg=${msg}`;
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

app.post('/')


