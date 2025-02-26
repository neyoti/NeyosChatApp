import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import { useUser } from './components/UsernameContext';

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const { setUsername, setIsAuthenticated } = useUser();  // Set Username

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        try {
            const firstnameRegex = /^[a-zA-Z]+$/; // Only alphanumeric characters
            if (!formData.firstName) newErrors.firstName = "FirstName is required.";
            else if (!firstnameRegex.test(formData.firstName)) newErrors.firstName = "Invalid first name!";

            const lastnameRegex = /^[a-zA-Z]+$/; // Only alphanumeric characters
            if (!formData.lastName) newErrors.lastName = "LastName is required.";
            else if (!lastnameRegex.test(formData.lastName)) newErrors.lastName = "Invalid last name!";

            const usernameRegex = /^[a-zA-Z0-9]+$/; // Only alphanumeric characters
            if (!formData.username) newErrors.username = "Username is required.";
            else if (!usernameRegex.test(formData.username)) newErrors.username = "Invalid username! UserName must be an alphanumeric value.";

            const passwordRegex = /^[a-zA-Z0-9]+$/;  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,10}$/;
            if (!formData.password) newErrors.password = "Password is required.";
            else if (!passwordRegex.test(formData.password)) newErrors.password = "Invalid password!\nPassword must contain at least 4 characters, 1 special character, 1 uppercase, 1 lowercase, 1 digit.";
        }
        catch (error) {
            alert("Error in validateForm");
        }
        return newErrors;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const isAuthenticated = true;

            if (isAuthenticated) {
                const formErrors = validateForm();
                console.log(Object.keys(formErrors).length);
                if (Object.keys(formErrors).length > 0) {
                    setErrors(formErrors);
                }
                else{
                    setErrors({});
                    await axios.post("https://localhost:7085/UserAuth/signup", formData, { withCredentials: true });
                    alert("User registered successfully");
                    setIsAuthenticated(isAuthenticated);
                    setUsername(formData.username);
                    navigate('/chatportal');
                }
            }
        } catch (error) {
            alert(error.response?.data.message || "An error occurred");
        }
    };

    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        The best offer <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        This is my Chit-Chat website.
                    </p>

                </MDBCol>

                <MDBCol md='6' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className='my-5 bg-glass'>
                        <MDBCardBody className='p-5'>

                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' name="firstName" label='First name' id='form1' type='text' onChange={handleChange} />
                                    {errors.firstName && <p style={{ color: "red", fontSize: "14px" }}>{errors.firstName}</p>}
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' name="lastName" label='Last name' id='form2' type='text' onChange={handleChange} />
                                    {errors.lastName && <p style={{ color: "red", fontSize: "14px" }}>{errors.lastName}</p>}
                                </MDBCol>

                            </MDBRow>

                            <MDBInput wrapperClass='mb-4' name="username" label='Username' id='form3' type='text' onChange={handleChange} />
                            {errors.username && <p style={{ color: "red", fontSize: "14px" }}>{errors.username}</p>}
                            <MDBInput wrapperClass='mb-4' name="password" label='Password' id='form4' type='password' onChange={handleChange} />
                            {errors.password && <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>}

                            <MDBBtn className='w-100 mb-4' size='md' onClick={handleSignUp} >Sign up</MDBBtn>

                            <button onClick={() => { navigate(-1) }}>Back to Dashboard</button>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>

    );
};

export default SignUp;
