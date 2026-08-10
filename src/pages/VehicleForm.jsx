import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { show } from '../services/vehicles'
const VehicleForm = ({ handleUpdateVehicle, handleAddVehicle }) => {

    const { vehicleId } = useParams()

    const currentYear = new Date().getFullYear();
    const maxModelYear = currentYear + 1;

    const initialState = {
        year: undefined,
        make: undefined,
        model: undefined,
        mileage: undefined,
        image: undefined
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (vehicleId) {
            handleUpdateVehicle(vehicleId, formData)
        } else {
            handleAddVehicle(formData)
        }

        setFormData(initialState)

    }

    useEffect(() => {
        const fetchVehicle = async () => {
            const vehicleData = await hootService.show(vehicleId)
            setFormData(vehicleData)
        }
        if (vehicleId) fetchVehicle()
    }, [vehicleId])

    return (
        <main className='card'>
            <h1>{vehicleId ? 'Edit Vehicle' : 'New Vehicle'}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor='make-input'>Make</label>
                <input
                    required
                    type='text'
                    name='make'
                    id='make-input'
                    value={formData.make}
                    onChange={handleChange}
                />
                <label htmlFor='model-input'>Model</label>
                <input
                    required
                    type='text'
                    name='model'
                    id='model-input'
                    value={formData.model}
                    onChange={handleChange}
                />
                <label htmlFor='year-input'>Year</label>
                <input
                    required
                    min={1900}
                    max={maxModelYear}
                    type='number'
                    name='year'
                    id='year-input'
                    value={formData.year}
                    onChange={handleChange}
                />
                <label htmlFor='mileage-input'>Mileage</label>
                <input
                    required
                    min={0}
                    type='number'
                    name='mileage'
                    id='mileage-input'
                    value={formData.mileage}
                    onChange={handleChange}
                />
                <label htmlFor='image-input'>Image</label>
                <input
                    type='text'
                    name='image'
                    id='image-input'
                    value={formData.image}
                    onChange={handleChange}
                />


                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    )
}

export default VehicleForm