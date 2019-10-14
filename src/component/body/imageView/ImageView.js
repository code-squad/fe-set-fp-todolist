import React, { useEffect, useContext } from "react";

import { ImagePagingContext } from "../../../App";
import ImageViewLi from "./ImageViewLi";

const ImageView = () => {
  const { state, dispatch } = useContext(ImagePagingContext);
  const { companyList } = state;

  const listRender = ({ logo, name }, index) => {
    const onButtonClick = () => {
      dispatch({
        type: "subscribe",
        company: name,
        subscribe: false
      });
    };
    return (
      <ImageViewLi
        key={index}
        index={index}
        logo={logo}
        name={name}
        isMyNews={true}
        onButtonClick={onButtonClick}
      />
    );
  };

  return (
    <ul className="api_list">
      {companyList
        ? companyList.map((item, index) => listRender(item, index))
        : null}
    </ul>
  );
};

export default ImageView;
