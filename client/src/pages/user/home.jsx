import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Form,
  Input,
  Radio,
  Col,
  DatePicker,
  Select,
  Space,
  notification,
  Row,
  Modal,
} from "antd";
import "../../css/Home.css";
import "../../index.css";
import Navbar from "../../components/navbar/MainNavbar";
import Slider from "../../components/Slider";
import PlaceCard from "../../components/PlaceCard";
import { LockOutlined } from "@ant-design/icons";
import Categories from "../../components/CategoriesCard";
import ExploreSlider from "../../components/ExploreSlider";
import UserFooter from "../../components/footer/UserFooter";
import axios from "axios";

function Home() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [showModal, setShowModal] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad && user && user.isSetup === false) {
      setShowModal(true);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, user]);

  const closeModal = () => {
    setShowModal(false);
  };

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

  async function changeUserDetails(
    name,
    city,
    gender,
    phone,
    address,
    preferences
  ) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) throw new Error("User not found in local storage");

    const _id = currentUser._id;
    try {
      const res = await axios.patch("/api/users/updateuser", {
        _id,
        name,
        city,
        gender,
        phone,
        address,
        preferences: [preferences],
      });
      console.log(res.data);
      currentUser.isSetup = true;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const onSaveButtonClick = () => {
    form
      .validateFields()
      .then((values) => {
        setName(values.Name);
        setCity(values.city);
        setGender(values.gender);
        setPhone(values.phone);
        setAddress(values.address);
        setPreferences(values.preferences);
      })
      .catch((error) => {});
  };

  const onSaveButtonClick1 = async () => {
    try {
      form
        .validateFields()
        .then(async (values) => {
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
        })
        .catch();
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

  const formattedPreferences = preferences.map(
    (pref) => "#" + pref + " " + " "
  );

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
    <div className="Home">
      <Navbar />
      <Slider />
      <h2 className="text-align-center">Explore Sri Lanka</h2>
      <Row className="main-container-padding">
        <Col className="location-card" span={22}>
          <ExploreSlider />
        </Col>
      </Row>
      <h2 className="text-align-center">Categories</h2>
      <Categories />
      <UserFooter />

      <Modal
        visible={showModal}
        onCancel={closeModal}
        onOk={onSaveButtonClick1}
        width={1000}
      >
        <div className="setup-modal">
          <div className="setup-modal-header">
            <h4>Setup Your Profile</h4>
            <p>Complete your profile to get the best experience</p>
          </div>
          <div className="setup-modal-body">
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              onChange={onSaveButtonClick}
              initialValues={{
                layout: formLayout,
              }}
            >
              <div className="form-coloums">
                <Col span={12}>
                  <Form.Item name="Name">
                    <label>Name</label>
                    <Input
                      value={name}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name="city">
                    <label>City</label>
                    <Input
                      value={city}
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name="gender">
                    <label>Gender: </label>
                    <Radio.Group
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="phone">
                    <label>Phone Number</label>
                    <Input
                      value={phone}
                      placeholder={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="email">
                    <label>Email</label>
                    <Input
                      placeholder={email}
                      disabled={true}
                      suffix={<LockOutlined style={{ color: "#aaa" }} />}
                    />
                  </Form.Item>

                  <Form.Item name="address">
                    <label>Address</label>
                    <TextArea
                      value={address}
                      rows={4}
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Item>
                  <Space
                    style={{
                      width: "100%",
                    }}
                    direction="vertical"
                  >
                    <Form.Item name="preferences">
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
                      />
                    </Form.Item>
                  </Space>
                </Col>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
