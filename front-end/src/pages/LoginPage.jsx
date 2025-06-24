import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken.jsx";
import '../styles/signup.css'

export default function loginPage(){
    const [token, setToken] = useToken();
    const [error, setError] = useState('');
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLoginClick = async () => {
        const response = await axios.post('/api/login', {
            username: username,
        password: password,
        })
        const {token} = response.data;
        setToken(token);
        navigate('/');
    }
    return (
        <>
            <div className="login_container">
                <h1>Login</h1>
                {error && <div className="error">{error}</div>}
                <input
                    value={username}
                    onChange={e=>setusername(e.target.value)}
                    placeholder='Username'/>
                <input
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    type='password'
                    placeholder='Password'/>
                <button
                    disabled={!username||!password}
                    onClick={onLoginClick}>Login</button>
                <button onClick={()=>navigate('/forgotpw')}>Forgot your password?</button>
                <button onClick={()=>navigate('/signup')}>Don't have an account?</button>
                <button onClick={()=>navigate('/')}>Continue as Guest</button>
            </div>
        </>
    )
}