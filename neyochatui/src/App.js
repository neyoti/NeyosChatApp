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

const App = () => {

  return <div className='dashboard'>
    <Router>
      <Sidebar />
      <div className='banner'>
      <ConnectionProvider>
        <MessageProvider>
          <RecipientProfileProvider>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chatportal" element={<ChatPortal />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </RecipientProfileProvider>
        </MessageProvider>
      </ConnectionProvider>
      </div>



      {/* <div className='banner'>
      <Router>
        <ConnectionProvider>
          <MessageProvider>
            <RecipientProfileProvider>
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chatportal" element={<ChatPortal />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </RecipientProfileProvider>
          </MessageProvider>
        </ConnectionProvider>
      </Router>
    </div> */}
    </Router>
  </div>
}

export default App;
