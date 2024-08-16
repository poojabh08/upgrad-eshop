import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        // Call your login API
        // Example:
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password })
        });
        if (response.ok) {
            // Handle successful login
            history.push('/');
        } else {
            // Handle errors
            alert('Login failed');
        }
    };

    return (
        <div>
            <TextField label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>Sign In</Button>
        </div>
    );
};

export default Login;
