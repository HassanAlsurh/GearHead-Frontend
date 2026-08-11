import { Link } from "react-router"
import { Button, Card, Col, Row, Typography, Empty, Tag } from 'antd'
import { PlusOutlined, DashboardOutlined, CalendarOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Meta } = Card

const Index = ({ vehicles, user }) => {

    return (
        <main className="dashboard-container">

            <header className="dashboard-header-row">
                <Title level={2} style={{ margin: 0 }}>
                    {user ? `${user.username}'s Garage` : 'My Garage'}
                </Title>
                <Link to="/vehicles/new">
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        New Vehicle
                    </Button>
                </Link>
            </header>

            {vehicles.length === 0 ? (
                <Empty
                    className="empty-garage-state"
                    description="Your garage is empty. Time to add your first vehicle!"
                >
                    <Link to="/vehicles/new">
                        <Button type="primary" size="large">Add Vehicle</Button>
                    </Link>
                </Empty>
            ) : (
                <Row gutter={[24, 24]}>
                    {vehicles.map((vehicle) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={vehicle._id}>
                            <Link to={`/vehicles/${vehicle._id}`}>
                                <Card
                                    hoverable
                                    className="vehicle-card-wrapper"
                                >
                                    <Meta
                                        title={`${vehicle.make} ${vehicle.model}`}
                                        description={
                                            <div className="vehicle-card-tags">
                                                <Tag icon={<CalendarOutlined />} color="blue">
                                                    {vehicle.year}
                                                </Tag>
                                                <Tag icon={<DashboardOutlined />} color="purple">
                                                    {vehicle.mileage.toLocaleString()} km
                                                </Tag>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </main>
    )
}

export default Index