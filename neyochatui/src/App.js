import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import ChatPortal from "./ChatLobby";
import Chat from './components/Chat';
import UserProfile from './components/UserProfile';
import EditProfilePage from './components/EditProfilePage';
import { ConnectionProvider } from "./components/ConnectionContext";
import { MessageProvider } from './components/MessageContext';
import { RecipientProfileProvider } from './components/RecipientProfileContext';
import { UserProfileProvider } from './components/UserProfileContext';

import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useUser } from './components/UsernameContext';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

const App = () => {
  // const { isAuthenticated } = useUser();

  const userContext = useUser();
  const isAuthenticated = userContext?.isAuthenticated ?? false;

  return (
    <Router>
      <ConnectionProvider>
      <UserProfileProvider>
        {isAuthenticated && <Sidebar />}
        <div className='banner'>
          <MessageProvider>
              <RecipientProfileProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/signup" element={<SignUp onLoginSuccess={(e) => setIsAuthenticated(e)} />} />
                <Route path="/login" element={<Login onLoginSuccess={(e) => setIsAuthenticated(e)} />} /> */}

                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />

                  <Route path="/chatportal" element={isAuthenticated ? <ChatPortal /> : <Dashboard />} />
                  <Route path="/chat" element={isAuthenticated ? <Chat /> : <Dashboard />} />
                  <Route path="/userprofile" element={isAuthenticated ? <UserProfile /> : <Dashboard />} />
                  <Route path="/updateuserprofile" element={isAuthenticated ? <EditProfilePage /> : <Dashboard />} />
                  
                </Routes>
              </RecipientProfileProvider>
          </MessageProvider>
        </div>
        </UserProfileProvider>
      </ConnectionProvider>
    </Router>
  );
};



// const App = () => {


// <div className='dashboard'>
//   <Router>
//   <ConnectionProvider>
//     <Sidebar />
//     <div className='banner'>
//       <MessageProvider>
//         <RecipientProfileProvider>
//           <Routes>
//             {/* <Route path="/signup" element={<SignUp />} />
//             <Route path="/login" element={<Login />} /> */}
//             <Route path="/chatportal" element={<ChatPortal />} />
//             <Route path="/chat" element={<Chat />} />
//           </Routes>
//         </RecipientProfileProvider>
//       </MessageProvider>
//     </div>
//     </ConnectionProvider>
//   </Router>
// </div>
//}

export default App;
