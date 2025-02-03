import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useConnection } from "./components/ConnectionContext";
import { useNavigate } from 'react-router-dom';
import { useUser } from './components/UsernameContext';

const Sidebar = ({ sidebarWidth }) => {

  const { connection } = useConnection();
  const navigate = useNavigate();
  const { username, setUsername, setIsAuthenticated } = useUser();  // Set Username


  const handleChatLobbyClick = async () => {
    try {
      if (!connection)
        await connection.stop();

      if (!username) {
        alert("Could not navigate to ChatLobby");
      }
      else {
        navigate("/chatportal");
      }
    } catch (error) {
      console.error("Error closing connection:", error);
    }
  }

  const dashBoard = async () => {
    try {
      alert("Your logged in session will be closed!!!");
      setIsAuthenticated(false);
      setUsername('');
    } catch (error) {
      console.error("Error when clicked on Sidebard dashboard icon", error);
    }
  }


  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
      className='sidebar'
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ width: sidebarWidth }}>
        {/* <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}> */}
        <CDBSidebarHeader>
          {/* <a
            //href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          > */}
          Sidebar
          {/* </a> */}
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'activeClicked' : '')} onClick={() => dashBoard()}>
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/chatportal" className={({ isActive }) => (isActive ? 'activeClicked' : '')} onClick={() => handleChatLobbyClick()} >
              <CDBSidebarMenuItem icon="table">Chat Lobby</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/userprofile" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/hero404"
              target="_blank"
              className={({ isActive }) => (isActive ? 'activeClicked' : '')}
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;