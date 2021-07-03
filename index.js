const WebSocket = require('ws'),
    server = new WebSocket.Server({
        port: process.env.PORT || 5000,
    });

function broadcast (data) {
    server.clients.forEach(ws => {
        ws.send(data);
    });
    
}

server.on('connection', (ws,req) => {
    
    ws.on('message', data => {
        broadcast(data);
    });
    //console.log(req.socket.remoteAddress);
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
if (ip.substr(0, 7) == "::ffff:") {
  ip = ip.substr(7)
}
console.log(ip);
});
