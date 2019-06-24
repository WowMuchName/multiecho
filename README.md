# multiecho
Echo-Server supporting both http and websockets. It listens for connections on a specified port.
HTTP- and WS-Echo are handled on the same route.

When a HTTP-Request is made, the server responds with a json response that echoes headers,
method, url and other parameters used in the request back to the sender.

When a websocket session is established, the server echoes back each send packet. 

## Installation

### Via Docker
```
docker run -d -p 3000:3000 wowmuchname/multiecho
```

### Via NPM
```
npm i -g multiecho
multiecho
```

## Port-Configuration
The listener port is determined as follows

1. If a commandline argument is passed, it is used as port
2. If the environment-variable *ECHOPORT* is set, it is used as port
3. Port 3000 is used

### Custom port with Docker
```
docker run -d -p MYPORT:3000 wowmuchname/multiecho
```

### Custom port with npm
```
multiecho MYPORT
```

