import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAOTpaUI8v_V6dDSaGuYTdNzxRPXCJ0Eds",
    authDomain: "digits-panel.firebaseapp.com",
    databaseURL: "https://digits-panel.firebaseio.com",
    projectId: "digits-panel",
    storageBucket: "digits-panel.appspot.com",
    messagingSenderId: "525118879054",
    appId: "1:525118879054:web:ad64c9bcd4b25f9c18da1f",
    measurementId: "G-X5DC9LQ8RG"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire