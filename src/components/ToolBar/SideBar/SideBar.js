import React, { useState } from 'react';
import '../SideBar/SideBar.css'
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, } from "reactstrap";
import fire from '../../../fire';
import { Link } from 'react-router-dom';
import HomeIconLight from '../../../assets/SidebarIcon/Home_Icon.png'
import HomeIconDark from '../../../assets/SidebarIcon/Home_Icon_Dark.png'
import SurveyIconDark from '../../../assets/SidebarIcon/Survey_Icon_Dark.png'
import AccountIconDark from '../../../assets/SidebarIcon/Account_Icon_Dark.png'
import SignOutIconDark from '../../../assets/SidebarIcon/SignOut_Icon.png'

const SideBar = (props) => {
    let sideBarClass = 'SideBarContainer';

    const [profilePic, setProfilePic] = useState('');
    const [balanceAmount, setBalanceAmount] = useState(30);
    const [UserName, setUserName] = useState('Ananyomous');

    if(props.show){
        sideBarClass = 'SideBarContainer open'
    }

    const handleLogOut = () => {
        fire.auth().signOut();
        props.Logout();
    }

    fire.auth().onAuthStateChanged(User => {
        if (User) {
            if (User.photoURL != null) {
                setProfilePic(User.photoURL);
            }
            if(User.displayName != null){
                setUserName(User.displayName);
            }
        }
    });

    return (
        <div className={sideBarClass}>
            <div className="webspacer"></div>
            <div className="sidebarProfileInfo">
                <div className="sidebarProfilePicDiv"><img src={profilePic} style={{ height: "105px" }} /></div>
                <div className="userName"><h5>{UserName}</h5></div>
                <div className="sidebarcenterTheItems"><h6>You have {balanceAmount} points balance!</h6></div>
            </div>
            <ul>
                <Link to={"/home"}><li><img className="sidebaricon" src={HomeIconDark} />Home</li></Link>
                <Link to={"/survey"}><li><img className="sidebaricon" src={SurveyIconDark} />Survey</li></Link>
                <Link to={"/account"}><li><img className="sidebaricon" src={AccountIconDark} />Account</li></Link>
                <div className="spacer" />
                <li onClick={handleLogOut} style={{marginBottom: "25px"}}><img className="sidebaricon" src={SignOutIconDark} />Logout</li>
            </ul>
        </div>
    );
}

export default SideBar