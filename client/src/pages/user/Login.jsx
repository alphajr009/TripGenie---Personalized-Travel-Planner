import React, { useState } from "react";
import axios from "axios";
import {
  Layout,
  Space,
  Col,
  Row,
  Button,
  Form,
  Input,
  Checkbox,
  notification,
} from "antd";

import "../../css/login.css";
import { useTranslation } from "react-i18next";
import Menu from './Menu'
import "../../css/Theme.css"

const { Content } = Layout;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const {t} = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [isIncreased, setIsIncreased] = useState(false);
  const [fontFamilyIndex, setFontFamilyIndex] = useState(0);
  const [highlightLinks, setHighlightLinks] = useState(false); 


  const fontFamiliesone = ['font1', 'font2'];
	const fontFamilietwo = ['font3', 'font2'];


  const handleRememberMeChange = (e) => {
    setIsRememberMe(e.target.checked);
  };

  const handleLoginFailedNotification = (description) => {
    notification.error({
      message: "User Login Failed",
      description,
      placement: "topLeft",
    });
  };

  const toggleHighlightLinks = () => {
		setHighlightLinks(prevState => !prevState);
	  };

  const toggleFontFamily = () => {
		setFontFamilyIndex(prevIndex => (prevIndex + 1) % fontFamiliesone.length, fontFamilietwo.length);
	  };

  const toggleFontSize = () => {
		setIsIncreased(prevState => !prevState);
	  };

  const toggleTheme = () => {
		setIsBlackAndWhite(prevState => !prevState);
	  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const { data, status } = await axios.post("/api/users/login", user);
      setLoading(false);

      if (status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        if (data.isAdmin) {
          window.location.href = "/admin/places";
        } else {
          window.location.href = "/home";
        }
      } else {
        handleLoginFailedNotification("Login failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        handleLoginFailedNotification("User not found.");
      } else if (error.response && error.response.status === 400) {
        handleLoginFailedNotification("Incorrect password.");
      } else {
        handleLoginFailedNotification("An error occurred. Please try again.");
      }
    }
  }

  return (
    <Space
      direction="vertical"
      style={{ width: "100%" }}
      size={[0, 48]}
      className="space"
    >
      <Layout className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`}>
        <Content>
        <Menu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            toggleTheme={toggleTheme}
            isIncreased={isIncreased}
            toggleFontFamily={toggleFontFamily}
            toggleFontSize={toggleFontSize}
            fontFamilietwo={fontFamilietwo}
            toggleHighlightLinks={toggleHighlightLinks} 
            isBlackAndWhite={isBlackAndWhite}

          />
          <Row className="main-col">
            <Col className="form-section" span={12}>
              <Col className="innter-form-section" span={12}>
              <div className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`}>

                <h1 className="text-align-left" style={{ fontSize: isIncreased ? '35px' : '25px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>{t("Login")}</h1>
                <p className="text-align-left" style={{ fontSize: isIncreased ? '16px' : '12px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>
                  {t("LoginHeader")}
                  <br />
                  {t("LoginHeader2")}
                </p>
              </div>

                <Form
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <div className="m-8">
                    <div className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`}>
                      <label className="text-align-left m-8" style={{ fontSize: isIncreased ? '30px' : '20px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>{t("Email")}</label>
                    </div>
                  </div>
                  <div>
                    <Form.Item
                      name="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email",
                        },
                      ]}
                    >
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="m-8">
                    <div className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`}>
                      <label className="text-align-left m-8" style={{ fontSize: isIncreased ? '30px' : '20px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>{t("Password")}</label>
                    </div>
                  </div>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    className="sign-up-btn-col"
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <Button
                      onClick={login}
                      className="login-btn"
                      type="primary"
                      htmlType="submit"
                      style={{ fontSize: isIncreased ? '17px' : '14px', fontFamily: fontFamilietwo[fontFamilyIndex]}}
                    >
                      {t("Login")}
                    </Button>
                  </Form.Item>
                </Form>
                <div className="forget-pw">
                  <Checkbox
                    checked={isRememberMe}
                    onChange={handleRememberMeChange}
                  >
                    <a
                      title={
                        isRememberMe
                          ? "You are Remembered!"
                          : "Click to Remember"
                      }
                      className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`} style={{ fontSize: isIncreased ? '17px' : '14px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>
                      {t("Remember")}
                    </a>
                  </Checkbox>{" "}
                  
                  <a href="/forget-password" className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`} style={{ fontSize: isIncreased ? '17px' : '14px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>{t("ForgotPW")}</a>{" "}
                </div>
                <div className="login-acc-have">
                  <div className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`}>

                  <p className="text-align-center" style={{ fontSize: isIncreased ? '17px' : '14px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>
                    {t("SignupDescription")}{" "}
                    <a className={`fw-medium ${highlightLinks ? 'highlighted-link' : ''}`} href="/signup" style={{ fontSize: isIncreased ? '17px' : '14px', fontFamily: fontFamilietwo[fontFamilyIndex]}}>
                      {t("SignUp")}
                    </a>{" "}
                  </p>
                  </div>
                </div>
              </Col>
            </Col>
            <Col
              className="login-pic"
              type="flex"
              justify="space-around"
              align="middle"
              span={12}
            ></Col>
          </Row>
        </Content>
      </Layout>
    </Space>
  );
};

export default Login;
