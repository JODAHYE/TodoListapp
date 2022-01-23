import styled from "styled-components";
import Skeleton from '@material-ui/lab/Skeleton';
const LoaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  flex-direction: column;
`;
const Loading = () => {
  return (
    <LoaderWrap>
      <Skeleton animation="wave" width={'90%'} height={30} />
      <Skeleton animation="wave" width={'80%'} height={30} />
      <Skeleton animation="wave" width={'100%'} height={25} />
    </LoaderWrap>
  );
};

export default Loading;