import React from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import styled from 'styled-components';

const GoogleBtn = styled.button`
  background: url('img/google.png') center center/cover;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: none;
  box-shadow: 2px 2px 2px 2px #C69B74;
  border-radius: 6px;
  cursor: pointer;
  &:hover{
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 2px 2px transparent;
  }
`;
const LogoutBtn = styled(RiLogoutCircleRLine)`
  font-size: 24px;
  cursor: pointer;
  &:hover{
    color: #5433F2;
  }
`;
const Login = ({onGoogleLogin, onLogout, isLogin}) => {
  
  return isLogin?<LogoutBtn onClick={onLogout}/>:<GoogleBtn onClick={onGoogleLogin}/>;
};

export default Login;