const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
    password: 'FLWnAxS88ZDMV7hhmzSO92DndFHCe0xB',
    socket: {
        host: 'redis-19761.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 19761
    }
});
console.log(client)
client.on('connect', () => {
    console.log("Redis connected successfully");
});
client.on('error', (err) => {
    console.log("Redis error " + err);
});

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);

module.exports = client;