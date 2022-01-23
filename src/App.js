import './App.css';
import { useEffect, useState } from "react";
import LoginContainer from './containers/LoginContainer';
import styled from 'styled-components';
import SubmitContainer from './containers/SubmitContainer';
import ItemListContainer from './containers/ItemListContainer';
import { useSelector } from 'react-redux';
const Wrap = styled.div`
  min-height: 100vh;
  background: #eee;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-top: 170px;
  color: #E72A53;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
    margin: 70px 0;
  }
`;
const Line = styled.hr`
  background: #4BCFA1;
  border: 0;
  margin: 160px 120px 0;
  height: 2px;
  width: 40%;
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 40px 0;
  }

`;
const Content = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding-top: 100px; 
  @media (min-width: 320px) and (max-width: 480px) {
    width: 96%;
    padding-top: 30px; 
  }
`;
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const {loading} = useSelector(state=>state.user);
  useEffect(()=>{
    localStorage.getItem('access_token')?setIsLogin(true):setIsLogin(false);
  
  }, []);
  return (
    <Wrap>
      <Title>Todo List</Title>
      <Line />
      {!isLogin && <LoginContainer setIsLogin={setIsLogin} isLogin={isLogin}/>}
      {(isLogin&&!loading)&&(
        <>
        <LoginContainer setIsLogin={setIsLogin} isLogin={isLogin}/>
        <Content>
          <SubmitContainer />
          <ItemListContainer />
        </Content>
        </>
      )}
    </Wrap>
  );
}

export default App;