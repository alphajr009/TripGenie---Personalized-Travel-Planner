import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Layout, Space, Col, Row, Button, Form, Input, Checkbox, Alert, notification } from 'antd';
import '../../css/login.css';


const { Content } = Layout;

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);

    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)

    const handlePrivacyPolicyChange = (e) => {
        setIsPrivacyPolicyChecked(e.target.checked);
    };

    const onLoginStart = useCallback(() => {
        alert('login start')
    }, [])

    const generateRandomPassword = () => {
        const length = 10;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        return password;
    };

    const register = async () => {
        if (password === confirmPassword) {
            const user = {
                email,
                password,
            };
            try {
                setLoading(true);
                const result = await axios.post('/api/users/register', user);
                setLoading(false);
                window.location.href = '/login'
            } catch (error) {
                console.log(error);
                setLoading(false);
                if (error.response && error.response.status === 400 && error.response.data.error === 'User with this email already exists.') {
                    // User already exists
                    notification.info({
                        message: 'User Already Registered',
                        description: 'The user with this email is already registered.',
                        placement: 'topLeft',
                        btn: (
                            <button className='notification-btn' type="primary" size="small" onClick={() => { window.location.href = '/login'; }}>
                                Login
                            </button>
                        ),
                    });
                } else {
                    notification.error({
                        message: 'Registration Failed',
                        description: 'An error occurred while registering the user.',
                    });
                }
            }

        } else {
            setWarning(true);
        }
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        register();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Email validation rule
    const validateEmail = (rule, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            return Promise.reject('Please enter a valid email address.');
        }
        return Promise.resolve();
    };

    // Password validation rule
    const validatePassword = (rule, value) => {
        if (value && value.length < 6) {
            return Promise.reject('Password must be at least 6 characters long.');
        }
        if (value && !/[A-Z]/.test(value)) {
            return Promise.reject('Password must contain at least one capital letter.');
        }
        return Promise.resolve();
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]} className="space">
            <Layout>
                <Content>
                    <Row className="main-col">
                        <Col className="form-section" type="flex" justify="center" align="" span={12}>
                            <Col className="innter-form-section" type="flex" justify="center" align="" span={12}>
                                <h2 className="text-align-left">Sign up</h2>
                                <p className="text-align-left">
                                    Let’s explore the world today
                                    <br />
                                    Sign in to start managing your bookings.
                                </p>

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
                                        <label className="text-align-left m-8">Email</label>
                                    </div>
                                    <div>
                                        <Form.Item
                                            name="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your email',
                                                },
                                                {
                                                    validator: validateEmail,
                                                },
                                            ]}
                                        >
                                            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Item>
                                    </div>
                                    <div className="m-8">
                                        <label className="text-align-left m-8">Password</label>
                                    </div>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                            {
                                                validator: validatePassword,
                                            },
                                        ]}
                                    >
                                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Item>
                                    <div className="m-8">
                                        <label className="text-align-left m-8">Confirm password</label>
                                    </div>
                                    <Form.Item
                                        name="Confirm password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        validateStatus={warning ? 'error' : ''}
                                        help={warning ? 'Passwords do not match' : null}
                                    >
                                        <Input.Password
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                        <div className="signup-agree-label">
                                            <Checkbox
                                                checked={isPrivacyPolicyChecked}
                                                onChange={handlePrivacyPolicyChange}
                                            >
                                                I agree with <a href="#PrivacyPolicy">Privacy Policy</a>
                                            </Checkbox>
                                        </div>
                                        <Button
                                            className="login-btn"
                                            type="primary"
                                            htmlType="submit"
                                            disabled={!isPrivacyPolicyChecked}
                                        >
                                            Sign up
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <p className="text-align-center">
                                    Already have an account? <a className="fw-medium" href="/login">Log in</a>
                                </p>
                                {error && <Alert message="Error occurred while signing up" type="error" />}
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

export default SignUp;
