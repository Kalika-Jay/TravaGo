import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useToken from "../auth/useToken";
import axios from 'axios';

export default function SignUp(){
    const [token, setToken] = useToken();
    const [error, setError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSignUpClick = async () => {
        const response = await axios.post('/api/signup', {
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
                <h1>Sign Up</h1>
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
                <input
                    value={confirmpassword}
                    onChange={e=>setconfirmPassword(e.target.value)}
                    type='password'
                    placeholder='password'/>
                <button
                    disabled={!email||!password||password !== confirmpassword}
                    onClick={onSignUpClick}>Sign Up</button>
                <button onClick={()=>navigate('/login')}>Already have an account?</button>
            </div>
        </>
    )
}