import { useNavigate, Link } from "react-router"
import { useState } from "react"
import { signIn } from "../services/auth"
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import logo from '../assets/images/logo.png'

const { Title, Text } = Typography;

const SignInForm = (props) => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            const signedInUser = await signIn(values)
            props.setUser(signedInUser)
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

                <Title level={2} className="auth-title">Welcome Back</Title>
                <Text type="secondary">Please enter your details to sign in.</Text>
            </div>

            {errorMessage && (
                <Alert
                    type="error"
                    showIcon
                    message="Sign In Failed"
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
                        { required: true, message: 'Please enter your username!' }
                    ]}
                >
                    <Input size="large" placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter your password!' }
                    ]}
                >
                    <Input.Password size="large" placeholder="Enter your password" />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    size="large"
                    block
                    style={{ marginTop: '8px' }}
                >
                    Sign In
                </Button>

                <div className="auth-footer">
                    <Text type="secondary">
                        Don't have an account? <Link to="/sign-up" className="footer-link"  >Sign up</Link>
                    </Text>
                </div>
            </Form>
        </Card>
    )
}

export default SignInForm