import React, { useEffect } from "react";

import useCompanyList from "../../../hooks/useNewsCompanyList";
import { ImagePagingConsumer } from "../../../context/ImagePagingProvider";

const ImageView = () => {
  const listRender = ({ logo, name }, index) => (
    <li key={index} className="api_item">
      <a href="#" className="api_link" target="_blank">
        <img src={logo} height="24" alt={name} className="api_logo" />
      </a>
    </li>
  );

  return (
    <ImagePagingConsumer>
      {({ companyList }) => (
        <ul className="api_list">
          {companyList
            ? companyList.map((item, index) => listRender(item, index))
            : null}
        </ul>
      )}
    </ImagePagingConsumer>
  );
};

export default ImageView;
