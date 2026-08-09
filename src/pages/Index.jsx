import { Link } from "react-router"
const Index = () => {

    return (
        <>
            <header>
                <h1>user's Garage</h1>
                <button><Link to="/vehicles/new">New Vehicle</Link></button>
            </header>

            <div className="vehicles-">


            </div>container

        </>
    )
}

export default Index