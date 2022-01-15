import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Submit from '../components/Submit';
import { createItem } from '../modules/post';
import moment from 'moment';
const SubmitContainer = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const onCreate = () => {
    const today = moment().format('YYYYMMDDhhmmss');
    const body = {
      content: data,
      date: parseInt(today),
      userId: localStorage.getItem('userId'),
      check: false
    }
    dispatch(createItem(body));
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