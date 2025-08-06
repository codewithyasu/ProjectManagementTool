
//Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBCMOx_kxFd8tshsKBkmgn5jpXIRWFv7hA",
  authDomain: "projectmanagementtool-736a2.firebaseapp.com",
  projectId: "projectmanagementtool-736a2",
  storageBucket: "projectmanagementtool-736a2.firebasestorage.app",
  messagingSenderId: "67645761377",
  appId: "1:67645761377:web:a7ce62a36ad9087afa8720",
  measurementId: "G-MB0GKPYDLK"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


