import React from 'react';
import styled from 'styled-components';
import CompanyItem from "./CompanyItem";

import useSelectedCompany from "../hooks/useSelectedCompany";

const StyledList = styled.ul`
  width: 200px;
  border-right: 1px solid #c5c5c5
  list-style:none;
  margin-top: 0;
  `

const SideBar = ({ companyList, selectedCompany, setSelected}) => {
  
  const handleClick = useSelectedCompany(companyList, setSelected);

  return (
    <StyledList 
      onClick={event => handleClick(event)}
    >
      {companyList.map(({company, id}) => 
        <CompanyItem
          key={id}
          id={id}
          company={company}
          isSelected={selectedCompany.id === id}
        />
      )}
    </StyledList>
    );
}

export default SideBar;