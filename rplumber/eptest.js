const request = require('request');
const plumber_url = "http://127.0.0.1:5158";
const options = {
    url: plumber_url+'/echo',
    headers: {
        'msg': 'yoo'
    }
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response);
        //const info = JSON.parse(body);
    } else{
        console.log("there was an error... \n \n \n");
        console.log(error);
    }
}

class Rplumber{
    construct() {}

    echo(msg){
        request({
            url: plumber_url+'/echo',
            headers: {
                'msg': msg
            }
        }, callback);
    }


}

const rp = new Rplumber();
modules.exports = rp;