import React, { useState, useEffect, useRef } from 'react';
import './Inbox.css'

// let useClickOutside = (handler) => {
//     let domNode = useRef();
  
//     useEffect(() => {
//       let maybeHandler = (event) => {
//         if (!domNode.current.contains(event.target)) {
//           handler();
//         }
//       };
  
//       document.addEventListener("mousedown", maybeHandler);
  
//       return () => {
//         document.removeEventListener("mousedown", maybeHandler);
//       };
//     });
  
//     return domNode;
//   };

const Inbox = (props) =>{

    // const [inboxShow, setInboxShow] = useState({
    //     inboxShow: false
    // });

    // setInboxShow({
    //     inboxShow: props.show
    // });

    // let domNode = useClickOutside(() => {
    //     setInboxShow({
    //         inboxShow: false
    //     });
    // });

    let inboxClass = "Inbox";
    if(props.show){
        inboxClass = "Inbox open";
    }

    return(
        <div className={inboxClass}>
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>A</li>
                <li>B</li>
                <li>C</li>
            </ul>
        </div>
    );
}

export default Inbox