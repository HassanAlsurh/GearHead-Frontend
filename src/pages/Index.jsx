import { Link, Links } from "react-router"
const Index = ({ vehicles }) => {

    return (
        <main>
            <header>
                <h1>user's Garage</h1>
                <button><Link to="/vehicles/new">New Vehicle</Link></button>
            </header>

            <div className="vehicles-container">

                {
                    vehicles.map((vehicle) => (
                        <Link key={vehicle._id} to={`/vehicles/${vehicle._id}`}>
                            <h3>{vehicle.make} {vehicle.model}</h3>
                        </Link>
                    ))
                }

            </div>

        </main>
    )
}

export default Index