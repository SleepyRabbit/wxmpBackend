var redis = require('redis');

// var client = redis.createClient(6379,"127.0.0.1");
var client = redis.createClient(6379,"127.0.0.1", {connect_timeout:1000});

client.info(function(err, res){
    if(!err) {
        console.log("Redis client running...");
    }
    else {
        console.log('Redis client error: ' + err);
    }
});

client.on('error', function (error) {
    console.log(error);
});

module.exports = client;