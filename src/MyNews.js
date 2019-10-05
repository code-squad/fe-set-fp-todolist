import React, {useState, createContext} from "react";
import Header from "./Header/";
import SideBar from './SideBar/';
import Body from "./Body/";
import ListViewMenu from "./ListViewMenu/";

export const NewsContext = createContext();

const MyNews = ({companyList}) => {
  const [selectedCompany, setSelected] = useState(companyList[0]);

  return (
    <NewsContext.Provider value={{companyList, selectedCompany, setSelected}}>
      <Header/>
      <ListViewMenu/>
      <SideBar/>
      <Body {...selectedCompany}/>
    </NewsContext.Provider>
  );
}

export default MyNews;