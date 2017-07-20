import React, { Component } from 'react';
import './index.less';

class BuddiesList extends Component {
  render() {
    const { buddiesList } = this.props;
    return (
      <div className="buddies-list">
        {Object.keys(buddiesList).map(buddyKey => (
          <div key={buddyKey} className="buddy">{buddiesList[buddyKey]}</div>
        ))}
      </div>
    )
  }
}

export default BuddiesList;