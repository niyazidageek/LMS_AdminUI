import MainScreen from "./MainScreen/MainScreen";
import firepadRef, {db, userName} from "../../../fireBase"
import './VideoChat.css'
import React, {useEffect} from "react";
import {
    setMainStreamAction,
    addParticipantAction,
    setUserAction,
    updateParticipantAction,
    removeParticipantAction
} from "../../../actions/videoChatActions"
import { useSelector, useDispatch } from "react-redux";

function VideoChat() {
    const dispatch = useDispatch();
    const participants = useSelector(state=>state.videoChatReducer.participants)
    const mainStream = useSelector(state=>state.videoChatReducer.mainStream)
    const currentUser = useSelector(state=>state.videoChatReducer.currentUser)
    const getUserStream = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
  
      return localStream;
    };
    useEffect(async () => {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      dispatch(setMainStreamAction(stream));
  
      connectedRef.on("value", (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: true,
            video: false,
            screen: false,
          };
          const userStatusRef = participantRef.push({
            userName,
            preferences: defaultPreference,
          });
          console.log(participants);
          dispatch(setUserAction({
            [userStatusRef.key]: { name: userName, ...defaultPreference },
          },participants))
          userStatusRef.onDisconnect().remove();
        }
      });
    }, []);
  
    const connectedRef = db.database().ref(".info/connected");
    const participantRef = firepadRef.child("participants");
  
    const isUserSet = !!currentUser;
    const isStreamSet = !!mainStream;
  
    useEffect(() => {
      if (isStreamSet && isUserSet) {
        participantRef.on("child_added", (snap) => {
          const preferenceUpdateEvent = participantRef
            .child(snap.key)
            .child("preferences");
          preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
            dispatch(updateParticipantAction({
                [snap.key]: {
                  [preferenceSnap.key]: preferenceSnap.val(),
                },
              }))
          });
          const { userName: name, preferences = {} } = snap.val();
          dispatch(addParticipantAction({
            [snap.key]: {
              name,
              ...preferences,
            },
          },currentUser,mainStream))
        });
        participantRef.on("child_removed", (snap) => {
          dispatch(removeParticipantAction(snap.key))
        });
      }
    }, [isStreamSet, isUserSet]);
  
    return (
      <div className="App">
        <MainScreen />
      </div>
    );
  }

  export default VideoChat;
  