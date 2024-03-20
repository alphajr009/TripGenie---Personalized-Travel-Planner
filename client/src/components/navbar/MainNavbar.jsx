import React, { Component } from "react";
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
		isMobileView: false // Track if the current view is mobile or desktop
	};

	componentDidMount() {
		window.addEventListener("resize", this.handleResize); // Add a resize event listener
		this.handleResize(); // Call the function initially to set the initial view
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize); // Remove the resize event listener when the component is unmounted
	}

	handleResize = () => {
		const isMobileView = window.innerWidth < 768; // Define the threshold width for mobile view
		this.setState({ isMobileView });
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { isMobileView } = this.state;

		const user = JSON.parse(localStorage.getItem('currentUser'));
		const isAdmin = user && user.isAdmin;

		return (
			<nav className="menuBar">
				<div className="logo">
					<a href="/home">
						<img src={Logo} alt="Logo" />
					</a>
				</div>
				<div className="menuCon">
					{!isMobileView && ( // Render LeftMenu and RightMenu only in desktop view
						<>
							{!isAdmin && (
								<div className="leftMenu">
									<LeftMenu />
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
					{isMobileView && ( // Render the drawer only in mobile view
						<>
							<Button className="barsMenu" type="primary" onClick={this.showDrawer}>
								<span className="barsBtn"></span>
							</Button>
							<Drawer
								title="Menu"
								placement="right"
								closable={false}
								onClose={this.onClose}
								visible={this.state.visible}
							> {!isAdmin && (
								<LeftMenu />

							)}

								{isAdmin && (
									<AdminMenu />
								)}

								<RightMenu />
							</Drawer>
						</>
					)}
				</div>
			</nav>
		);
	}
}

export default Navbar;
