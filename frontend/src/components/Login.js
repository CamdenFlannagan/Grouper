import React, { useState, useEffect } from 'react';
import './Login.css'; 
import googleicon from '../assets/googleicon.png';
import background from "../assets/loginbackground.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth, provider} from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 
    const [user] = useAuthState(auth); 


    useEffect(() => {
        if (user) navigate('/dashboard'); 
    }, [user, navigate]);

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("You're logged in successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSubmit = async () => {
        setError('');
        setSuccess('');

        try {
            await signInWithPopup(auth, provider); //handles register if no account and sign in
            setSuccess("You're logged in successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="Login-screen" style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="logo">
                <a href="/">GROUPER</a>
            </div>
            <div className="Login-halfone">
                <div className="Login-accounttitle">Log in to Grouper</div>
                <div className="input-container"></div>
                <div className="dontaccount">
                    <Link to="/register">Don't have an account?</Link>
                </div>
                <div className="input-container"></div>
                <div className="input-container">
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputBox"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password" //blurs password
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputBox"
                    />
                </div>
                <div className="input-container"></div>
                <button onClick={handleSubmit} className="submitBtn">Login</button>
                <div className="input-container"></div>
                <button onClick={handleGoogleSubmit} className="googBtn">
                    <img src={googleicon} alt="" className="googleicon" />
                    Login with Google
                </button>
                <div className="input-container"></div>
                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}

            </div>
            <div className="Login-halftwo" >

            </div>
        </div>
    );
};

export default Login;
