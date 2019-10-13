import React, { useEffect, useContext } from "react";

import useCompanyList from "../../../hooks/useNewsCompanyList";
import { ImagePagingContext } from "../../../App";

const ImageView = () => {
  const { state } = useContext(ImagePagingContext);
  const { companyList } = state;
  const listRender = ({ logo, name }, index) => (
    <li key={index} className="api_item">
      <a href="#" className="api_link" target="_blank">
        <img src={logo} height="24" alt={name} className="api_logo" />
      </a>
    </li>
  );

  return (
    <ul className="api_list">
      {companyList
        ? companyList.map((item, index) => listRender(item, index))
        : null}
    </ul>
  );
};

export default ImageView;
