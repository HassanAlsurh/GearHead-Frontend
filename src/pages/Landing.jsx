import { Link } from "react-router"
import { Button, Space, Typography } from 'antd'

const { Title, Paragraph } = Typography;

const Landing = () => {
    return (
        <main className="landing-wrapper">
            <div className="landing-card">

                {/* a logo here would be good and to the navbar too */}

                <Title level={1} className="landing-title">
                    Welcome to <span className="landing-brand-text">GearHead</span>
                </Title>

                <Paragraph type="secondary" className="landing-subtitle">
                    Your personal garage management system. <br />
                    Sign up or sign in to track your vehicles, log service records, and monitor your maintenance costs.
                </Paragraph>

                <Space size="middle">
                    <Link to='/sign-up'>
                        <Button type="primary" className="landing-btn">
                            Sign Up
                        </Button>
                    </Link>
                    <Link to='/sign-in'>
                        <Button className="landing-btn">
                            Sign In
                        </Button>
                    </Link>
                </Space>

            </div>
        </main>
    )
}

export default Landing