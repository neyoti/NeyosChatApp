import { useUserProfile } from './UserProfileContext';
import { useUser } from './UsernameContext';

const UserProfile = () => {

    const { userfirstName, userlastName, userbio, setUserFirstName, setUserLastName, setUserBio } = useUserProfile();
    const { username, setUsername, setIsAuthenticated } = useUser();  // Get Username

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
                        <button className="btn1 btn-dark">Edit Profile</button>
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