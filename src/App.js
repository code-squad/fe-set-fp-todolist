import React from "react";
import Header from "./component/header/Header";
import Body from "./component/body/Body";
import { ViewTypeProvider } from "./context/ViewTypeProvider";
import { ImagePagingProvider } from "./context/ImagePagingProvider";
import { ListPagingProvider } from "./context/ListPagingProvider";

function App() {
  return (
    <ViewTypeProvider>
      <ImagePagingProvider>
        <ListPagingProvider>
          <div className="area_newsstand" style={{ width: 738 }}>
            <Header />
            <Body />
          </div>
        </ListPagingProvider>
      </ImagePagingProvider>
    </ViewTypeProvider>
  );
}

export default App;
