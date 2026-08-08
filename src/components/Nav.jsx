import { Link } from "react-router"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="nav-brand" to="/">GearHead</Link>
            { props.user ? (
                // for signed in users
                <ul>
                    <li>Welcome, {props.user.username}!</li>

                    <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
                </ul>
            ) : (
                // for non signed in users
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/sign-up'>Sign Up</Link></li>
                <li><Link to='/sign-in'>Sign In</Link></li>
            </ul>
            ) }
        </nav>
    )
}

export default Nav