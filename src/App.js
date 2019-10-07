import React, {useState, useEffect} from 'react';
import MyNews from "./MyNews";

import "./App.css";

const getCompanyList = response => {
  return response.map((item, index) => {
    return {...item, index};
  }); 

}

function App() {
  const [companyList, setCompanyList] = useState(false);

    useEffect(() => {
      async function fetchData() {
        const res = await fetch("http://127.0.0.1:8080");
        res
          .json()
          .then(res => {
            setCompanyList(getCompanyList(res));
          }).catch();
      }
      fetchData();
    }, []);

    
  return companyList && <MyNews companyList={companyList} />

}

export default App;