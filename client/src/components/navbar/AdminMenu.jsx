import React, { Component } from "react";
import { Menu, Avatar, Dropdown } from 'antd';
import {GlobalOutlined} from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const avatarStyle = {
    color: '#000000',
    backgroundColor: 'transparent'
  };

  const withTranslationClass = (WrappedComponent) => {
    return function WithTranslationClass(props) {
        const { t } = useTranslation();
        return <WrappedComponent {...props} t={t} />;
    };
};
  
class AdminMenu extends Component {
  
  render() {
    const {t} = this.props;
    const languageMenu = (
        <Menu>
          <Menu.Item key="english">English</Menu.Item>
          <Menu.Item key="french">French</Menu.Item>
        </Menu>
      );

    return (
      <Menu className="nav-menu-items" mode="horizontal">
          <Menu.Item key="language">
            <Dropdown overlay={languageMenu} placement="bottomCenter">
              <Avatar icon={<GlobalOutlined />} style={avatarStyle} />
            </Dropdown>
          </Menu.Item>

        <Menu mode="horizontal" key="place">
          <a href="/home">Home</a>
        </Menu>

        <Menu mode="horizontal" key="place">
          <a href="/admin/places">Place</a>
        </Menu>

        <Menu mode="horizontal" key="users">
          <a href="/admin/users">Users</a>
        </Menu>
      </Menu>
    );
  }
}

export default withTranslationClass(AdminMenu);
