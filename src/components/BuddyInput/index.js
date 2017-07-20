import React, { Component } from 'react';
import './index.less';

import { Input, Button } from 'antd';
const { TextArea } = Input;

class BuddyInput extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handlePress(e) {
    if (e.key == 'Enter') {
      this.sendMessage()
    }
    return false;
  }

  sendMessage() {
    const { message } = this.state;
    const { socket, myUid, myName } = this.props;
    if(message) {
      const obj = {
        uid: myUid,
        username: myName,
        message
      };
      socket.emit('message', obj);
      this.setState({
        message: ''
      })
    }
    return false;
  }


  render() {
    return (
      <div className="buddy-input">
        <div className="input">
          <TextArea rows={3}
                    placeholder="扯淡、吐槽、表扬、鼓励……想说啥就说啥！"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handlePress.bind(this)}/>
        </div>
        <div className="submit">
          <Button type="primary" onClick={this.sendMessage.bind(this)}>发送</Button>
        </div>
      </div>
    )
  }
}

export default BuddyInput;