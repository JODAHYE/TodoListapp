import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Submit from '../components/Submit';
import { createItem } from '../modules/post';
import moment from 'moment';
import { getUserId } from '../modules/user';
const SubmitContainer = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const onCreate = () => {
    const today = moment().format('YYYYMMDDhhmmss');
    const body = {
      content: data,
      date: parseInt(today),
      check: false
    }  
    getUserId().then(res=>{
      body.userId = res;
      dispatch(createItem(body));
    })
    setData('');
  }
  const onChangeData = (e) => {
    setData(e.target.value);
  }
  return (
    <Submit onChangeData={onChangeData} onCreate={onCreate} data={data} />
  );
};

export default SubmitContainer;