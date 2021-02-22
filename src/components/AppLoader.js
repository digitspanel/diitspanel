import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';

const AppLoader = () => {

    const appLoadingStatus = useSelector(({ app }) => app.appLoadingStatus);

    return <>
        {appLoadingStatus ? <div style={{
            height: "100vh", 
            width: "100%", 
            position: "absolute", 
            zIndex: "1100",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}> 
            <Spinner />
        </div> : null}
    </>
}

export default AppLoader;