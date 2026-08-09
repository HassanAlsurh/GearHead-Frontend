import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import * as vehicleservices from '../services/vehicles'
const VehicleDetails = () => {

    const navigate = useNavigate()

    const { vehicleId } = useParams()
    console.log(vehicleId);

    const [vehicle, setVehicle] = useState(null)

    useEffect(() => {
        console.log('1');

        const fetchVehicle = async () => {
            console.log('2');

            const vehicleData = await vehicleservices.show(vehicleId)
            console.log('vehicle data = ', vehicleData);

            setVehicle(vehicleData)
        }
        fetchVehicle()
    }, [vehicleId])

    console.log('actual vehicle ', vehicle);

    if (!vehicle) return <main><div className="loader"> Vehicle details are loading... </div></main>

    return (
        <main>
            <h1>{vehicle.make + ' ' + vehicle.model} </h1>
        </main>
    )

}

export default VehicleDetails