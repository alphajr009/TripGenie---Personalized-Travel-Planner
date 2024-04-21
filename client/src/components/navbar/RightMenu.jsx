import React, { Component } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const avatarStyle = {
  backgroundColor: '#2e96d6',
};

const withTranslationClass = (WrappedComponent) => {
  return function WithTranslationClass(props) {
      const { t } = useTranslation();
      return <WrappedComponent {...props} t={t} />;
  };
};

class RightMenu extends Component {
  logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/home';
  };

  render() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let menu;
    const {t} = this.props;

    if (user) {
      // User is logged in
      menu = (
        <Menu>
          <Menu.Item key="1">
            <Link to="/account">{t("Account")}</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={this.logout}>
            {t("SignOut")}
          </Menu.Item>
        </Menu>
      );
    } else {
      // User is not logged in
      menu = (
        <Menu>
          <Menu.Item key="3">
            <Link to="/login">{t("SignUp")}</Link>
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

export default withTranslationClass(RightMenu);
