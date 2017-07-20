import React, { Component } from 'react';
import './index.less';
import { notification, Icon, Button } from 'antd';

import BuddiesList from '../../components/BuddiesList';
import BuddyInput from '../../components/BuddyInput';
import MessageBox from '../../components/MessageBox';
import RoomStatus from '../../components/RoomStatus';

class ChattingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buddiesList: {},
      onlineCount: 0,
      messages: [],
      socket: this.props.socket,
    };
    this.ready();
  }

  ready() {
    const { socket } = this.state;
    socket.on('login', (o)=>{
      this.updateSystemState(o, 'login');
    });
    socket.on('logout', (o)=>{
      this.updateSystemState(o, 'logout');
    });
    socket.on('message', (obj)=>{
      this.updateMessages(obj);
    });
  }

  handleLogout() {
    location.reload();
  }

  updateSystemState(obj, action) {
    switch(action) {
      case 'login':
        this.setState({
          onlineCount: obj.onlineCount,
          buddiesList: obj.onlineBuddies
        });
        this.openNotification(obj);
        break;
      case 'logout':
        this.setState({
          onlineCount: obj.onlineCount,
          buddiesList: obj.onlineBuddies
        });
        this.openNotification(obj, action);
        break;
    }
  }

  updateMessages(obj) {
    let messages = this.state.messages;
    const newMessage = {
      type: 'chat',
      username: obj.username,
      uid: obj.uid,
      message: obj.message,
      messageId: this.randomMessageId(),
      time: this.randomMessageTime(),
    };
    messages = messages.concat(newMessage);
    this.setState({
      messages
    })
  }

  randomMessageId() {
    return String(new Date().getTime()).slice(5, 10) + "" + Math.floor(Math.random() * 900 + 100);
  }

  randomMessageTime() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    hour = (hour == 0) ? '00' : hour;
    minute = (minute < 10) ? '0' + minute : minute;
    return `${hour}:${minute}`;
  }

  openNotification(obj, action) {
    let description;
    if(action) {
      description = `${obj.user.username}很残忍的离开了我们`
    }else {
      description = `欢迎${obj.user.username}进入聊天室`
    }
    notification.open({
      message: 'Hi',
      description,
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      duration: 2.5
    });
  }

  render() {
    const { onlineCount, buddiesList, messages} = this.state;
    const { uid, username } = this.props;
    return (
      <div className="chatting-box">
        <div className="chatting-room">
          <div className="left-content">
            <RoomStatus onlineCount={onlineCount}/>
            <BuddiesList buddiesList={buddiesList}/>
            <div className="log-out">
              <Button type="primary" onClick={this.handleLogout}>登出</Button>
            </div>
          </div>
          <div className="right-content">
            <MessageBox messages={messages}
                        myUid={uid}/>
            <BuddyInput myUid={uid}
                        myName={username}
                        socket={this.state.socket}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ChattingRoom;