// server.js
const uuidV4 = require('uuid/v4');

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
var user = 1;
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log("NUMBER OF USERS:" + wss.clients.size);
  wss.broadcast(JSON.stringify({type: 'systemUpdates', users: wss.clients.size}))

  ws.on('message', (message) =>{
    const jsonMessage = JSON.parse(message);
    jsonMessage.id = uuidV4();
    if(jsonMessage.type==="postMessage"){
    jsonMessage.type = "incomingMessage";
    jsonMessage.users = `${wss.clients.size } Users online`
    console.log(jsonMessage);
  }else{
    jsonMessage.type = "incomingNotification";
  }
    //ws.send(JSON.stringify(jsonMessage));
    wss.broadcast(JSON.stringify(jsonMessage));
  });

  //ws.send('something');
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {//console.log('Client disconnected'));
    console.log('Client disconnected');
    console.log("NUMBER OF USERS:" + wss.clients.size);
    //user -= 1
    //console.log("NUMBER OF USERS:" + user);
  });
});

// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === client.OPEN) {
//       client.send(data);
//     }
//   });
// };