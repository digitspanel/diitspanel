import React from 'react';

const sideBarBackCover = (props) => {
    return (
        <div onClick={props.click} style={{top: 0, left: 0, height: "100vh", width: "100%", backgroundColor: "rgba(0,0,0,0.3)", zIndex: "1001", position: "fixed"}} />
    );
}

export default sideBarBackCover