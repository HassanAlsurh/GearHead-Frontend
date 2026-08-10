import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Alert, Card, Row, Col, Statistic, Button, Spin, Typography } from 'antd';
import { CarOutlined, DashboardOutlined, CreditCardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Home = ({ user, vehicles }) => {

    const [errorMessage, setErrorMessage] = useState(null)

    const totalCars = vehicles.length;

    let jService = 0
    let documentedCars = 0

    let totalMileage = 0
    let totalCost = 0

    vehicles.forEach((vehicle) => {

        totalMileage += vehicle.mileage

        vehicle.serviceRecords?.forEach((service) => {
            totalCost += service.cost
            jService++
        })

        documentedCars++
    })

    if (!vehicles && documentedCars !== totalCars) {
        return (
            <main className="dashboard-loader">
                <Spin size="large" />
            </main>
        );
    }

    if (errorMessage) {
        return (
            <Alert
                type="error"
                showIcon
                title="Letter could not be sent"
                description={errorMessage}
                className="form-alert"
            />
        )
    }

    return (
        <main className="dashboard-container">

            <div className="dashboard-header-row">
                <Title level={2} style={{ margin: 0 }}>Dashboard</Title>

                <Link to="/vehicles">
                    <Button type="primary" size="large">
                        Check Garage
                    </Button>
                </Link>
            </div>

            <Text type="secondary" style={{ fontSize: '16px' }}>
                Welcome back, {user?.username}. Here is an overview of your garage.
            </Text>

            <Row gutter={[16, 16]} className="dashboard-stats-row">
                <Col xs={24} sm={8}>
                    <Card className="stat-card">
                        <Statistic
                            title="Number Vehicles"
                            value={totalCars}
                            prefix={<CarOutlined />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Fleet Mileage"
                            value={totalMileage}
                            prefix={<DashboardOutlined />}
                            suffix="km"
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Service Cost"
                            value={'BD ' + totalCost}
                            prefix={<CreditCardOutlined />}
                            precision={2}
                        />
                    </Card>
                </Col>
            </Row>


        </main>
    );
}

export default Home;