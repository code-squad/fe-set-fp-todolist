import React from "react";
import ImageView from "./imageView/ImageView";
import ListView from "./listView/ListView";

import { ListPagingConsumer } from "../../context/ListPagingProvider";

const FlickView = ({ viewType }) => (
  <div className="flick-view">
    <div className="flick-container">
      <div className="flick-panel">
        {
          <ListPagingConsumer>
            {({ company }) =>
              viewType === "image" ? (
                <ImageView />
              ) : (
                <ListView companyName={company ? company.name : ""} />
              )
            }
          </ListPagingConsumer>
        }
      </div>
    </div>
  </div>
);

export default FlickView;
