import React, { useState, useEffect } from 'react';
import './Register.css';
import googleicon from '../assets/googleicon.png';
import background from "../assets/gradient.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const provider = new GoogleAuthProvider();
const db = getFirestore();

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); 
    const [user] = useAuthState(auth);

    const handleSubmit = async () => {
        if (!email || !password || !name) {
            setError('Please fill in all fields');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userProfileRef = doc(db, 'userProfiles', userCredential.user.uid);
            await setDoc(userProfileRef, {
                name: name,
                email: email,
                createdAt: new Date(),
                groupIds: []  
            }, { merge: true });

            console.log(userCredential.user);
            setEmail('');
            setName('');
            setPassword('');
            setSuccess('Registration successful! You can now log in.');
            setError('');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use.');
            } else if (error.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Failed to register. Please try again.');
            }
            setSuccess('');
        }
    };

    
    const handleGoogleSubmit = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userProfileRef = doc(db, 'userProfiles', user.uid);

            await setDoc(userProfileRef, {
                name: user.displayName || '',
                email: user.email,
                createdAt: new Date(),
                groupIds: [] 
            }, { merge: true });

            setSuccess('Registration successful! You can now log in.');
        } catch (error) {
            setError('Failed to register with Google. Please try again.');
        }
    };

    
    useEffect(() => {
        if (user) { 
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="Register-screen">
            <div className="register-logo">
                <a href="/">GROUPER</a>
            </div>
            <div className="Register-halfone">

                <div className="Register-accounttitle">Make an account</div>
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
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="inputBox"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputBox"
                    />
                </div>
                <div className="input-container"></div>
                <button onClick={handleSubmit} className="submitBtn">Sign Up</button>
                <div className="input-container"></div>
                <button onClick={handleGoogleSubmit} className="googBtn">
                    <img src={googleicon} alt = "" className="googleicon" />
                    Sign up with Google
                </button>
                <div className="input-container"></div>
                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}

            </div>
            <div className="Register-halftwo" style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="welcomeTitle">Hello, Friend!</div>
                <div className="input-container"></div>
                <div className="welcomeSubTitle">Have an account?</div>
                <div className="input-container"></div>
                <div className="loginBtn">
                    <Link to="/login">Login</Link>
                </div>
            </div>
            
        </div>
    );
};

export default Register;
