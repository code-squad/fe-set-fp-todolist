import React from "react";
import Header from "./component/header/Header";
import Body from "./component/body/Body";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { viewType as initialViewType } from "./initialData";
import useNewsCompanyList from "./hooks/useNewsCompanyList";
import useNewsContent from "./hooks/useNewsContent";

export const ImagePagingContext = React.createContext(null);
export const ListPagingContext = React.createContext(null);

function App() {
  return (
    <Router>
      <ImagePagingContext.Provider value={useNewsCompanyList()}>
        <ListPagingContext.Provider value={useNewsContent()}>
          <div className="area_newsstand" style={{ width: 738 }}>
            <Header />
            <Switch>
              <Redirect exact path="/" to={`/${initialViewType}`} />
              <Route exact path="/:viewType" children={<Body />} />
            </Switch>
          </div>
        </ListPagingContext.Provider>
      </ImagePagingContext.Provider>
    </Router>
  );
}

export default App;
