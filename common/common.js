var redis = require('redis');

// var client = redis.createClient(6379,"127.0.0.1");
var client = redis.createClient(6379,"127.0.0.1", {connect_timeout:1000});

client.info(function(err,response){
    if(!err) {
        console.log("Redis client running...");
    }
});

client.on('error', function (error) {
    console.log(error);
});

// var obj = {
//             session_key: "XnuUDLjlfoS4NpdYjbhIqw==",
//             openid: "o_zwE5uazPiMNgixodmYDhOgabjg"
//             };
//
// var str = JSON.stringify(obj);
//
// // console.log(str);
//
// client.set("dded", str, (err, res) => {
//     console.log(err, res);
// });
//
// client.get("dded", (err, res) => {
//     console.log(err, res);
//     if(!err) {
//         var obj1  = JSON.parse(res);
//         console.log(obj1);
//     }
// });

// export default client;
module.exports = client;