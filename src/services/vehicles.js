const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vehicles`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (vehicleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${vehicleId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (vehicleFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: vehicleFormData,
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (vehicleId, vehicleFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${vehicleId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: vehicleFormData,
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteVehicle = async (vehicleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${vehicleId}`, {
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
  index,
  show,
  create,
  deleteVehicle,
  update
}