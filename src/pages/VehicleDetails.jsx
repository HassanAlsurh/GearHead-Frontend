import { useParams, useNavigate, Link } from "react-router"
import { useState, useEffect } from "react"
import * as vehicleServices from '../services/vehicles'
import * as recordsServices from '../services/serviceRecords'
import { Button, Card, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Spin, Typography, Switch, List } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, DashboardOutlined, CalendarOutlined, CreditCardOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons'
import errorImage from '../assets/images/carErrorImage.png'

const { Title, Text, Paragraph } = Typography

const VehicleDetails = ({ handleDeleteVehicle }) => {
    const navigate = useNavigate()
    const { vehicleId } = useParams()

    const today = new Date().toISOString().split('T')[0];

    const [vehicle, setVehicle] = useState(null)
    const [reset, setReset] = useState(0)

    const [serviceForm] = Form.useForm()
    const [inviteForm] = Form.useForm()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [toEditRecordId, setToEditRecordId] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [isSubmittingInvite, setIsSubmittingInvite] = useState(false)
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false)

    const closeInviteModal = () => {
        setIsInviteModalVisible(false)
        inviteForm.resetFields()
    }
    const openInviteModal = () => {

        console.log(vehicle.sharedUsers);

        inviteForm.resetFields()
        setIsInviteModalVisible(true)
    }
    const handleInvite = async (values) => {
        setIsSubmittingInvite(true)
        try {
            await vehicleServices.invite(vehicleId, values)
            setReset(reset + 1)
            closeInviteModal()
        } catch (error) {
            console.error("Failed to invite user:", error)
        } finally {
            setIsSubmittingInvite(false)
        }
    }

    const handleUninvite = async (username) => {
        try {
            await vehicleServices.deleteInvite(vehicleId, { username });
            setReset(reset + 1);
        } catch (error) {
            console.error("Failed to uninvite user:", error);
        }
    };

    useEffect(() => {
        const fetchVehicle = async () => {
            const vehicleData = await vehicleServices.show(vehicleId)
            setVehicle(vehicleData)
        }
        fetchVehicle()
    }, [vehicleId, reset])

    const openCreateModal = () => {
        serviceForm.resetFields()
        setToEditRecordId(null)
        setIsModalVisible(true)
    }

    const openEditModal = (record) => {
        const formattedDate = record.date.split('T')[0]
        serviceForm.setFieldsValue({ ...record, date: formattedDate })
        setToEditRecordId(record._id)
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
        serviceForm.resetFields()
        setToEditRecordId(null)
    }


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

                            <div>
                                <Button icon={<UserAddOutlined />} onClick={openInviteModal} style={{ marginRight: '8px' }}>
                                    Invite a user ({vehicle.sharedUsers.length})
                                </Button>

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
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
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
                                        <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(service)} />

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

            <Modal
                title={toEditRecordId ? "Edit Service Record" : "New Service Record"}
                open={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                <Form
                    form={serviceForm}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ category: 'Maintenance' }}
                    style={{ marginTop: '24px' }}
                >
                    <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                        <Input type="date" max={today} defaultValue={today} />
                    </Form.Item>

                    <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="Maintenance">Maintenance</Select.Option>
                            <Select.Option value="Repair">Repair</Select.Option>
                            <Select.Option value="Modification">Modification</Select.Option>
                            <Select.Option value="Detailing">Detailing</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} placeholder="What work was done?" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Cost" name="cost" rules={[{ required: true }]}>
                                <InputNumber
                                    prefix="BHD"
                                    min={0}
                                    step={5}
                                    max={5000}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mileage at Service" name="mileageAtService" rules={[{ required: true }]}>
                                <InputNumber
                                    suffix="km"
                                    defaultValue={vehicle.mileage}
                                    min={0}
                                    max={vehicle.mileage}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Button onClick={closeModal} style={{ marginRight: '8px' }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            {toEditRecordId ? "Update Record" : "Save Record"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title='Manage Access'
                open={isInviteModalVisible}
                onCancel={closeInviteModal}
                footer={null}
            >
                <Form
                    form={inviteForm}
                    layout="vertical"
                    onFinish={handleInvite}
                    style={{ marginTop: '24px' }}
                >
                    <Form.Item
                        label="Invite a New User"
                        name="username"
                        rules={[
                            { required: true, whitespace: true, message: 'Please enter a username' },
                            { min: 2, message: 'Name must be at least 2 characters' },
                        ]}
                    >
                        <Input placeholder="Enter a username to invite" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button onClick={closeInviteModal} style={{ marginRight: '8px' }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={isSubmittingInvite}>
                            Invite User
                        </Button>
                    </Form.Item>
                </Form>

                {
                    vehicle.sharedUsers.map((user)=>(
                        <>
                        <h1>{user.username}</h1>
                        <button onClick={()=>(handleUninvite(user.username))}>revoke access</button>
                        </>
                    ))
                }
            </Modal>
        </main>
    )
}

export default VehicleDetails