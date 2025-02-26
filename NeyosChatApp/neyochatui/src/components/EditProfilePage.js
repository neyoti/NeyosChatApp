import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useUserProfile } from './UserProfileContext';
import { useUser } from './UsernameContext';

import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CloseButton from 'react-bootstrap/CloseButton';

const EditProfilePage = () => {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const { userfirstName, userlastName, userbio, userprofilepic, setUserFirstName, setUserLastName, setUserBio, setUserProfilePic } = useUserProfile();
    const { username } = useUser();  // Get Username

    const [firstName, setFirstName] = useState(userfirstName || "");
    const [lastName, setLastName] = useState(userlastName || "");
    const [bio, setBio] = useState(userbio || "");
    const [profilepic, setProfilePic] = useState(userprofilepic || "");

    //const [selectedImage, setSelectedImage] = useState(null);

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);

        try {
            const response = await axios.post("https://localhost:7085/UserAuth/uploadProfilePic",
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            alert(response.data);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        }
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            console.log(form.checkValidity());
            return;
        }

        setValidated(true);

        const userProfile = {
            FirstName: firstName,
            LastName: lastName,
            UserName: username,
            Bio: bio
        }

        console.log("Sending User Profile:", userProfile);

        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserBio(bio);

        try {
            await axios.post("https://localhost:7085/UserAuth/updateuserprofile", userProfile, { withCredentials: true });
            alert("User profile updated successfully");
            navigate(-1);
        } catch (error) {
            console.error("Error updating profile:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "An error occurred while updating the profile.");
        }
    };

    const handleOnCloseClick = async () => {
        navigate(-1);
    }

    return (
        <Card className="text-center">
            <Card.Header>{username} : User Profile
                <CloseButton variant="Danger" style={{ marginLeft: "330px" }} onClick={() => handleOnCloseClick()} />
            </Card.Header>

            <Card.Body>

                <div>
                    {/* <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(file)}
                    /> */}
                    
                    <br/>
                    <input type="file" onChange={handleFileChange} />
                    
                    <br/>
                    <button onClick={handleUpload}>Upload</button>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom03">

                            <FloatingLabel controlId="floatingTextarea2" label="Bio">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter Bios here"
                                    style={{ height: '100px' }}
                                    type="text"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </FloatingLabel>

                        </Form.Group>
                    </Row>
                    <Button type="submit">Edit Profile</Button>
                </Form>


            </Card.Body>
            <Card.Footer className="text-muted">NeYo's Chat Website</Card.Footer>
        </Card>
    )
}

export default EditProfilePage;