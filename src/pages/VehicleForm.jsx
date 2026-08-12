import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import * as vehicleService from '../services/vehicles'

import { Alert, Button, Card, Form, Input, Select, InputNumber, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const VehicleForm = ({ handleUpdateVehicle, handleAddVehicle }) => {

    const { vehicleId } = useParams()
    const [form] = Form.useForm()


    const currentYear = new Date().getFullYear();
    const maxModelYear = currentYear + 1;

    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileList, setFileList] = useState([])
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const vehicleData = await vehicleService.show(vehicleId)
                form.setFieldsValue(vehicleData)

                if (vehicleData.image?.url) {
                    setPreviewImage(vehicleData.image.url)
                }
            } catch (error) {
                setErrorMessage("Failed to load vehicle data.")
            }
        }

        if (vehicleId) fetchVehicle()
    }, [vehicleId, form])

    const handleSubmit = (values) => {
        setIsSubmitting(true)
        setErrorMessage('')
        const submitData = new FormData()
        submitData.append('make', values.make)
        submitData.append('model', values.model)
        submitData.append('year', values.year)
        submitData.append('mileage', values.mileage)
        if (fileList.length > 0) {
            const fileToUpload = fileList[0].originFileObj || fileList[0];
            submitData.append('image', fileToUpload);
        }

        try {
            if (vehicleId) {
                handleUpdateVehicle(vehicleId, submitData)
            } else {
                handleAddVehicle(submitData)
            }

            form.resetFields()
            setFileList([])
            setPreviewImage('')
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (

        <Card title={vehicleId ? 'Edit Vehicle' : 'New Vehicle'} className="form-card" >

            {errorMessage && (
                <Alert
                    type="error"
                    showIcon
                    title="Letter could not be sent"
                    description={errorMessage}
                    className="form-alert"
                />
            )}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >

                <Form.Item
                    label="Manufacturer"
                    name="make"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter the Manufacturer name',
                        },
                        {
                            min: 2,
                            message: 'Name must be at least 2 characters',
                        },
                    ]}
                >
                    <Input placeholder="TOYOTA" />
                </Form.Item>

                <Form.Item
                    label="Car Name"
                    name="model"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: 'Please enter the Car name',
                        },
                        {
                            min: 2,
                            message: 'Name must be at least 2 characters',
                        },
                    ]}
                >
                    <Input placeholder="COROLLA" />
                </Form.Item>

                <Form.Item
                    name="year"
                    label="Year model"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a Year!'
                        }
                    ]}
                >
                    <InputNumber
                        min={1900}
                        max={maxModelYear}
                        step={1}
                        placeholder={maxModelYear}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    name="mileage"
                    label="Mileage"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the car's Mileage!"
                        }
                    ]}
                >
                    <InputNumber
                        suffix="km"
                        min={0}
                        step={1}
                        placeholder="0"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item label="Car Image" style={{ marginBottom: 0 }}>
                    <Upload
                        accept="image/*"
                        maxCount={1}
                        listType="picture"
                        beforeUpload={() => false}
                        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                        fileList={fileList}
                    >
                        <Button icon={<UploadOutlined />}>{vehicleId ? 'Change Image' : 'Select Image'}</Button>
                    </Upload>
                </Form.Item>
                {previewImage && fileList.length === 0 ? (
                    <div className="preview-wrapper">
                        <span className="preview-label">Currently saved image:</span>
                        <div className="preview-container">
                            <img
                                src={previewImage}
                                alt={`Preview of vehicles' old image`}
                                className="preview-image"
                            />
                        </div>
                    </div>
                ) : (<></>)}

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    block
                >
                    {vehicleId ? 'Update Vehicle' : 'Add Vehicle'}
                </Button>

            </Form>

        </Card>
    )
}

export default VehicleForm