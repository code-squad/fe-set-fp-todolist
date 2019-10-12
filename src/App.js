import React from "react";
import Header from "./component/header/Header";
import Body from "./component/body/Body";
import { ImagePagingProvider } from "./context/ImagePagingProvider";
import { ListPagingProvider } from "./context/ListPagingProvider";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { viewType as initialViewType } from "./initialData";

function App() {
  return (
    <Router>
      <ImagePagingProvider>
        <ListPagingProvider>
          <div className="area_newsstand" style={{ width: 738 }}>
            <Header />
            <Switch>
              <Redirect exact path="/" to={`/${initialViewType}`} />
              <Route exact path="/:viewType" children={<Body />} />
            </Switch>
          </div>
        </ListPagingProvider>
      </ImagePagingProvider>
    </Router>
  );
}

export default App;
