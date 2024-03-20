import "../css/profile.css";
import Navbar from "../components/navbar/MainNavbar";
import {
	Layout,
	Button,
	Form,
	Input,
	Radio,
	Col,
	Row,
	DatePicker,
	Tag,
	Icon,
	Select,
	Space,
	notification,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LockOutlined } from "@ant-design/icons";
import moment from "moment";
import UserFooter from "../components/footer/UserFooter";



function Account() {
	const user = JSON.parse(localStorage.getItem("currentUser"));

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [saveButtonText, setSaveButtonText] = useState("Edit Profile");
	const [city, setCity] = useState("");
	const [gender, setGender] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [preferences, setPreferences] = useState([]);
	const { location } = window;

	const [pageLoaded, setPageLoaded] = useState(false);



	useEffect(() => {
		(async () => {
			try {
				const response = await axios.post("/api/users/getuserbyid", {
					userid: user._id,
				});
				const data = response.data[0];
				setEmail(data.email);
				setName(data.name);
				setCity(data.hometown);
				setPhone(data.phonenumber);
				setGender(data.gender);
				setAddress(data.address);
				const flatPreferences = data.favhotles.flat();
				setPreferences(flatPreferences);

			} catch (error) {
				console.log("error");
			}
		})();
	}, []);


	async function changeUserDetails(name, city, gender, phone, address, preferences) {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (!currentUser) throw new Error('User not found in local storage');

		const _id = currentUser._id;
		try {
			const res = await axios.patch('/api/users/updateuser', {
				_id,
				name,
				city,
				gender,
				phone,
				address,
				preferences: [preferences]
			});
			console.log(res.data);

			location.reload();
		} catch (error) {
			console.log(error);
		}
	}




	const onSaveButtonClick = () => {

		form.validateFields().then((values) => {
			setName(values.Name);
			setCity(values.city);
			setGender(values.gender);
			setPhone(values.phone);
			setAddress(values.address);
			setPreferences(values.preferences);


		}).catch((error) => {


		});
	};


	const onSaveButtonClick1 = async () => {
		try {
			form.validateFields().then(async (values) => {
				setName(values.Name);
				setCity(values.city);
				setGender(values.gender);
				setPhone(values.phone);
				setAddress(values.address);
				setPreferences(values.preferences);

				await changeUserDetails(
					values.Name,
					values.city,
					values.gender,
					values.phone,
					values.address,
					values.preferences
				);
				notification.success({
					message: "Success",
					description: "Profile has been saved!",
				});
			}).catch(
			);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};
	const onCancelButtonClick = () => {
		form.resetFields();
		setEditMode(false);
		setSaveButtonText("Edit Profile");
	};


	const options = [
		{ label: "#Zoo", value: "Zoo" },
		{ label: "#Cafe", value: "Cafe" },
		{ label: "#Club", value: "Club" },
		{ label: "#Range", value: "Range" },
		{ label: "#Movie", value: "Movie" },
		{ label: "#Beach", value: "Beach" },
		{ label: "#Hike", value: "Hike" },
		{ label: "#Art", value: "Art" },
		{ label: "#Museum", value: "Museum" },
		{ label: "#Park", value: "Park" },
		{ label: "#History", value: "History" },
		{ label: "#Mall", value: "Mall" },
		{ label: "#Garden", value: "Garden" },
		{ label: "#Amusement", value: "Amusement" },
		{ label: "#Music", value: "Music" },
		{ label: "#Sports", value: "Sports" },
		{ label: "#Spa", value: "Spa" },
		{ label: "#Market", value: "Market" },
		{ label: "#FoodStall", value: "FoodStall" },
		{ label: "#ScenicView", value: "ScenicView" },
		{ label: "#Pub", value: "Pub" },
		{ label: "#Winery", value: "Winery" },
		{ label: "#Adventure", value: "Adventure" },
		{ label: "#Yoga", value: "Yoga" },
		{ label: "#Bookstore", value: "Bookstore" },
		{ label: "#Waterfall", value: "Waterfall" },
		{ label: "#Ski", value: "Ski" },
		{ label: "#Wildlife", value: "Wildlife" },
		{ label: "#CookingClass", value: "CookingClass" },
		{ label: "#HotSpring", value: "HotSpring" },
	];

	const handleChange = (selectedPreferences) => {
		setPreferences(selectedPreferences);
	};


	const [form] = Form.useForm();
	const [formLayout, setFormLayout] = useState("horizontal");


	const initialValues = {
		Name: name,
		city: city,
		gender: gender,
		phone: phone,
		address: address,
		preferences: preferences,
	};

	form.setFieldsValue(initialValues);




	const formItemLayout =
		formLayout === "horizontal"
			? {
				labelCol: {
					span: 4,
				},
				wrapperCol: {
					span: 20,
				},
			}
			: null;

	const buttonItemLayout =
		formLayout === "horizontal"
			? {
				wrapperCol: {
					span: 24,
					style: {
						display: "flex",
						alignItems: "flex-end",
						paddingTop: "10px",
					},
				},
			}
			: null;

	const { RangePicker } = DatePicker;
	const { TextArea } = Input;

	const formattedPreferences = preferences.map((pref) => "#" + pref + " " + " ");


	const onFormLayoutChange1 = ({ layout, ...values }) => {
		setFormLayout(layout);

		setName(values.Name);
		setCity(values.city);
		setGender(values.gender);
		setPhone(values.phone);
		setAddress(values.address);
		setPreferences(values.preferences);
	};




	return (
		<Layout>
			<Navbar></Navbar>
			<div className="profile-cover">
				<Button
					className="user-edit-btn"
					onClick={() => {
						if (editMode) {
							onCancelButtonClick();
						} else {
							setEditMode(true);
							setSaveButtonText("Save");
						}
					}}
				>
					{editMode ? "Cancel" : "Edit Profile"}
				</Button>

			</div>
			<div className="acc-form-sec">
				<Col span={24}>
					<Form
						{...formItemLayout}
						layout={formLayout}
						form={form}
						onChange={onSaveButtonClick}
						initialValues={{
							layout: formLayout,
						}}
						autoComplete="off"
					>
						<div className="form-coloums">
							<Col span={12}>
								<Form.Item
									name="Name"
									rules={[
										{
											required: true,
											message: "Please enter your name!",
										},
									]}>
									<label>Name</label>
									<Input
										value={name}
										placeholder="Name"
										disabled={!editMode}
										onChange={(e) => setName(e.target.value)}
									/>
								</Form.Item>
								<Form.Item
									name="city"
									rules={[
										{
											required: true,
											message: "Please enter your city!",
										},
									]}>
									<label>City</label>
									<Input
										value={city}
										placeholder="City"
										disabled={!editMode}
										onChange={(e) => setCity(e.target.value)}
									/>
								</Form.Item>
								<Form.Item
									name="gender"
									rules={[
										{
											required: true,
											message: "Please select your gender!",
										},
									]}>
									<label>Gender: </label>
									<Radio.Group value={gender} onChange={(e) => setGender(e.target.value)} disabled={!editMode}>
										<Radio value="male">Male</Radio>
										<Radio value="female">Female</Radio>
									</Radio.Group>

								</Form.Item>
								<Form.Item
									name="phone"
									rules={[
										{
											required: true,
											message: "Please enter your phone number!",
										},
									]}>
									<label>Phone Number</label>
									<Input
										value={phone}
										placeholder={phone}
										disabled={!editMode}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="email"

								>
									<label>Email</label>
									<Input

										placeholder={email}

										disabled={true}
										suffix={<LockOutlined style={{ color: "#aaa" }} />}
									/>
								</Form.Item>


								<Form.Item
									name="address"
									rules={[
										{
											required: true,
											message: "Please enter your address!",
										},
									]}>
									<label>Address</label>
									<TextArea
										value={address}
										rows={4}
										placeholder="Address"
										disabled={!editMode}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Form.Item>
								<Space
									style={{
										width: "100%",
									}}
									direction="vertical"
								>
									<Form.Item
										name="preferences"
										rules={[
											{
												required: true,
												message: "Please select your preferences!",
											},
										]}>
										<label>Preferences: </label>
										<Select
											mode="multiple"
											allowClear
											style={{
												width: "84%",
											}}
											placeholder={formattedPreferences}
											defaultValue={preferences}
											onChange={handleChange}
											options={options}
											disabled={!editMode}
										/>

									</Form.Item>
								</Space>
								<Form.Item {...buttonItemLayout}>
									<Button
										className="user-submit-btn"
										disabled={!editMode}
										type="primary"
										htmlType="submit"
										onClick={onSaveButtonClick1}
									>
										Save
									</Button>{" "}

								</Form.Item>
							</Col>
						</div>
					</Form>
				</Col>
			</div>
			<UserFooter />

		</Layout>

	);
}

export default Account;