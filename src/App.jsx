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

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())

  const handleUpdateVehicle = async (vehicleId, formDate) => {
    const updatedVehicle = await vehicleServices.update(vehicleId, formDate)
    //set the state with the new data of the vehicle!
    navigate(`/vehicles/${vehicleId}`)
  }
  const handleAddVehicle = async (formDate) => {
    console.log(formDate, 'in the  handle add vehcile');
    
    const newVehicle = await vehicleServices.create(formDate)
    //set the state for the index page with the new vehicle
    navigate('/vehicles')
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
              <Route path='/vehicles' element={<Index />} />
              <Route path='/vehicles/new' element={<VehicleForm handleAddVehicle={handleAddVehicle} handleUpdateVehicle={handleUpdateVehicle} />} />
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