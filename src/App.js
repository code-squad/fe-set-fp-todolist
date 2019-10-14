import React, { useEffect } from "react";
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
import { statement } from "@babel/template";

export const ImagePagingContext = React.createContext(null);
export const ListPagingContext = React.createContext(null);

const App = () => {
  const {
    state: companyListState,
    dispatch: companyListDispatch
  } = useNewsCompanyList(true);

  const {
    state: newsContentState,
    dispatch: newsContentDispatch
  } = useNewsContent();

  useEffect(() => {
    console.log("!!");
    newsContentDispatch({
      type: "init"
    });
  }, [companyListState.companyList]);

  return (
    <Router>
      <ImagePagingContext.Provider
        value={{
          state: companyListState,
          dispatch: companyListDispatch
        }}
      >
        <ListPagingContext.Provider
          value={{
            state: newsContentState,
            dispatch: newsContentDispatch
          }}
        >
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
};

export default App;
