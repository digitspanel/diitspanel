import React from 'react';
import './sideBarBackCover.css'

const sideBarBackCover = (props) => {
    return (
        <div onClick={props.click} className="sideBarBackCover" />
    );
}

export default sideBarBackCover