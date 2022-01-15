import './App.css';
import { useEffect, useState } from "react";
import LoginContainer from './containers/LoginContainer';
import styled from 'styled-components';
import SubmitContainer from './containers/SubmitContainer';
import ItemListContainer from './containers/ItemListContainer';
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
  margin: 170px 0;
  color: #E72A53;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
    margin: 70px 0;
  }
`;
const Content = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding-top: 100px; 
  border-top: 2px solid #4BCFA1;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 96%;
    padding-top: 30px; 
  }
`;
function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('userId')){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
  }, []);

  return (
    <Wrap>
      <Title>Todo List</Title>
      {!isLogin && <LoginContainer isLogin={isLogin} />}
      {isLogin&&(
        <>
        <LoginContainer isLogin={isLogin} />
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