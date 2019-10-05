import React, {useContext} from 'react';
import styled from "styled-components";
import useSelectedCompany from "../hooks/useSelectedCompany";
import {NewsContext} from "../MyNews";

const LogoButton = styled.img`
  padding: 5px 10px 5px 10px;
  border-bottom: ${props=>props.selected ? "2px solid #18d818" : ""}
`

const ListViewMenu = () => {
  const { companyList, selectedCompany, setSelected } = useContext(NewsContext);

  const offset = 18;
  const startIndex = parseInt(selectedCompany.index / offset) * offset;
  const splitedList = companyList.slice(startIndex, startIndex + offset);

  const handleClick = useSelectedCompany(companyList, setSelected);

  return (
    splitedList.map(({ logoImgUrl, id }) =>
      <LogoButton
        key={id}
        data-id={id}
        src={logoImgUrl}
        alt={logoImgUrl}
        selected={id === selectedCompany.id}
        onClick={event=>handleClick(event)}
      />
    )
  );
}


export default ListViewMenu;