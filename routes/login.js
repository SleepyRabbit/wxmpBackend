var express = require('express');
var router = express.Router();
var request = require('request');
var client = require('../common/common');
var crypto = require('crypto');

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

    // 请求获取session_key和openid。
    var options = {
        url: url,
        method: 'POST',
    };

    request(url, (err, respond, body) => {
        var data = {
            err: err,
            session: "",
        }
        // console.log(err);
        // 将获取session_key和openid后不要返回给小程序，而是生成一个3rd_session返回给小程序，并将它们按照key、value的形式存储到redis中。
        if(!err && respond.statusCode == 200) {
            //生成3rd_session
            crypto.randomBytes(16, (err, buf) => {
                if(!err) {
                    data.session = buf.toString('hex');
                    console.log(data);
                    console.log(body);

                    // 将session作为key，session_key和openid字符串化后作为value存储到redis中
                    client.set(data.session, body, (err, response) => {
                        // console.log(err, res);
                        if(!err) {
                            console.log("Session save to redis successful!");
                            res.send(data);
                        }
                        else {
                            console.log("Session save to redis failed!")
                        }
                    });
                    // client.get(data.session, (err, response) => {
                    //     if(!err) {
                    //         console.log(data);
                    //     }
                    // })
                    // Send session to Mini Program
                    // res.send(data);
                }
                else {
                    console.log("Session generate failed!");
                }
            });
        }
        // 请求失败
        else {
            console.log("Get session_key and openid failed!");
        }
    })
});

module.exports = router;
