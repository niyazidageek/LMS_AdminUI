import { actionTypes } from "../actions/const";

const initialState = {
  mainStream: null,
  participants: {},
  currentUser: null,
};

const videoChatReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.SET_MAIN_STREAM:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.ADD_VIDEO_PARTICIPANT:
            return{
                ...state,
               participants:{
                ...state.participants, ...action.payload.newUser
               }
            }
        case actionTypes.SET_VIDEO_USER:
            return{
                ...state,
                currentUser:{
                    ...action.payload.currentUser
                },
                participants:{
                    ...state.participants
                }
            }
        case actionTypes.UPDATE_VIDEO_USER:
            state.currentUser[Object.keys(action.payload.currentUser)[0]] = {
                ...state.currentUser[Object.keys(action.payload.currentUser)[0]],
                ...action.payload.currentUser,
              };
            return{
                ...state,
                currentUser:{...state.currentUser}
            }
        case actionTypes.REMOVE_VIDEO_PARTICIPANT:
            return{
                ...state,
                participants:action.payload.participants
            }
        case actionTypes.UPDATE_VIDEO_PARTICIPANT:
            const newUserId = Object.keys(action.payload.newUser)[0];
            action.payload.newUser[newUserId] = {
                ...state.participants[newUserId],
                ...action.payload.newUser[newUserId],
              };
            return{
                ...state,
                participants:{
                    ...state.participants,
                    ...action.payload.newUser
                }
            }
        default:
            return state;
    }
}

export default videoChatReducer;
