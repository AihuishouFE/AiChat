import React, { Component } from 'react';

import Login from './pages/Login';
import ChattingRoom from './pages/ChattingRoom';
import './App.less'

class App extends Component {

	constructor() {
	  super();
	  this.state = {
	    username: '',
      uid: '',
      socket: io()
    }
  }

  handleChange(e) {
	  let username = e.target.value;
    this.setState({
      username
    })
  }

  // 监听回车事件
  handleKeyPress(e) {
    if (e.key == 'Enter') {
      this.handleLogin()
    }
    return false;
  }

  // 登录事件
  handleLogin() {
    let { username } = this.state;
    const uid = this.generateUid();
    if(!username) {
      username = `游客${uid}`;
    }
    this.setState({uid, username});
    this.state.socket.emit('login', {uid, username});
  }

  // 生成一个随机id
  generateUid() {
	  const random = Math.floor(Math.random () * 900) + 100;
	  return random;
  }

	render() {
	  let renderDom;
	  if(this.state.uid) {
	    renderDom = <ChattingRoom uid={this.state.uid}
                                username={this.state.username}
                                socket={this.state.socket}/>
    }else {
	    renderDom = (
	      <Login handleChange={this.handleChange.bind(this)}
               onKeyPress={this.handleKeyPress.bind(this)}
               handleLogin={this.handleLogin.bind(this)}/>
      )
    }
		return (
      <div className="container">
        {renderDom}
      </div>
		);
	}
}

export default App;