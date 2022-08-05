import firebase from "firebase/compat/app";
import database from "firebase/compat/database";


const firebaseConfig = {
  apiKey: "AIzaSyBO_O5ACfLmsX1vbnh0-ENpDVkHpwOuVRo",
  databaseUrl: "https://lms-admin-video-chat-default-rtdb.firebaseio.com/",
  projectId: "lms-admin-video-chat",
};

firebase.initializeApp(firebaseConfig);

let dbRef = firebase.database().ref();

export const db = firebase;

export let connectedRef = firebase.database().ref(".info/connected");

// export const userName = prompt("Enter your name");

const urlParameters = new URLSearchParams(window.location.search);

const roomId = urlParameters.get("id");


// if (roomId) {
//   dbRef = dbRef.child(roomId);
// } else {
//   dbRef = dbRef.push();
//   window.history.replaceState(null, "Meet", "?id=" + dbRef.key);
// }

export default dbRef;
