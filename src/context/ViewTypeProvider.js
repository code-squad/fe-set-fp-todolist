import React, { useState } from "react";
const ViewTypeContext = React.createContext("list");
const { Provider, Consumer: ViewTypeConsumer } = ViewTypeContext;

const ViewTypeProvider = ({ children }) => {
  const [viewType, setViewType] = useState("list");
  return <Provider value={{ viewType, setViewType }}>{children}</Provider>;
};

export { ViewTypeProvider, ViewTypeConsumer };
