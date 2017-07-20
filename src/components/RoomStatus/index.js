import React, { Component } from 'react';
import './index.less';

class RoomStatus extends Component {
  render() {
    const { onlineCount } = this.props;
    return (
      <div className="room-status">
        <p>当前有{onlineCount}人在线</p>
      </div>
    )
  }
}

export default RoomStatus;