import React, { Component , useState} from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import Logo from "../../assets/tripgeni_logo.svg";

import "../../css/navigationBar.css";
import AdminMenu from "./AdminMenu";

class Navbar extends Component {

  state = {
    current: "mail",
    visible: false,
    isMobileView: false,
    isBlackAndWhite: false,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const isMobileView = window.innerWidth < 768;
    this.setState({ isMobileView });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  toggleBlackAndWhite = () => {
    this.setState((prevState) => ({
      isBlackAndWhite: !prevState.isBlackAndWhite,
    }));
  };

  render() {
    const { isMobileView } = this.state;
    const { isBlackAndWhite } = this.state;

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const isAdmin = user && user.isAdmin;

    return (
        <div className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`}>
      <nav className="menuBar">
        <div className="logo">
          <a href="/home">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="menuCon">
          {!isMobileView && (
            <>
              {!isAdmin && (
                <div className="leftMenu">
                  <LeftMenu isBlackAndWhite={isBlackAndWhite} toggleTheme={this.toggleBlackAndWhite} />
                </div>
              )}

              {isAdmin && (
                <div className="leftMenu">
                  <AdminMenu />
                </div>
              )}

              <div className="rightMenu">
                <RightMenu />
              </div>
            </>
          )}
          {isMobileView && (
            <>
              <Button
                className="barsMenu"
                type="primary"
                onClick={this.showDrawer}
              >
                <span className="barsBtn"></span>
              </Button>
              <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                {" "}
                {!isAdmin && <LeftMenu />}
                {isAdmin && <AdminMenu />}
                <RightMenu />
              </Drawer>
            </>
          )}
        </div>
      </nav>
        </div>
    );
  }
}

export default Navbar;
