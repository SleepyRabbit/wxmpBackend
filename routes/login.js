var express = require('express');
var router = express.Router();
var request = require('request')
var session = require('express-session');
var redisStore = require('connect-redis')(session);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

    var appid = "wxd9dd7a39008b6d48";
    var appsecret = "305fb1d59364309f40713d74cc6a7e0c";

    var url ='https://api.weixin.qq.com/sns/jscode2session'
        + '?appid=' + appid +
        '&secret=' + appsecret +
        '&js_code=' + req.body.code +
        '&grant_type=authorization_code';

    var options = {
        url: url,
        method: 'POST',
    };

    request(url, (err, respond, body) => {
        var data = {
            err: err,
            data: {},
        }
        // console.log(err);
        if(!err && respond.statusCode == 200) {
            // console.log(body);
            data.data = body;
        }
        res.send(data);
    })
});

module.exports = router;
