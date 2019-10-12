import React from "react";

import Category from "./Category";
import FlickView from "./FlickView";
import { useParams } from "react-router-dom";

const Body = () => {
  let { viewType } = useParams();

  return (
    <div
      className="an_panel_list _PM_newsstand_list"
      style={{ display: "block" }}
    >
      {viewType === "list" ? <Category /> : null}
      <FlickView viewType={viewType} />
    </div>
  );
};

export default Body;
