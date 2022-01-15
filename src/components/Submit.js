import React from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import styled from 'styled-components';
const Wrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Input = styled.input`
  font-size: 20px;
  width: 100%;
  border: none;
  outline: none;
`;
const SubmitBtn = styled(AiFillPlusSquare)`
  color: #F088B5;
  font-size: 50px;
  background: #fff;
  cursor: pointer;
  &:hover{
    color: #CF4B85; 
  }
`;

const Submit = ({onChangeData, onCreate, data}) => {
  return (
    <Wrap>
      <Input type="text" onChange={onChangeData} value={data} placeholder="할일 입력"/>
      <SubmitBtn onClick={onCreate} />
    </Wrap>
  );
};

export default Submit;