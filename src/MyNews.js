import React, {useState} from "react";
import Header from "./Header/";
import SideBar from './SideBar/';
import Body from "./Body/";
import ListViewMenu from "./ListViewMenu/";
const MyNews = ({companyList}) => {
  const [selectedCompany, setSelected] = useState(companyList[0]);

  return (
    <>
      <Header
        companyList={companyList}
        selectedCompany={selectedCompany}
        setSelected={setSelected}
      />
      <ListViewMenu
        companyList={companyList}
        selectedCompany={selectedCompany}
        setSelected={setSelected}
      />
      <SideBar
        companyList={companyList}
        selectedCompany={selectedCompany}
        setSelected={setSelected}
      />
      <Body {...selectedCompany} />

    </>
  );
}

export default MyNews;