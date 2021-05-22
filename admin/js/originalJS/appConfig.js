//firebase app reference
const firebaseConfig = 
{
    apiKey: "AIzaSyA8h4KJjOKAiJQFHNlf64_j7_iMDyLqzls",
    authDomain: "e-sail-web-christuniversity.firebaseapp.com",
    databaseURL: "https://e-sail-web-christuniversity.firebaseio.com",
    projectId: "e-sail-web-christuniversity",
    storageBucket: "e-sail-web-christuniversity.appspot.com",
    messagingSenderId: "504997210822",
    appId: "1:504997210822:web:53d2463527eea446"
  }
  //initializing firebase app
  firebase.initializeApp(firebaseConfig);

//local references to firebase services 
const auth=firebase.auth();
const db=firebase.firestore();
const storage =firebase.storage(); 
let authKey = window.btoa("E-sail_authorize");
