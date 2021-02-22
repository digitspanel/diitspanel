import React from 'react';
import SignOutIconDark from '../../assets/SidebarIcon/SignOut_Icon.png';
import * as Actions from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import './sidebar.css';

const SideBar = () => {

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(Actions.setAdminLogout());
    }

    return (
        <div className="adminsidebar">
            <div className="webspacer"></div>
            <ul>
                <Link to={"/admin/dashboard"}><li>Dashboard</li></Link>
                <Link to={"/admin/managesurveys"}><li>Manage Surveys</li></Link>
                <Link to={"/admin/manageaccounts"}><li>Manage Accounts</li></Link>
                <div className="spacer" />
                <li onClick={() => handleLogOut()} style={{marginBottom: "25px"}}><img className="adminsidebaricon" src={SignOutIconDark} />Logout</li>
            </ul>
        </div>
    );
}

export default SideBar