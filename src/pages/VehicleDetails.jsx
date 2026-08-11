import { useParams, useNavigate, Link } from "react-router"
import { useState, useEffect } from "react"
import * as vehicleServices from '../services/vehicles'
import * as recordsServices from '../services/serviceRecords'
import { Button, Card, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Spin, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, DashboardOutlined, CalendarOutlined, CreditCardOutlined, SettingOutlined } from '@ant-design/icons'
import errorImage from '../assets/images/carErrorImage.png'

const { Title, Text, Paragraph } = Typography

const VehicleDetails = ({ handleDeleteVehicle }) => {
    const navigate = useNavigate()
    const { vehicleId } = useParams()

    const today = new Date().toISOString().split('T')[0];

    const [vehicle, setVehicle] = useState(null)
    const [reset, setReset] = useState(0)

    const [form] = Form.useForm()
    const [toEditRecordId, settoEditRecordId] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const fetchVehicle = async () => {
            const vehicleData = await vehicleServices.show(vehicleId)
            setVehicle(vehicleData)
        }
        fetchVehicle()
    }, [vehicleId, reset])



    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        try {
            if (toEditRecordId) {
                await recordsServices.update(vehicleId, toEditRecordId, values)
            } else {
                await recordsServices.create(vehicleId, values)
            }
            setReset(reset + 1)
            closeModal()
        } catch (error) {
            console.error("Failed to save service record:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteRecord = async (recordId) => {
        await recordsServices.deleteRecord(vehicleId, recordId)
        setReset(reset + 1)
    }

    const totalCost = () => {

        const result = vehicle.serviceRecords.reduce((Acc, currService) => {
            return Acc + currService.cost
        }, 0)

        console.log(result);
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
                            src={vehicle.image || errorImage}
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

                            <div>
                                <Link to={`/vehicles/${vehicleId}/edit`}>
                                    <Button icon={<EditOutlined />} style={{ marginRight: '8px' }}>
                                        Edit Vehicle
                                    </Button>
                                </Link>

                                <Popconfirm
                                    title="Delete this vehicle?"
                                    description="This action cannot be undone."
                                    onConfirm={() => handleDeleteVehicle(vehicleId)}
                                    okText="Yes, Delete"
                                    cancelText="Cancel"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button danger icon={<DeleteOutlined />}>
                                        Delete Vehicle
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            <div className="service-records-header">
                <Title level={3} style={{ margin: 0 }}>Service History</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => (console.log('Creating mode'))}>
                    Log Service
                </Button>
            </div>

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
                                    <div style={{ marginTop: '16px' }}>
                                        <Button type="text" icon={<EditOutlined />} onClick={() => (console.log('Editting mode'))} />

                                        <Popconfirm
                                            title="Delete record?"
                                            onConfirm={() => handleDeleteRecord(service._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button type="text" danger icon={<DeleteOutlined />} />
                                        </Popconfirm>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>


        </main>
    )
}

export default VehicleDetails