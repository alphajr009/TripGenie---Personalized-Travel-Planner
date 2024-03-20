import React, { Component } from 'react';
import { Menu } from 'antd';

class LeftMenu extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = user && user.isAdmin;

    return (
      <Menu mode="horizontal">
        <>
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
