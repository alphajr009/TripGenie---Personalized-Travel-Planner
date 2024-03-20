import React, { useState, useEffect } from "react";
import { Table, Col, Input, Button, } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faIdBadge,
	faListNumeric,
	faUser,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import "./users.css";

function Users() {
	const [customerid, setcustomerid] = useState("");
	const [isAdmin, setisAdmin] = useState("");
	const [displayname, setDisplayname] = useState("");
	const [users, setusers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState();

	const { Option } = Select;

	const handlecustomer = (e) => {
		setDisplayname(e.target.value);
	};
	const handlecustomerid = (e) => {
		setcustomerid(e.target.value);
	};

	const handleuserposition = (value) => {
		setisAdmin(value);
	};

	const handleFilter = () => {
		let tempUsers = [...users];

		if (customerid !== "") {
			tempUsers = tempUsers.filter((user) => user._id.includes(customerid));
		}

		if (displayname !== "") {
			tempUsers = tempUsers.filter((user) => {
				if (user.name && typeof user.name === 'string') {
					return user.name.toLowerCase().includes(displayname.toLowerCase());
				}
				return false;
			});
		}


		if (isAdmin !== null) {
			tempUsers = tempUsers.filter(
				(user) => user.isAdmin === (isAdmin === "true")
			);
		}

		setFilteredUsers(tempUsers);
	};

	const columns = [
		{
			title: "Customer ID",
			dataIndex: "_id",
			key: "_id",
		},
		{
			title: "Customer Name",
			dataIndex: "displayName",
			key: "displayName",
			render: (text, record) => {
				return `${record.name} `;
			},
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "IsAdmin",
			dataIndex: "isAdmin",
			key: "isAdmin",
			render: (_, users) => {
				if (users.isAdmin) {
					return (
						<button className="btn-edit-places-by-seller">Yes</button>
					);
				} else {
					return (
						<button
							className="admin-terminal-isAdmin-users-no"
							onClick={() => {
								Swal.fire({
									title: "Confirm making this user an Admin?",
									icon: "question",
									showCancelButton: true,
									cancelButtonText: "Cancel",
									confirmButtonColor: "#3085d6",
									cancelButtonColor: "#d33",
									confirmButtonText: "Yes, do it!",
								}).then((result) => {
									if (result.isConfirmed) {
										updateAdmin(users._id, true);
										Swal.fire(
											"Updated!",
											`${users.fname} is now an Admin`,
											"success"
										).then((result) => {
											window.location.href =
												"http://localhost:3000/admin/users";
										});
									}
								});
							}}
						>
							No
						</button>
					);
				}
			},
		},
	];

	useEffect(() => {
		(async () => {
			try {
				setloading(true);
				const data = (await axios.get("/api/users/getallusers")).data;
				setusers(data.users);
				setFilteredUsers(data.users);
				setloading(false);
			} catch (error) {
				console.log(error);
				setloading(false);
				seterror(error);
			}
		})();
	}, []);

	async function updateAdmin(_id, isAdmin) {
		try {
			const res = (
				await axios.patch("/api/users/changeadmin", { _id, isAdmin })
			).data;
			console.log("Admin update Successfully");
		} catch (error) {
			console.log(error);
			setloading(false);
		}
	}

	useEffect(() => {
		handleFilter();
	}, [displayname, customerid, isAdmin]);

	return (
		// container for table and searchbar
		<div className="admin-terminal-users">
			{/* container for search bar */}

			<Col span={14} className="main-search-bar">
				{/* container for booking id */}
				<Col span={14}>
					<div>
						<Input
							type="text"
							placeholder="Customer name"
							className="search-input-main"
							value={displayname}
							onChange={handlecustomer}
						/>
					</div>
				</Col>
				<Col span={5}>
					<div>
						<Select
							className="option-selector"
							placeholder="IsAdmin"
							value={isAdmin}
							onChange={handleuserposition}
						>
							<Option key="true">Yes</Option>
							<Option key="false">No</Option>
						</Select>
					</div>
				</Col>
				<Col span={4}>
					<div>
						<Button
							className="search-button"
							onClick={handleFilter}
						>
							Search
						</Button>
					</div>
				</Col>
				{/* container for booking status */}

				{/* container fors search*/}
			</Col>
			<div className="admin-users-table">
				<Table
					columns={columns}
					dataSource={filteredUsers}
					pagination={{ pageSize: 10 }}
					rowKey="_id"
					className="admin-terminal-room-table"
					footer={() => (
						<div className="no-of-users">{`Total  ${users.length} users `}</div>
					)}
				/>
			</div>
		</div>
	);
}

export default Users;
