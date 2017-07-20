import React, { Component } from 'react';
import { Input, Button } from 'antd';

import './index.less';

class Login extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="login-box">
        <div className="login">
          <h2>登&nbsp;&nbsp;录</h2>
          <Input placeholder="set your name"
                 size="large"
                 className="name-box"
                 onChange={this.props.handleChange}
                 onKeyPress={this.props.onKeyPress}/>
          <Button type="default"
                  loading={this.state.loading}
                  onClick={this.props.handleLogin}>
            Log In
          </Button>
        </div>
      </div>
    )
  }
}

export default Login;