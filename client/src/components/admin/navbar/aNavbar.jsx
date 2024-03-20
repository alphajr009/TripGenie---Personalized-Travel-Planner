import React from "react";
import { Col, Row ,Layout } from "antd";
import "./adminNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import AdminList from "../adminList/adminList";
import { Content } from "antd/es/layout/layout";

function AdminNavbar({ setActiveTab, activeTab }) {
	return (
		<Content>
            <Row>
			<Col span={24}>
				<div className="admin_navbar">
						<Col span={23}>
							<div className="admin_navbar-text">
								<h1>Admin Terminal</h1>
							</div>
						</Col>
						<Col className="user-avatar" span={1}>
                            <div className="user_icon">
                                <FontAwesomeIcon icon={faCircleUser} className="user" />
                            </div>
                        </Col>	
				</div>
			</Col>
           
		</Row>

        <Row>
            <Col className="bg-cl" span={24}>
                 <AdminList setActiveTab={setActiveTab} activeTab={activeTab} />
            </Col>
        </Row>
        </Content>

	);
}

export default AdminNavbar;
