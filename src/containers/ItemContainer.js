import React from 'react';
import { useDispatch } from 'react-redux';
import Item from '../components/Item';
import { checkItem, deleteItem } from '../modules/post';

const ItemContainer = ({v}) => {
  const dispatch = useDispatch(); 
  const onCheck = () => {
    dispatch(checkItem(v));
  }
  const onDelete = () => {
    dispatch(deleteItem(v.postId));
  }
  return (  
    <Item onCheck={onCheck} v={v} onDelete={onDelete} />
  );
};

export default ItemContainer;