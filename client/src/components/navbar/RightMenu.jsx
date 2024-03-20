import React, { Component } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const avatarStyle = {
  backgroundColor: '#2e96d6',
};

class RightMenu extends Component {
  logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/home';
  };

  render() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let menu;

    if (user) {
      // User is logged in
      menu = (
        <Menu>
          <Menu.Item key="1">
            <Link to="/account">Account</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={this.logout}>
            Sign Out
          </Menu.Item>
        </Menu>
      );
    } else {
      // User is not logged in
      menu = (
        <Menu>
          <Menu.Item key="3">
            <Link to="/login">Sign In</Link>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu mode="horizontal">
        <Menu.Item>
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} style={avatarStyle} />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
