import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import { useUser } from './components/UsernameContext';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const { setUsername, setIsAuthenticated } = useUser();  // Set Username

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isAuthenticated = true;

            if (isAuthenticated) {
                await axios.post("https://localhost:7085/UserAuth/signup", formData, { withCredentials: true });
                alert("User registered successfully");
                setIsAuthenticated(isAuthenticated);
                setUsername(formData.username);
                navigate('/chatportal');
            }
        } catch (error) {
            alert(error.response?.data.message || "An error occurred");
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input name="firstName" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input name="username" placeholder="UserName" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
        <button onClick={() => {navigate(-1)} }>Back to Dashboard</button>
        </div>
    );
};

export default SignUp;
