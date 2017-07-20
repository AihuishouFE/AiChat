import React, { Component } from 'react';
import './index.less';

class Message extends Component {
  render() {
    const { isMyself, time, message, msgBuddy} = this.props;
    console.log(isMyself)
    return (
      <div className={isMyself ? 'myMsg' : 'otherMsg'}>
        <p className="msg-buddy">{msgBuddy} {time}</p>
        <span className="message">
          {message}
        </span>
      </div>
    )
  }
}

export default Message;