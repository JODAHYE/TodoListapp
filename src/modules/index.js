import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { postSaga } from "./post";
import user, { userSaga } from './user';
import post from './post';

const rootReducer = combineReducers({user, post});
export function* rootSaga(){
  yield all([postSaga(), userSaga()]);
}
export default rootReducer;