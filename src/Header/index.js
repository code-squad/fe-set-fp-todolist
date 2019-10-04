import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`height:45px;border-bottom: 1px solid #c5c5c5;line-height:45px;`;
const MoveButtonSet = styled.div`position: absolute; right:15px;`;
const UIButtonSet = styled.div`position: absolute; left:15px;`;
const LeftButton = styled.button`padding: 5px 15px 5px 15px; border:1px solid #c5c5c5;background:#fff;font-weight:300`;
const RightButton = styled.button`padding: 5px 15px 5px 15px; border:1px solid #c5c5c5;background:#fff;font-weight:300;border-left:0px;`;

const Header = ({companyList, selectedCompany, setSelected}) => {

  const [nextCompany, prevCompany] = getMoveButtonCallback(companyList, selectedCompany);

  return (
    <HeaderWrapper>
      <UIButtonSet>
        <LeftButton>카드</LeftButton>
        <RightButton>목록</RightButton>
      </UIButtonSet>
      <MoveButtonSet>
        <LeftButton onClick={() => setSelected(prevCompany())}>이전</LeftButton>
        <RightButton onClick={() => setSelected(nextCompany())}>다음</RightButton>
      </MoveButtonSet>
    </HeaderWrapper>
  );
}

const getMoveButtonCallback = (companyList, selectedCompany) => {

  const currentIndex = selectedCompany.index;
  const lastIndex = selectedCompany.length -1;

  const nextCompany = () => {
    return currentIndex !== lastIndex ? companyList[currentIndex + 1] : selectedCompany;
  }
  
  const prevCompany = () => {
    return currentIndex === 0 ? selectedCompany : companyList[currentIndex - 1];
  }

  return [nextCompany, prevCompany];
}



export default Header;