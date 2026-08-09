import { Link } from "react-router"

const Landing = () => {
    return (
        <section className="card">
            <h1>Welcome!</h1>
            <p>Sign up or sign in to access your garage!</p>

            <div>
                <button>
                    <Link to='/sign-up'>Sign Up</Link>
                </button>
                <button>
                    <Link to='/sign-in'>Sign In</Link>
                </button>
            </div>
        </section>
    )
}

export default Landing