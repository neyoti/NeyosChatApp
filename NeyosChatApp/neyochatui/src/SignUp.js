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
    const { setUsername, setIsAuthenticated } = useUser();  // Set Username

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const isAuthenticated = true;

            if (isAuthenticated) {
                console.log("F:", formData.firstName);
                console.log("L:", formData.lastName);

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
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' name="lastname" label='Last name' id='form2' type='text' onChange={handleChange} />
                                </MDBCol>

                            </MDBRow>

                            <MDBInput wrapperClass='mb-4' name="username" label='Username' id='form3' type='text' onChange={handleChange} />
                            <MDBInput wrapperClass='mb-4' name="password" label='Password' id='form4' type='password' onChange={handleChange} />

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
