import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useUser } from './components/UsernameContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { setUsername, setIsAuthenticated } = useUser();  // Set Username

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isAuthenticated = true;

            if (isAuthenticated) {
                const response = await axios.post("https://localhost:7085/UserAuth/login", formData);
                localStorage.setItem("token", response.data.token);
                alert("Welcome " + formData.username);
                //onLoginSuccess(isAuthenticated);
                setIsAuthenticated(isAuthenticated);
                setUsername(formData.username);
                navigate('/chatportal');
            }
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="UserName" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => { navigate(-1) }}>Back to Dashboard</button>
        </div>
    );
};

export default Login;
