import {createServer} from "http";
import {Server} from "ws";

const port = process.argv[2] || process.env["ECHOPORT"] || 3000;

const server = createServer((req, res) => {
    let response = {
        "version": req.httpVersion,
        "method": req.method,
        "url": req.url,
        "address": req.connection.address(),
        "remoteAddress": req.socket.remoteAddress,
        "headers": req.headers,
    };
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response, null, 2));
});

const wsserver = new Server({
    noServer: true
});

wsserver.on("connection", function(ws) {
    console.log("Websocket Connected");
    ws.on("message", (data) => {
       ws.send(data);
    });
    ws.on("error", (err) => {
        console.error(err);
    })
});

server.on("upgrade", function upgrade(request, socket, head) {
    wsserver.handleUpgrade(request, socket, head, function(ws) {
        wsserver.emit('connection', ws, request);
    });
});

server.listen(port);
