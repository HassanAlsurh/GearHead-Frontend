import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import './App.css'

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
          {user ? (
            <>
                {/* Routes that only Signed in users can access */}
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