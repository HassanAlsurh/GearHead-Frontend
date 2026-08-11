import { Link } from "react-router"
import { Button, Card, Col, Row, Typography, Empty, Tag } from 'antd'
import { PlusOutlined, DashboardOutlined, CalendarOutlined, CarryOutOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Meta } = Card

import errorImage from '../assets/images/carErrorImage.png'

const Index = ({ vehicles, user }) => {

    // const errorImage = '../assets/images/carErrorImage.png'

    const largestMilage = (inputService) => {
        console.log('input service: ', inputService);

        if (inputService.length === 1) return inputService[0].mileageAtService

        const result = inputService.reduce((maxMilage, currService) => {
            console.log('curr service: ', currService);

            return currService.mileageAtService > maxMilage.mileageAtService ? currService : maxMilage
        }
        )
        console.log(result);
        return result.mileageAtService

    }

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
                                    cover={
                                        <div className="vehicle-card-image-container">
                                            <img
                                                alt={`${vehicle.make} ${vehicle.model}`}
                                                src={vehicle.image || errorImage}
                                                className="vehicle-card-image"

                                                onError={(e) => { e.target.src = errorImage }}
                                            />
                                        </div>
                                    }
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
                                                {
                                                    vehicle.serviceRecords?.length > 0 ? (

                                                        // change the icon
                                                        <Tag icon={<CarryOutOutlined />} color="yellow">
                                                            latest service at {largestMilage(vehicle.serviceRecords).toLocaleString()} km
                                                        </Tag>
                                                    ) : (
                                                        <></>
                                                    )
                                                }
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