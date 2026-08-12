import { Link } from "react-router"
import { Button, Card, Col, Row, Typography, Empty, Tag } from 'antd'
import { PlusOutlined, DashboardOutlined, CalendarOutlined, CarryOutOutlined } from '@ant-design/icons'

import errorImage from '../assets/images/carErrorImage.png'

const { Title } = Typography
const { Meta } = Card

const SharedIndex = ({ sharedVehicles }) => {

    const largestMileage = (inputService) => {

        if (inputService.length === 1) return inputService[0].mileageAtService

        const result = inputService.reduce((maxMileage, currService) => {
            return currService.mileageAtService > maxMileage.mileageAtService ? currService : maxMileage
        })

        return result.mileageAtService
    }

    return (
        <main className="dashboard-container">
            <header className="dashboard-header-row">
                <Title level={2} style={{ margin: 0 }}>
                    Shared Garage
                </Title>

            </header>

            {sharedVehicles.length === 0 ? (
                <Empty
                    className="empty-garage-state"
                    description="Your Shared garage is empty!"
                >

                </Empty>
            ) : (
                <Row gutter={[24, 24]}>
                    {sharedVehicles.map((vehicle) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={vehicle._id}>
                            <Link to={`/vehicles/shared/${vehicle._id}`}>
                                <Card
                                    hoverable
                                    className="vehicle-card-wrapper"
                                    cover={
                                        <div className="vehicle-card-image-container">
                                            <img
                                                alt={`${vehicle.make} ${vehicle.model}`}
                                                src={vehicle.image?.url || errorImage}
                                                className="vehicle-card-image"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = errorImage
                                                }}
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
                                                    vehicle.serviceRecords?.length > 0 && (
                                                        <Tag icon={<CarryOutOutlined />} color="gold">
                                                            Latest service at {largestMileage(vehicle.serviceRecords).toLocaleString()} km
                                                        </Tag>
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

export default SharedIndex