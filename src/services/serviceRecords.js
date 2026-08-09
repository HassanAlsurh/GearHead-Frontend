const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vehicles`


// app.post('/vehicles/:vehicleId/service-records', verifyToken, serviceCtrl.create)


const create = async (vehicleId, recordData) => {
    try {
        const res = await fetch(`${BASE_URL}/${vehicleId}/service-records`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recordData),
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

// app.put('/vehicles/:vehicleId/service-records/:recordId', verifyToken, serviceCtrl.update)

export {
    create,
}