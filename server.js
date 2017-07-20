const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});


// 这边一定是server
server.listen(3000, function(err) {
	if (err) {
		return console.error(err);
	}
	console.log('Listening at http://localhost:3000/');
});

// chatting room part

// 在线用户
let onlineBuddies = {};

// 在线人数
let onlineCount = 0;

io.on('connection', socket => {

  // 监听用户登录
  socket.on('login', obj => {

    console.log(obj)

    // 用户id 设为 socket id
    socket.uid = obj.uid;

    // 判断该用户是否存在
    if (!onlineBuddies.hasOwnProperty(obj.uid)) {
      onlineBuddies[obj.uid] = obj.username;
      onlineCount++;
    }

    // 向用户端发送登录事件，并带上在线用户、在线人数、以及登录用户
    io.emit('login', {
      onlineBuddies,
      onlineCount,
      user: obj
    });

    console.log(obj.username + '加入了群聊');
  });

  // 监听断开事件
  socket.on('disconnect', () => {
    // 如果该用户存在
    if (onlineBuddies.hasOwnProperty(socket.uid)) {
      let obj = {
        uid: socket.uid,
        username: onlineBuddies[socket.uid]
      };
      delete onlineBuddies[socket.uid];
      onlineCount--;
      // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
      io.emit('logout', {
        onlineBuddies: onlineBuddies,
        onlineCount: onlineCount,
        user: obj
      });
      console.log(obj.username + '退出了群聊');
    }
  });

  // 监听客户端发送的信息
  socket.on('message', obj => {
    io.emit('message', obj);
    console.log(obj.username + "说:" + obj.message)
  })
});
