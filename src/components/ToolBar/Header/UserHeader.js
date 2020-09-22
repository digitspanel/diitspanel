import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, } from "reactstrap";
import './UserHeader.css';
import inboxImage from './inboxImage.png';
import SideBar from '../SideBar/SideBar';
import SideBarBackCover from '../SideBarBackCover/sideBarBackCover'
import { Link } from 'react-router-dom';


const UserHeader = (props) => {

    const [sideBarState, setSideBarState] = useState({
        sideBar: false
    });

    const sideBarHandlerShow = () => {
        setSideBarState({
            sideBar: true
        });
    };

    const sideBarHandlerHide = () => {
        setSideBarState({
            sideBar: false
        });
    };

    let sideBarBackCover;

    if(sideBarState.sideBar){
        sideBarBackCover = <SideBarBackCover click={sideBarHandlerHide} />;
    }

    return (
        <div>
            <SideBar show={sideBarState.sideBar} Logout={props.Logout} />
            {sideBarBackCover}

            <header className="userheader">
                <nav className="userheader__navigation">
                    <Link to="/home"><div className="userheader__logo"><a href="/">Logo</a></div></Link>

                    <div className="userheader__sidebarButton">
                        <button onClick={sideBarHandlerShow}>
                            <div style={{height: "4px", width: "25px", backgroundColor: "black", padding: "0"}}></div>
                            <div style={{height: "3px"}} />
                            <div style={{height: "4px", width: "25px", backgroundColor: "black", padding: "0"}}></div>
                            <div style={{height: "3px"}} />
                            <div style={{height: "4px", width: "25px", backgroundColor: "black", padding: "0"}}></div>
                        </button>
                    </div>

                    <div className="spacer" />

                    <div>
                        <button onClick={props.inboxShow} className="userheader__inboxButton"><img style={{height: "22px"}} src={inboxImage} /></button>
                    </div>

                    <div className="userheader__languageDropDown">
                        <select
                            type="select"
                            class="languageDropDown"
                            name="languageDropDown"
                            defaultValue="English"
                            >
                            <option value="English"> English </option>
                            <option value="Urdu"> Urdu </option>
                        </select>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default UserHeader