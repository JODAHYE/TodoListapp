import React from 'react';
import { useDispatch } from 'react-redux';
import Login from '../components/Login';
import { googleLogin, googleLogout } from '../modules/user';

const LoginContainer = ({isLogin}) => {
  const dispatch = useDispatch();
  const onGoogleLogin = () => {
    dispatch(googleLogin());
  }
  const onLogout = () => {
    dispatch(googleLogout());
  }
  return (
    <Login onLogout={onLogout} isLogin={isLogin} onGoogleLogin={onGoogleLogin}/>
  );
};

export default LoginContainer;