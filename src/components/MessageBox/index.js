import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import Message from '../Message';

class MessageBox extends Component {

  componentDidUpdate() {
    const messageBox = ReactDOM.findDOMNode(this.refs.messageBox);
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  render() {
    const { myUid, messages } = this.props;
    console.log(messages)
    return (
      <div className="message-box" ref="messageBox">
        {messages.map(msg => (
          <Message key={msg.messageId}
                   msgBuddy={msg.username}
                   message={msg.message}
                   time={msg.time}
                   isMyself={myUid == msg.uid ? true : false}
          />
        ))}
      </div>
    )
  }
}

export default MessageBox;