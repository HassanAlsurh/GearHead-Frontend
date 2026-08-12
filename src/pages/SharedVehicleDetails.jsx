import { useParams, useNavigate, Link } from "react-router"
import { useState, useEffect } from "react"
import * as vehicleServices from '../services/vehicles'
import * as recordsServices from '../services/serviceRecords'
import { Button, Card, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Spin, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, DashboardOutlined, CalendarOutlined, CreditCardOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons'
import errorImage from '../assets/images/carErrorImage.png'

const { Title, Text, Paragraph } = Typography

const SharedVehicleDetails = () => {

    const navigate = useNavigate()
    const { vehicleId } = useParams()

    const today = new Date().toISOString().split('T')[0];

    const [vehicle, setVehicle] = useState(null)

    useEffect(() => {
        const fetchVehicle = async () => {
            const vehicleData = await vehicleServices.sharedShow(vehicleId)
            setVehicle(vehicleData)
        }
        fetchVehicle()
    }, [vehicleId])

    const totalCost = () => {
        const result = vehicle.serviceRecords.reduce((Acc, currService) => {
            return Acc + currService.cost
        }, 0)
        return result
    }

    if (!vehicle) {
        return (
            <main className="dashboard-loader">
                <Spin size="large" description="Loading vehicle details..." />
            </main>
        )
    }

    return (
        <main className="dashboard-container">
            <Card className="vehicle-header-card">
                <Row gutter={[24, 24]} align="middle">

                    <Col xs={24} md={8} lg={6}>
                        <img
                            src={vehicle.image?.url || errorImage}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="vehicle-details-image"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = errorImage
                            }}
                        />
                    </Col>

                    <Col xs={24} md={16} lg={18}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <Title level={2} style={{ margin: 0 }}>
                                    {vehicle.make} {vehicle.model}
                                </Title>
                                <Text type="secondary" style={{ fontSize: '16px' }}>
                                    <CalendarOutlined /> {vehicle.year} &nbsp; | &nbsp; <DashboardOutlined /> {vehicle.mileage?.toLocaleString()} km
                                    <br />
                                    <CreditCardOutlined /> Total cost: BHD{totalCost().toLocaleString()} | <SettingOutlined /> Services: {vehicle.serviceRecords.length}
                                </Text>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                {vehicle.serviceRecords?.map((service) => (
                    <Col xs={24} md={12} key={service._id}>
                        <Card className="record-card">
                            <Row justify="space-between" align="top">
                                <Col span={16}>
                                    <Text type="secondary">{service.date?.split('T')[0]}</Text>
                                    <Title level={4} style={{ margin: '4px 0' }}>{service.category}</Title>
                                    <Text type="secondary"><DashboardOutlined /> {service.mileageAtService?.toLocaleString()} km</Text>
                                    <Paragraph style={{ marginTop: '12px', marginBottom: 0 }}>
                                        {service.description}
                                    </Paragraph>
                                </Col>

                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <div className="record-cost">BHD{service.cost}</div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

        </main>
    )
}

export default SharedVehicleDetails