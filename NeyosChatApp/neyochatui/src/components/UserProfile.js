import { useUserProfile } from './UserProfileContext';
import { useUser } from './UsernameContext';
import { useConnection } from "./ConnectionContext";

import { useNavigate } from 'react-router-dom';
import ProfileImageDisplay from './ProfileImageDisplay';

const UserProfile = () => {
    const navigate = useNavigate();

    const { connection, setConnection } = useConnection();
    const { userfirstName, userlastName, userbio } = useUserProfile();
    const { username } = useUser();  // Get Username



    const handlerEditProfile = () => {
        try {

            console.log("In handlerEditProfile");

            navigate("/edituserprofile");

        }
        catch (ex) {
            console.log("Exception in handlerEditProfile:", ex)
        }
    }

    console.log("Connection:", connection);

    return <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">

                < ProfileImageDisplay username={username} />

                <span className="name mt-3">{userfirstName} {userlastName}</span>
                <span className="idd">@{username}</span>
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
}

export default UserProfile;