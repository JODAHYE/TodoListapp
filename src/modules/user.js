import { takeLatest } from 'redux-saga/effects';
import { firebaseInstance, fireAuth } from '../firebase';
const GOOGLE_LOGIN = "user/GOOGLE_LOGIN";
const GOOGLE_LOGOUT = "user/GOOGLE_LOGOUT";
export const googleLogin = () => {
  return {
    type: GOOGLE_LOGIN
  }
}
export const googleLogout = () => {
  fireAuth.signOut();
  localStorage.clear();
  window.location.reload('/');
  return {
    type: GOOGLE_LOGOUT
  }
}
function* googleLoginSaga(action){
  try{
    const provider = yield new firebaseInstance.auth.GoogleAuthProvider();
    yield fireAuth.signInWithPopup(provider).then(result => {
      localStorage.setItem('userId', result.additionalUserInfo.profile.id);
    });
    yield window.location.reload('/');
  }catch(e){
    console.log(e);
  }
}

export function* userSaga(){
  yield takeLatest(GOOGLE_LOGIN, googleLoginSaga);
}
const initialState = {
}
export default function userReducer(state=initialState, action){
  // console.log('action:', action, action.payload)
  switch(action.type){
    case GOOGLE_LOGOUT:
      return {...state}
    default:
      return {state};
  }
}