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

async function update(vehicleId, recordId, recordData) {
    try {
        const res = await fetch(`${BASE_URL}/${vehicleId}/service-records/${recordId}`, {
            method: 'PUT',
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

// app.delete('/vehicles/:vehicleId/service-records/:recordId', verifyToken, serviceCtrl.deleteRecord)

const deleteRecord = async (vehicleId, recordId) => {
    try {
        const res = await fetch(`${BASE_URL}/${vehicleId}/service-records/${recordId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export {
    create,
    update,
    deleteRecord,
}