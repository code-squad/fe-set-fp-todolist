import React, { useState, useEffect } from "react";
import useCompanyList from "../hooks/useNewsCompanyList";
const PagingInfoContext = React.createContext();
const { Provider, Consumer: ListPagingConsumer } = PagingInfoContext;

const ListPagingProvider = ({ children }) => {
  const {
    state: { companyList, companyIndex },
    actions: { load, setCompanyIndex }
  } = useCompanyList();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    load();
  }, [companyIndex]);

  const setCompanyByName = companyName => {
    companyList &&
      setCompanyIndex(
        companyList.indexOf(companyList.find(item => item.name === companyName))
      );
  };

  const setAndValidateCompnayIndex = index => {
    index >= 0 && index < companyList.length && setCompanyIndex(index);
  };

  return (
    <Provider
      value={{
        companyList,
        company: companyList[companyIndex],
        setCompanyByName,
        setAndValidateCompnayIndex,
        companyIndex
      }}
    >
      {children}
    </Provider>
  );
};

export { ListPagingProvider, ListPagingConsumer };
