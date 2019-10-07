import React from "react";
import styled from "styled-components";

const StyledLi = styled.li`list-style:none; padding:2px 0px 2px;`
const StyledUl = styled.ul`padding-left:0px`

const NewsList = ({ newsList }) => {
  return (
    <StyledUl>
      {newsList.map((title, index) => 
        <StyledLi key={index}>{title}</StyledLi>
      )}
    </StyledUl>
  );
}

export default NewsList;