import React from 'react';
import '../SideBar/SideBar.css'
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, } from "reactstrap";
import fire from '../../../fire';
import { Link } from 'react-router-dom';

const SideBar = (props) => {
    let sideBarClass = 'SideBarContainer';

    if(props.show){
        sideBarClass = 'SideBarContainer open'
    }

    const handleLogOut = () => {
        fire.auth().signOut();
        props.Logout();
    }

    return (
        <div className={sideBarClass}>
            <ul>
                <Link to={"/home"}><li>Home</li></Link>
                <Link to={"/survey"}><li>Survey</li></Link>
                <Link to={"/profile"}><li>Profile</li></Link>
                <Link to={"/account"}><li>Account</li></Link>
                <div className="spacer" />
                <li onClick={handleLogOut} style={{marginBottom: "25px"}}><a href='/'>Logout</a></li>
            </ul>
        </div>
    );
}

export default SideBar