import React, { Component } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const avatarStyle = {
  color: '#000000',
  backgroundColor: 'transparent'
};

class LeftMenu extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = user && user.isAdmin;

    const languageMenu = (
      <Menu>
        <Menu.Item key="english">English</Menu.Item>
        <Menu.Item key="french">French</Menu.Item>
        <Menu.Item key="hindi">Hindi</Menu.Item>
        <Menu.Item key="tamil">Tamil</Menu.Item>
      </Menu>
    );

    return (
      <Menu mode="horizontal">
        <>
          <Menu.Item key="language">
            <Dropdown overlay={languageMenu} placement="bottomCenter">
              <Avatar icon={<GlobalOutlined />} style={avatarStyle} />
            </Dropdown>
          </Menu.Item>
          
          <Menu.Item key="mail">
            <a href="/home">Home</a>
          </Menu.Item>
          <Menu.Item key="location">
            <a href="/locations">Locations</a>
          </Menu.Item>
          <Menu.Item key="favourites">
            <a href="/trips">Trips</a>
          </Menu.Item>
        </>

      </Menu>
    );
  }
}

export default LeftMenu;
