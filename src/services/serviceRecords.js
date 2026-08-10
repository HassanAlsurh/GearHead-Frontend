const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vehicles`

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