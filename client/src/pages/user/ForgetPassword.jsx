import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Space,
  Col,
  Row,
  Button,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import "../../css/login.css";

const { Content } = Layout;
const { Title } = Typography;

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("initial");
  const [countdown, setCountdown] = useState(600);

  useEffect(() => {
    if (countdown > 0 && status === "otpSent") {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, status]);

  const formatCountdown = (countdown) => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, "0")}m ${seconds
      .toString()
      .padStart(2, "0")}s`;
  };

  const handleOtpSendFailedNotification = (description) => {
    notification.error({
      message: "OTP Code Send Failed",
      description,
      placement: "topLeft",
    });
  };

  const handleOtpSendSuccessNotification = () => {
    notification.success({
      message: "OTP Sent Successfully",
      placement: "topLeft",
    });
  };

  const handleOtpCorrectNotification = () => {
    notification.success({
      message: "OTP Verified Successfully",
      placement: "topLeft",
    });
  };

  const otpSend = async () => {
    try {
      await axios.post("api/email/otp", { email });
      setStatus("otpSent");
      handleOtpSendSuccessNotification();
    } catch (error) {
      handleOtpSendFailedNotification("Failed to send OTP");
    }
  };

  const otpCheck = async () => {
    try {
      await axios.post("api/email/otpcheck", { email, otp });
      setStatus("otpVerified");
      handleOtpCorrectNotification();
    } catch (error) {
      notification.error({
        message: "Invalid OTP or email",
        placement: "topLeft",
      });
    }
  };

  const onFinish = async (values) => {
    if (status === "otpVerified") {
      try {
        await axios.post("api/users/changepasswordOtp", {
          email,
          newPassword: values.newPassword,
        });
        notification.success({
          message: "Password Changed Successfully",
          placement: "topLeft",
        });
        setStatus("passwordReset");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1100);
      } catch (error) {
        notification.error({
          message: "Failed to change password",
          placement: "topLeft",
        });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%" }}
      size={[0, 48]}
      className="space"
    >
      <Layout>
        <Content>
          <Row className="main-col">
            <Col className="form-section" span={12}>
              <Col className="innter-form-section" span={12}>
                {status === "initial" && (
                  <>
                    <Title level={3}>Forgot Password</Title>
                    <Form
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <div className="m-8">
                        <label className="text-align-left m-8">Email</label>
                      </div>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email address",
                          },
                        ]}
                      >
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                      <Button
                        onClick={otpSend}
                        className="login-btn"
                        type="primary"
                        htmlType="submit"
                      >
                        Send OTP
                      </Button>
                    </Form>
                  </>
                )}
                {status === "otpSent" && (
                  <>
                    <Title level={3}>Enter OTP Code</Title>
                    <Form
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <div className="m-8">
                        <label className="text-align-left m-8">OTP</label>
                      </div>
                      <Form.Item
                        name="otp"
                        rules={[
                          {
                            required: true,
                            message: "Please input your OTP!",
                          },
                        ]}
                      >
                        <Input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </Form.Item>
                      <Button
                        onClick={otpCheck}
                        className="login-btn"
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                      <div className="resend-otp-btn">
                        <Button
                          disabled={countdown > 0}
                          onClick={() => {
                            otpSend();
                            setCountdown(600);
                          }}
                        >
                          Resend OTP{" "}
                          {countdown > 0 && `(${formatCountdown(countdown)})`}
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
                {status === "otpVerified" && (
                  <>
                    <Title level={3}>Change Password</Title>
                    <Form
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <div className="m-8">
                        <label className="text-align-left m-8">
                          New Password
                        </label>
                      </div>
                      <Form.Item
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please input your new password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <div className="m-8">
                        <label className="text-align-left m-8">
                          Confirm New Password
                        </label>
                      </div>
                      <Form.Item
                        name="confirmNewPassword"
                        dependencies={["newPassword"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your new password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("newPassword") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("The two passwords do not match!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Button
                        className="login-btn"
                        type="primary"
                        htmlType="submit"
                      >
                        Change Password
                      </Button>
                    </Form>
                  </>
                )}
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
}

export default ForgetPassword;
