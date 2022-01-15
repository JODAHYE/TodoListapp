import React from 'react';
import { AiOutlineCheckSquare, AiFillCheckSquare} from 'react-icons/ai';
import {RiDeleteBack2Line} from 'react-icons/ri';
import styled from 'styled-components';
const Wrap = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  background: #fff;
  display: flex;
`;
const CheckFalse = styled(AiOutlineCheckSquare)`
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
`;
const CheckTrue = styled(AiFillCheckSquare)`
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
`;
const Text = styled.p`
  font-size: 18px;
  text-decoration: ${props=>props.isChecked?'line-through':'none'};
  text-decoration-color: #FF62B4;
  text-decoration-thickness: 3px;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 16px;
  }
`;
const DeleteBtn = styled(RiDeleteBack2Line)`
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  color: #FF62B4;
`;
const Item = ({onCheck, v, onDelete}) => {
  return (
    <Wrap>
    {v.check?<CheckTrue onClick={onCheck} />:<CheckFalse onClick={onCheck} />}
    <Text isChecked={v.check} >{v.content}</Text>
    {v.check&&<DeleteBtn onClick={onDelete} />}
    </Wrap>
  );
};

export default Item;