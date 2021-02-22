import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, } from "reactstrap";
import './UserHeader.css';
import inboxIcon from '../../../assets/InboxIcon.png';
import inboxIconBackground from '../../../assets/InboxIcon-Background.png';
import inboxIconBackgroundOne from '../../../assets/InboxIcon-Background-One.png';
import SideBar from '../SideBar/SideBar';
import SideBarBackCover from '../SideBarBackCover/sideBarBackCover';
import * as InboxActions from '../../../store/actions/inboxAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Inbox from '../../../components/Inbox/Inbox';


const UserHeader = (props) => {

    const [sideBarState, setSideBarState] = useState({
        sideBar: false
    });

    const [showInbox, setInboxShow] = useState(false);

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
            <Inbox show={showInbox} />
            <header className="userheader">
                <nav className="userheader__navigation">
                    <Link to="/home"><div className="userheader__logo">Logo</div></Link>

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
                        <div onClick={() => setInboxShow(!showInbox)} className="userheader_inboxButton">
                            {props.unseenCount == 0 ? null : <div className="messageBullet" />}
                            {props.inboxShow 
                            ? 
                                <img className="inboxIcon" src={inboxIconBackgroundOne} />
                            : 
                                <img className="inboxIcon" src={inboxIcon} />}
                        </div>
                    </div>

                    <div className="userheader__languageDropDown">
                        <select
                            type="select"
                            className="languageDropDown"
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

const mapStateToProps = (state) => {
    return {
        unseenCount: state.inbox.unseenCount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserHeader)