import { useNavigate, Link } from "react-router"
import { useState } from "react"
import { signUp } from "../services/auth"
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import logo from '../assets/images/logo.png'

const { Title, Text } = Typography;

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            const newUser = await signUp(values)
            props.setUser(newUser)
            navigate('/')
        } catch (err) {
            setErrorMessage(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="form-card">
            <div className="auth-header">

                <img src={logo} alt="GearHead Logo" className="auth-logo" />

                <Title level={2} className="auth-title">Create an Account</Title>
                <Text type="secondary">Join GearHead to manage your garage.</Text>
            </div>

            {errorMessage && (
                <Alert
                    type="error"
                    showIcon
                    message="Sign Up Failed"
                    description={errorMessage}
                    className="form-alert"
                />
            )}

            <Form
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 3, message: 'Username must be at least 3 characters' }
                    ]}
                >
                    <Input size="large" placeholder="Choose a username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                            message: 'Password must be at least 8 characters and contain both letters and numbers.'
                        }]}
                >
                    <Input.Password size="large" placeholder="Create a password" />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="Confirm your password" />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    size="large"
                    block
                    style={{ marginTop: '8px' }}
                >
                    Sign Up
                </Button>

                <div className="auth-footer">
                    <Text type="secondary">
                        Already have an account? <Link to="/sign-in" className="footer-link">Sign in</Link>
                    </Text>
                </div>
            </Form>
        </Card>
    )
}

export default SignUpForm