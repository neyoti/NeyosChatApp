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

import { AnimatePresence } from "framer-motion";
import Spinner from 'react-bootstrap/Spinner';

import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div>
        <h2>Welcome to Dashboard</h2>
        <button onClick={() => navigate("/login")}>Log In</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </motion.div>
  );
};

const App = () => {
  // const { isAuthenticated } = useUser();

  const userContext = useUser();
  const isAuthenticated = userContext?.isAuthenticated ?? false;

  return (
    <Router>
      <AnimatePresence mode="wait">
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

                    <Route path="/signup" element={
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <SignUp />
                      </motion.div>
                    } />
                    <Route path="/login" element={
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Login />
                      </motion.div>
                    } />

                    <Route path="/chatportal" element={isAuthenticated ? <ChatPortal /> : <Dashboard />} />
                    <Route path="/chat" element={isAuthenticated ? <Chat /> : <Dashboard />} />
                    <Route path="/userprofile" element={isAuthenticated ? <UserProfile /> : <Dashboard />} />
                    <Route path="/edituserprofile" element={isAuthenticated ? <EditProfilePage /> : <Dashboard />} />

                  </Routes>
                </RecipientProfileProvider>
              </MessageProvider>
            </div>
          </UserProfileProvider>
        </ConnectionProvider>
      </AnimatePresence>
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
