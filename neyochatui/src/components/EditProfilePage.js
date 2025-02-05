import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useUserProfile } from './UserProfileContext';
import { useUser } from './UsernameContext';

import { useNavigate } from 'react-router-dom';
import axios from "axios";

const EditProfilePage = () => {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const { userfirstName, userlastName, userbio, setUserFirstName, setUserLastName, setUserBio } = useUserProfile();
    const { username, setUsername, setIsAuthenticated } = useUser();  // Get Username

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);
        setUserFirstName(form.userfirstName);
        setUserLastName(form.userlastName);
        setUserBio(form.userbio);

        const userProfile = {
            FirstName : form.userfirstName,
            LastName : form.userlastName,
            UserName : form.username,
            Bio : form.userbio
        }

        try {
            await axios.post("https://localhost:7085/UserAuth/updateuserprofile", userProfile, { withCredentials: true });
            alert("User profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "An error occurred while updating the profile.");
        }        
        //navigate(-1);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        defaultValue={userfirstName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        defaultValue={userlastName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                defaultValue={username}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group> */}
                <Form.Group as={Col} md="4">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={username}
                        aria-label=""
                        readOnly
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="text" placeholder={userbio} required />
                    {/* <Form.Control.Feedback type="invalid">
                            Please provide a valid Bio.
                        </Form.Control.Feedback> */}
                </Form.Group>
                {/* <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" placeholder="Zip" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                    </Form.Group> */}
            </Row>
            {/* <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group> */}
            <Button type="submit">Edit Profile</Button>
        </Form>
    )
}

export default EditProfilePage;