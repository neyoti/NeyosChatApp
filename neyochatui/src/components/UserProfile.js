import { useUserProfile } from './UserProfileContext';
import { useUser } from './UsernameContext';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const { userfirstName, userlastName, userbio, setUserFirstName, setUserLastName, setUserBio } = useUserProfile();
    const { username, setUsername, setIsAuthenticated } = useUser();  // Get Username

    const handlerEditProfile = () => {
        try {

            console.log("In handlerEditProfile");

            navigate("/edituserprofile");

            // <Form noValidate validated={validated} onSubmit={handleSubmit}>
            //     <Row className="mb-3">
            //         <Form.Group as={Col} md="4" controlId="validationCustom01">
            //             <Form.Label>First name</Form.Label>
            //             <Form.Control
            //                 required
            //                 type="text"
            //                 placeholder="First name"
            //                 defaultValue="Mark"
            //             />
            //             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            //         </Form.Group>
            //         <Form.Group as={Col} md="4" controlId="validationCustom02">
            //             <Form.Label>Last name</Form.Label>
            //             <Form.Control
            //                 required
            //                 type="text"
            //                 placeholder="Last name"
            //                 defaultValue="Otto"
            //             />
            //             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            //         </Form.Group>
            //         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            //             <Form.Label>Username</Form.Label>
            //             <InputGroup hasValidation>
            //                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            //                 <Form.Control
            //                     type="text"
            //                     placeholder="Username"
            //                     aria-describedby="inputGroupPrepend"
            //                     required
            //                 />
            //                 <Form.Control.Feedback type="invalid">
            //                     Please choose a username.
            //                 </Form.Control.Feedback>
            //             </InputGroup>
            //         </Form.Group>
            //     </Row>
            //     <Row className="mb-3">
            //         <Form.Group as={Col} md="6" controlId="validationCustom03">
            //             <Form.Label>City</Form.Label>
            //             <Form.Control type="text" placeholder="City" required />
            //             <Form.Control.Feedback type="invalid">
            //                 Please provide a valid city.
            //             </Form.Control.Feedback>
            //         </Form.Group>
            //         <Form.Group as={Col} md="3" controlId="validationCustom04">
            //             <Form.Label>State</Form.Label>
            //             <Form.Control type="text" placeholder="State" required />
            //             <Form.Control.Feedback type="invalid">
            //                 Please provide a valid state.
            //             </Form.Control.Feedback>
            //         </Form.Group>
            //         <Form.Group as={Col} md="3" controlId="validationCustom05">
            //             <Form.Label>Zip</Form.Label>
            //             <Form.Control type="text" placeholder="Zip" required />
            //             <Form.Control.Feedback type="invalid">
            //                 Please provide a valid zip.
            //             </Form.Control.Feedback>
            //         </Form.Group>
            //     </Row>
            //     <Form.Group className="mb-3">
            //         <Form.Check
            //             required
            //             label="Agree to terms and conditions"
            //             feedback="You must agree before submitting."
            //             feedbackType="invalid"
            //         />
            //     </Form.Group>
            //     <Button type="submit">Submit form</Button>
            // </Form>

        }
        catch (ex) {
            console.log("Exception in handlerEditProfile:", ex)
        }
    }
    console.log("F:",userfirstName, userlastName, userbio);

    return <div>
        Hello User
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div className=" image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary">
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                    </button> <span className="name mt-3">{userfirstName} {userlastName}</span>
                    <span className="idd">@{username}</span>
                    {/* <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span className="idd1">Oxc4c16a645_b21a</span>
                        <span><i className="fa fa-copy"></i></span>
                    </div> */}
                    {/* <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span class="number">
                            1069
                            <span class="follow">
                                Followers
                            </span>
                        </span>
                    </div> */}
                    <div className=" d-flex mt-2">
                        <button className="btn1 btn-dark" onClick={() => handlerEditProfile()}>Edit Profile</button>
                    </div>
                    <div className="text mt-3">
                        <span>
                            {userbio}
                        </span>
                    </div>
                    <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                        <span><i className="fa fa-twitter"></i></span>
                        <span><i className="fa fa-facebook-f"></i></span>
                        <span><i className="fa fa-instagram"></i></span>
                        <span><i className="fa fa-linkedin"></i></span>
                    </div>
                    <div className=" px-2 rounded mt-4 ">
                        <span className="join">NeYo's Chat App</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default UserProfile;