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

const Sidebar = ({ sidebarWidth }) => {
  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
      className='sidebar'
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ width: sidebarWidth }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            //href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/chatportal" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
              <CDBSidebarMenuItem icon="table">Chat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
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