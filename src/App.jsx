import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import VehicleForm from "./pages/VehicleForm"
import './App.css'
import Index from "./pages/Index"
import * as vehicleServices from './services/vehicles'
import VehicleDetails from "./pages/vehicleDetails"


const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}



const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const fetchAllVehicles = async () => {
      const vehiclesData = await vehicleServices.index()
      setVehicles(vehiclesData)
    }
    if (user) fetchAllVehicles()
  }, [user])

  const handleAddVehicle = async (formDate) => {
    const newVehicle = await vehicleServices.create(formDate)
    setVehicles([...vehicles, newVehicle])
    navigate('/vehicles')
  }

  const handleUpdateVehicle = async (vehicleId, formDate) => {
    const updatedVehicle = await vehicleServices.update(vehicleId, formDate)
    const updatedVehiclesList = vehicles.map((vehicle) => {
      return vehicleId === vehicle._id ? updatedVehicle : vehicle
    })
    setVehicles(updatedVehiclesList)
    navigate(`/vehicles/${vehicleId}`)
  }

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route path='/' element={user ? <Home user={user} /> : <Landing />} />
          {user ? (
            <>
              {/* Routes that only Signed in users can access */}
              <Route path='/vehicles' element={<Index vehicles={vehicles} />} />
              <Route path='/vehicles/new' element={<VehicleForm handleAddVehicle={handleAddVehicle} handleUpdateVehicle={handleUpdateVehicle} />} />
              <Route path='/vehicles/:vehicleId' element={<VehicleDetails />} />
              <Route path={`/vehicles/:vehicleId/edit`} element={<VehicleForm handleUpdateVehicle={handleUpdateVehicle}/>} />
            </>
          ) : (
            <>
              <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
              <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  )
}

export default App