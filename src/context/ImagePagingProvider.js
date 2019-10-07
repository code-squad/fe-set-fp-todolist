import React, { useState, useEffect } from "react";
import useCompanyList from "../hooks/useNewsCompanyList";
const PagingInfoContext = React.createContext();
const { Provider, Consumer: ImagePagingConsumer } = PagingInfoContext;

const ImagePagingProvider = ({ children }) => {
  const {
    state: { companyList, startIndex, rowCount, total },
    actions: { load, setStartIndex: setStartIndexState }
  } = useCompanyList(18);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    load();
  }, [startIndex]);

  const setStartIndex = startIndex => {
    startIndex >= 0 && startIndex <= total && setStartIndexState(startIndex);
  };

  return (
    <Provider value={{ startIndex, rowCount, companyList, setStartIndex }}>
      {children}
    </Provider>
  );
};

export { ImagePagingProvider, ImagePagingConsumer };
