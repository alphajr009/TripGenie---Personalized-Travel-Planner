import React, { Component } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import LanguageSelector from '../LanguageSelector';
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

class LeftMenu extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = user && user.isAdmin;
    const {t} = this.props;

    return (
      <Menu mode="horizontal">
        <>
          <Menu.Item key="language">
            <Avatar icon = {<LanguageSelector/>} style={avatarStyle} />
          </Menu.Item>
          
          <Menu.Item key="mail">
            <a href="/home">{t("Home")}</a>
          </Menu.Item>
          <Menu.Item key="location">
            <a href="/locations">{t("Locations")}</a>
          </Menu.Item>
          <Menu.Item key="favourites">
            <a href="/trips">{t("Trips")}</a>
          </Menu.Item>
        </>

      </Menu>
    );
  }
}

export default withTranslationClass(LeftMenu);
