import { firestore } from "../firebase";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import { getUserId } from "./user";
const CREATE = "post/CREATE";
const CREATE_SUCCESS = "post/CREATE_SUCCESS";
const CREATE_FAILURE = "post/CREATE_FAILURE";
const DELETE = "post/DELETE";
const GET = "post/GET";
const GET_SUCCESS = "post/GET_SUCCESS";
const GET_FAILURE = "post/GET_FAILURE";
const LOADING = "post/LOADING";
const CHECK = "post/CHECK";
export const getItems = (idx) => {
  return {
    type: GET,
    payload: idx
  }
}
export const createItem = (data) => {
  return {
    type: CREATE,
    payload: data
  }
}
export const checkItem = (data) => {
  return {
    type: CHECK,
    payload: data
  }
}
export const deleteItem = (postId) =>{
  return {
    type: DELETE,
    payload: postId
  }
}

function* checkItemSaga(action){
  try{
    yield firestore.collection('todo').doc(action.payload.postId).update({check: !action.payload.check});
    yield put({type: GET})
  }catch(e){
    console.log(e);
  }
}

function* deleteItemSaga(action){
  try{
    if(window.confirm('정말 삭제하시겠습니까?')){
      yield firestore.collection('todo').doc(action.payload).delete();
      yield put({type: GET});   
    };
  }catch(e){
    console.log(e);
  }
}
function* createItemSaga(action){
  try{
    yield firestore.collection('todo').add(action.payload);
    yield put({type: GET});
    yield put({
      type: CREATE_SUCCESS
    })
  }catch(e){
    console.log(e);
    yield put({
      type: CREATE_FAILURE 
    })
  }
}


function* getItemsSaga(action){
  try{
    yield put({type: LOADING, payload: true});
    const userId = yield getUserId(); 
    const todosRef = yield firestore.collection('todo');    
    const snapshot = yield todosRef.where('userId', '==', userId).orderBy('date').limit(action.payload).get();
    const datas = [];
    if (snapshot.empty) {
      console.log('No matching posts.');
      yield put({
        type: GET_SUCCESS,
        payload: {}
      })
    }else{
      yield snapshot.forEach(doc=> {;
        const value = doc.data();
        value.postId = doc.id;
        datas.push(value);
      });  
      yield put({
        type: GET_SUCCESS,
        payload: datas
      })
    }  
  }catch(e){
    console.log(e);
    yield put({
      type: GET_FAILURE,
      payload: e
    })
  }
  yield put({type: LOADING, payload: false});
}

export function* postSaga(){
  yield takeLatest(GET, getItemsSaga);
  yield takeLatest(CREATE, createItemSaga);
  yield takeLatest(DELETE, deleteItemSaga);
  yield takeEvery(CHECK, checkItemSaga);
}
const initialState = {
  post: {},
  posts: {},
  loading: false,
  size: 0
}

export default function postReducer(state=initialState, action){
  switch(action.type){
    case CREATE:
      return {...state, }
    case DELETE:
      return {...state, }
    case GET_SUCCESS:
      return {...state, posts: action.payload}
    case LOADING:
      return {...state, loading: action.payload}
    default:
      return state
  }
}