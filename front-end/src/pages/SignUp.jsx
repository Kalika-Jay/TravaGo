import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../auth/useToken";
import axios from 'axios';
import '../styles/signup.css'

export default function SignUp(){
    const [token, setToken] = useToken();
    const [error, setError] = useState('');
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSignUpClick = async () => {
        const response = await axios.post('/api/signup', {
            username: username,
            password: password,
        })
        const {token} = response.data;
        setToken(token);
        navigate('/form');
    }
    return (
        <>
            <div className="login_container">
                <h1>Sign Up</h1>
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
                <input
                    value={confirmpassword}
                    onChange={e=>setconfirmPassword(e.target.value)}
                    type='password'
                    placeholder='Confirm password'/>
                <button
                    disabled={!username||!password||password !== confirmpassword}
                    onClick={onSignUpClick}>Sign Up</button>
                <button onClick={()=>navigate('/login')}>Already have an account?</button>
            </div>
        </>
    )
}