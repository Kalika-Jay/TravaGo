import {Link} from 'react-router-dom'
import './styles/Navbar.css'
import useUser from "./auth/useUser.jsx";

export default function NavBar(){
    const user = useUser();
    return (
        <>
            <div className="navbar-container">
                <Link to="/">
                <div ><img className="logo" alt='logo' src='src/assets/logo.png'></img> </div>
                    </Link>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/discovery'>Trips</Link></li>
                        <li><Link to='/map'>Map</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/feedback'>Feedback</Link></li>
                    </ul>
                </nav>
                {user&&
                <div className="pp" >
                    <Link to='/userprofile'>
                    <img className="profile_pic" src="src/assets/user.png" alt="user" />
                    </Link>
                </div>
                }
            </div>

        </>
    )
}