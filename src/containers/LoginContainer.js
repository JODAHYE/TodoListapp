import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/Login';
import { googleLogin, googleLogout } from '../modules/user';

const LoginContainer = ({isLogin, setIsLogin}) => {
  const dispatch = useDispatch();
  
  const onGoogleLogin = () => {
    dispatch(googleLogin());
    setIsLogin(true);
  }
  const onLogout = () => {
    dispatch(googleLogout());
    setIsLogin(false);
  }
  return (
    <Login onLogout={onLogout} isLogin={isLogin} onGoogleLogin={onGoogleLogin}/>
  );
};

export default LoginContainer;