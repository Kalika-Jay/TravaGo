import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken.jsx";

export default function loginPage(){
    const [token, setToken] = useToken();
    const [error, setError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLoginClick = async () => {
        const response = await axios.post('/api/login', {
            email: email,
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
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder='email'/>
                <input
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    type='password'
                    placeholder='password'/>
                <button
                    disabled={!email||!password}
                    onClick={onLoginClick}>Login</button>
                <button onClick={()=>navigate('/forgotpw')}>Forgot your password?</button>
                <button onClick={()=>navigate('/signup')}>Don't have an account?</button>
            </div>
        </>
    )
}