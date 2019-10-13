import React, { useContext } from "react";
import ImageView from "./imageView/ImageView";
import ListView from "./listView/ListView";

import { ListPagingContext } from "../../App";

const FlickView = ({ viewType }) => {
  const { state } = useContext(ListPagingContext);
  const { companyObj } = state;
  return (
    <div className="flick-view">
      <div className="flick-container">
        <div className="flick-panel">
          {viewType === "image" ? (
            <ImageView />
          ) : companyObj ? (
            <ListView companyObj={companyObj} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FlickView;
