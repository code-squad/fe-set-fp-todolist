import React from "react";
import ImageView from "./imageView/ImageView";
import ListView from "./listView/ListView";

import { ViewTypeConsumer } from "../../context/ViewTypeProvider";
import { ListPagingConsumer } from "../../context/ListPagingProvider";

const FlickView = () => (
  <div className="flick-view">
    <div className="flick-container">
      <div className="flick-panel">
        <ViewTypeConsumer>
          {({ viewType }) => (
            <ListPagingConsumer>
              {({ company }) =>
                viewType === "image" ? (
                  <ImageView />
                ) : (
                  <ListView companyName={company ? company.name : ""} />
                )
              }
            </ListPagingConsumer>
          )}
        </ViewTypeConsumer>
      </div>
    </div>
  </div>
);

export default FlickView;
