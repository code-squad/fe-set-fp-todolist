import React, {useState, createContext} from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Header/";
import SideBar from './SideBar/';
import Body from "./Body/";
import ListViewMenu from "./ListViewMenu/";
import useGroupIndex from "./hooks/useGroupIndex.js";

export const NewsContext = createContext();

const MyNews = ({companyList}) => {
  const [selectedCompany, setSelected] = useState(companyList[0]);
  const {groupIndex, changeListGroupIndex, offset} = useGroupIndex(companyList);

  return (
    <NewsContext.Provider value={{companyList, selectedCompany, setSelected}}>
      <Router>
        <Header groupIndex={groupIndex} changeListGroupIndex={changeListGroupIndex}/>
        <Switch>
          <Route path="/list">
            <ListViewMenu groupIndex={groupIndex} offset={offset}/>
          </Route>
          <Route path="/">
            <SideBar/>
          </Route>
        </Switch>
        <Body {...selectedCompany}/>
      </Router>
    </NewsContext.Provider>
  );
}


export default MyNews;