import React from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`
padding : 2px 0px 2px;
color: ${props => props.isSelected ? "#18d818" : "#393939"}
font-size: ${props => props.isSelected ? "21px" : "17px"}
font-weight: ${props => props.isSelected ? "900" : "100"}

`

const CompanyItem = ({ id, company, isSelected }) => {
  return (
    <StyledLi data-id={id} isSelected={isSelected}>
      {company}
    </StyledLi>
  );
}

export default CompanyItem;