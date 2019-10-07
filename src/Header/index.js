import React, {useContext} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"; 
import styled from "styled-components";
import {NewsContext} from "../MyNews";
import useMoveButtonCallback from "../hooks/useMoveButtonCallback.js";

const HeaderWrapper = styled.div`height:45px;border-bottom: 1px solid #c5c5c5;line-height:45px;`;
const MoveButtonSet = styled.div`position: absolute; right:15px;`;
const UIButtonSet = styled.div`position: absolute; left:15px;`;
const LeftButton = styled.button`padding: 5px 15px 5px 15px; border:1px solid #c5c5c5;background:#fff;font-weight:300`;
const RightButton = styled.button`padding: 5px 15px 5px 15px; border:1px solid #c5c5c5;background:#fff;font-weight:300;border-left:0px;`;

const Header = ({groupIndex, changeListGroupIndex}) => {
  const {companyList, selectedCompany, setSelected} = useContext(NewsContext);
  const [nextCompany, prevCompany] = useMoveButtonCallback(companyList, selectedCompany);

  return (
    <HeaderWrapper>
      <UIButtonSet>
        <Link to="/">
          <LeftButton>카드</LeftButton>
        </Link>
        <Link to="/list">
          <RightButton>목록</RightButton>
        </Link>
      </UIButtonSet>
      <MoveButtonSet>
        <Router>
          <Switch>
            <Route path="/list">
              <LeftButton onClick={() => changeListGroupIndex(groupIndex - 1)}>이전</LeftButton>
              <RightButton onClick={() => changeListGroupIndex(groupIndex + 1)}>다음</RightButton>
            </Route>
            <Route path="/">
              <LeftButton onClick={() => setSelected(prevCompany())}>이전</LeftButton>
              <RightButton onClick={() => setSelected(nextCompany())}>다음</RightButton>
            </Route>
          </Switch>
        </Router>
      </MoveButtonSet>
    </HeaderWrapper>
  );
}

export default Header;