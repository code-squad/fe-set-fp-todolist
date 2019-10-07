import React from 'react';
import styled from "styled-components";

import ThumbNews from "./ThumbNews";
import Newslist from "./NewsList";

const BodyWrapper = styled.div`
  position:absolute; 
  left: 300px;
  top: 80px;
` 

const Body = ({ logoImgUrl, newslist, thumbnews }) => {
  return (
    <BodyWrapper>
      <img src={`${logoImgUrl}`} alt={`${logoImgUrl}`}/>    
      <ThumbNews {...thumbnews} />
      <Newslist newsList={newslist}/>
    </BodyWrapper>
  );
}

export default Body;