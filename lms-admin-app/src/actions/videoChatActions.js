import { addConnection, initializeListensers, updatePreference } from "../services/videoChatService"
import { actionTypes } from "./const"
import {generateColor} from "../utils/generateColor"

export const setMainStreamAction = (stream) => async(dispatch)=>{
    dispatch({
        type:actionTypes.SET_MAIN_STREAM,
        payload:{
            mainStream:stream
        }
    })
}

export const setUserAction = (user) => (dispatch) => {
    const userId = Object.keys(user)[0];
    user[userId].avatarColor = generateColor();
    initializeListensers(userId);
    dispatch({
        type:actionTypes.SET_VIDEO_USER,
        payload:{
            currentUser:user,
        }
    })
}

export const addParticipantAction = (user, currentUser, mainStream) => (dispatch) => {

    const newUserId = Object.keys(user)[0];
    const currentUserId = Object.keys(currentUser)[0];

    if (mainStream && currentUserId !== newUserId) {
          user  = addConnection(
          user,
          currentUser,
          mainStream
        );
      }

      if (currentUserId === newUserId)
        user[newUserId].currentUser = true;
        user[newUserId].avatarColor = generateColor()

    dispatch({
        type:actionTypes.ADD_VIDEO_PARTICIPANT,
        payload:{
            newUser:user
        }
    })
}

export const updateUserAction = (user) => (dispatch) =>{
    const userId = Object.keys(user)[0];
    updatePreference(userId, user)

    dispatch({
        type:actionTypes.UPDATE_VIDEO_USER,
        payload:{
            currentUser:user,
        }
    })
}

export const updateParticipantAction = (user) => (dispatch)=>{
    dispatch({
        type: actionTypes.UPDATE_VIDEO_PARTICIPANT,
        payload:{
            newUser:user,
        }
    })
}

export const removeParticipantAction = (participants,userId) =>{
    delete participants[userId]
    dispatch({
        type:actionTypes.REMOVE_VIDEO_PARTICIPANT,
        payload:{
            participants:participants
        }
    })
}