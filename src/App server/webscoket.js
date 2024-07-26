/*
* @Author: Mazw
* @Date: 2024-06-17 10:53:44
* @Last Modified by: Mazw
* @Describe: 
*/
const http = require('http');
const websocket = require('ws');
const server = http.createServer();
const wss = new websocket.Server({ server });
let count=0
wss.on('connection', (socket) => {
  console.log('websocket已连接');
  socket.on('message', (message) => {
    count++
    if(message=='ping_rest'){
      count=0
    }
    console.log('收到客户端发来的消息：' + message);
    socket.send('服务端返回消息：' + message + '，已收到！'+count)
  });
  socket.on('close', () => {
    count=0
    console.log('websocket已关闭');
  });
});

server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello,world!');
});

server.listen(9527, () => {
  console.log('服务已启动，端口号为9527');
});