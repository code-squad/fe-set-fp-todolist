import React from "react";

import Category from "./Category";
import FlickView from "./FlickView";

import { ViewTypeConsumer } from "../../context/ViewTypeProvider";

const Body = () => (
  <div
    className="an_panel_list _PM_newsstand_list"
    style={{ display: "block" }}
  >
    <ViewTypeConsumer>
      {({ viewType }) => (viewType === "list" ? <Category /> : null)}
    </ViewTypeConsumer>
    <FlickView />
  </div>
);

export default Body;
