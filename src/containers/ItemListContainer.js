import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { getItems } from '../modules/post';
import ItemContainer from './ItemContainer';
import { firestore } from "../firebase";
const Target = styled.div`
  width: 100%;
  height: 150px;
`;
const ItemListContainer = () => {
  const {posts} = useSelector(state=>state.post);
  const [addLoading, setAddLoading] = useState(false);
  const dispatch = useDispatch();
  let idx= 6;
  let scroll = true;
  const target = useRef(null);

  useEffect(()=>{
    dispatch(getItems(idx));
    setAddLoading(false);
  },[]);

  useEffect(()=>{
    const observer = new IntersectionObserver(callback, {
      threshold: 0.5,  
    });
    observer.observe(target.current); 
    return () => {observer && observer.disconnect()};  
  },[]);

  const getData = async() =>{
    if(scroll){
      setAddLoading(true);
      idx++;  
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(getItems(idx)); 
      await new Promise((resolve) => setTimeout(resolve, 300));
      const snapshot = firestore.collection('todo').where('userId', '==', localStorage.getItem('userId')).get();
      snapshot.then(res=>{
        if(res.size<=idx) scroll = false;
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      setAddLoading(false); 
    }
  }
  const callback = async([entry], observer)=>{
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getData();
      observer.observe(entry.target);
    }
  }

  return (
    <div>
      {(posts.length>0) && posts.map(v=>{
        return <ItemContainer key={v.postId} v={v} />
      })}      
      <Target ref={target}>{addLoading && <Loading />}</Target>
    </div>
  );
};

export default ItemListContainer;