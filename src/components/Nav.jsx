import { Link, useNavigate } from "react-router"
import { Layout, Button, Space, Typography, Dropdown, Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header } = Layout;
const { Title } = Typography;

const Nav = (props) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
        navigate('/')
    }

    const userMenuItems = [
        {
            key: 'welcome',
            label: <span className="userMenu-welcome">Welcome back, {props.user?.username}</span>,
            disabled: true,
            style: { color: '#000', cursor: 'default' }
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            danger: true,
            icon: <LogoutOutlined />,
            label: 'Sign Out',
            onClick: handleSignOut
        }
    ];

    return (
        <Header className="nav-header">
            <Link to="/" className="nav-brand-link">
                <Title level={3} className="nav-brand-title">
                    GearHead
                </Title>
            </Link>

            <Space size="large">
                {props.user ? (
                    <>
                        <Link to="/vehicles">
                            <Button type="text" size="large" className="nav-garage-btn">
                                My Garage
                            </Button>
                        </Link>

                        <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft" trigger={['click']}>
                            <Avatar
                                icon={<UserOutlined />}
                                className="nav-user-avatar"
                            />
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <Link to='/sign-in'>
                            <Button type="text" size="large">Sign In</Button>
                        </Link>

                        <Link to='/sign-up'>
                            <Button type="primary" size="large">Sign Up</Button>
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    )
}

export default Nav