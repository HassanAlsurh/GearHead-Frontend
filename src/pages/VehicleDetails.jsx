import { useParams, useNavigate, data } from "react-router"
import { useState, useEffect } from "react"
import * as vehicleservices from '../services/vehicles'
import * as recordsServices from '../services/serviceRecords'
const VehicleDetails = () => {

    const navigate = useNavigate()

    const { vehicleId } = useParams()

    const [vehicle, setVehicle] = useState(null)

    useEffect(() => {
        const fetchVehicle = async () => {
            const vehicleData = await vehicleservices.show(vehicleId)
            setVehicle(vehicleData)
        }
        fetchVehicle()
    }, [vehicleId])

    const initialState = {
        date: '',
        category: 'Maintenance',
        description: '',
        cost: '',
        mileageAtService: ''
    }

    const [formData, setFormData] = useState(initialState)

    const [toEdit, setToEdit] = useState(null)

    const handleSetFormData = (recordId) => {
        const valueOfRecord = vehicle.serviceRecords.find((currVehicle) => {
            return currVehicle._id === recordId
        })

        const formattedDate = valueOfRecord.date.split('T')[0];

        setFormData({ ...valueOfRecord, date: formattedDate })
        setToEdit(recordId)
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (toEdit) {
            // handleUpdateVehicle(vehicleId, formData)
            handleUpdateRecord(vehicleId, toEdit, formData)
        } else {
            // handleAddVehicle(formData)
            handleAddRecord(vehicleId, formData)
        }

        setFormData(initialState)
        setToEdit(null)
        console.log('formData: ', formData);
        console.log('toEdit: ', toEdit);

    }

    const handleAddRecord = (vehicleId, formData) => {
        recordsServices.create(vehicleId, formData)
    }
    const handleUpdateRecord = (vehicleId, toEdit, formData) => {
        recordsServices.update(vehicleId, toEdit, formData)
    }

    if (!vehicle) return <main><div className="loader"> Vehicle details are loading... </div></main>

    return (
        <main>
            <div className="car-details">
                <h1>{vehicle.make + ' ' + vehicle.model} </h1>
                <button popovertarget="serviceForm">trigger Popover</button>

                <div popover='auto' id="serviceForm">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='date-input'>Date</label>
                        <input
                            required
                            type='date'
                            name='date'
                            id='date-input'
                            placeholder=""
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <label htmlFor='category-input'>Category</label>
                        <select
                            required
                            name='category'
                            id='category-input'
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value='Maintenance'>Maintenance</option>
                            <option value='Repair'>Repair</option>
                            <option value='Modification'>Modification</option>
                            <option value='Detailing'>Detailing</option>
                            <option value='Other'>Other</option>
                        </select>
                        <label htmlFor='description-input'>Description</label>
                        <textarea
                            required
                            type='text'
                            name='description'
                            id='description-input'
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <label htmlFor='cost-input'>Cost</label>
                        <input
                            required
                            type='number'
                            name='cost'
                            id='cost-input'
                            value={formData.cost}
                            onChange={handleChange}
                        />
                        <label htmlFor='mileageAtService-input'>Mileage At Service</label>
                        <input
                            required
                            type='number'
                            name='mileageAtService'
                            id='mileageAtService-input'
                            value={formData.mileageAtService}
                            onChange={handleChange}
                        />
                        <button type='submit'>SUBMIT</button>
                    </form>
                </div>
            </div>
            <div className="service-records">
                {
                    vehicle.serviceRecords.map((service) => (
                        <>
                            <h1>a record</h1>
                            <button popovertarget="serviceForm" onClick={() => (handleSetFormData(service._id))}>Edit</button>
                        </>
                    ))
                }
            </div>
        </main>
    )

}

export default VehicleDetails