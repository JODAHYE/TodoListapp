import { put, takeLatest } from 'redux-saga/effects';
import { firebaseInstance, fireAuth } from '../firebase';
import { firestore } from "../firebase";
const GOOGLE_LOGIN = "user/GOOGLE_LOGIN";
const GOOGLE_LOGOUT = "user/GOOGLE_LOGOUT";
const LOADING = "user/LOADING";
export const googleLogin = () => {
  return {
    type: GOOGLE_LOGIN
  }
}
export const googleLogout = () => {
  return {
    type: GOOGLE_LOGOUT
  }
}

function* googleLoginSaga(action){
  try{
    yield put({type: LOADING, payload: true});
    const provider = yield new firebaseInstance.auth.GoogleAuthProvider();
    yield fireAuth.signInWithPopup(provider).then(result => {
      firestore.collection('user').doc(result.additionalUserInfo.profile.id).set({
        name: result.additionalUserInfo.profile.name,
        token: result.credential.accessToken
      });
      localStorage.setItem('access_token', result.credential.accessToken);
    });
    yield put({type: LOADING, payload: false});
  }catch(e){
    console.log(e);
  }
}
function* LogoutSaga(action){
  try{
    const userId = yield getUserId();
    yield firestore.collection('user').doc(userId).update({
        token: ''
      }).then(() => {
        console.log("Document successfully updated!");
    });
    yield fireAuth.signOut();
    yield localStorage.clear();
  }catch(e){
    console.log(e);
  }
}
export function* userSaga(){
  yield takeLatest(GOOGLE_LOGIN, googleLoginSaga);
  yield takeLatest(GOOGLE_LOGOUT, LogoutSaga);
}

export const getUserId = async () => {
  const usersnapshot = await firestore.collection("user").where("token", "==", localStorage.getItem('access_token'))
  .get();
  let userId = '';
  if (usersnapshot.empty) {
    console.log('No matching user.');
  }else{
    usersnapshot.forEach(doc=> {
      userId = doc.id;
    }); 
  } 
  return userId;
}


const initialState = {
  loading: false,
}
export default function userReducer(state=initialState, action){
  // console.log('action:', action, action.payload)
  switch(action.type){
    case GOOGLE_LOGIN: 
      return {...state}
    case GOOGLE_LOGOUT:
      return {...state}
    case LOADING:
      return {...state, loading: action.payload}
    default:
      return {state};
  }
}