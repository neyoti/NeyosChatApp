import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import ChatPortal from "./ChatLobby";
import Chat from './components/Chat';
import { ConnectionProvider } from "./components/ConnectionContext";
import { MessageProvider } from './components/MessageContext';
import { RecipientProfileProvider } from './components/RecipientProfileContext';

import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import { UserNameProvider } from './components/UsernameContext';
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
  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isAuthenticated } = useUser();  // Set Username

  return (
    <Router>
      <ConnectionProvider>
        <UserNameProvider>
        {isAuthenticated && <Sidebar />}
        <div className='banner'>
          <MessageProvider>
            <RecipientProfileProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/signup" element={<SignUp onLoginSuccess={(e) => setIsAuthenticated(e)} />} />
                <Route path="/login" element={<Login onLoginSuccess={(e) => setIsAuthenticated(e)} />} /> */}

                <Route path="/signup" />
                <Route path="/login" />

                <Route path="/chatportal" element={isAuthenticated ? <ChatPortal /> : <Dashboard />} />
                <Route path="/chat" element={isAuthenticated ? <Chat /> : <Dashboard />} />
              </Routes>
            </RecipientProfileProvider>
          </MessageProvider>
        </div>
        </UserNameProvider>
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
