let server  = require('websocket').server;
let http    = require('http');

let socket = new server({
    httpServer: http.createServer().listen(1337)
});
console.log('listening on port 1337');

socket.on('request', request => {
    console.log('inside request !!')
    let connection = request.accept(null, request.origin);
    connection.on('message', message => {
        console.log('this is message received from the client (RAW) : ' , message);
        console.log('this is message received from the client : ' , message.utf8Data);
        connection.send('hello from the server');

        setInterval(() => {
            let randNum = Math.random().toString();
            connection.sendUTF('random number received from server : ' + randNum);
        }, 1000);

    });

    connection.on('close', connection => {
        console.log('connection closed');
    });
});



