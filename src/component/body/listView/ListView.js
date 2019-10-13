import React, { useEffect } from "react";

import FlickViewHeader from "./FlickViewHeader";
import NewsMainThumb from "./NewsMainThumb";
import NewsHeadList from "./NewsHeadList";

const ListView = ({ companyObj }) => (
  <div className="apl_newslist_wrap">
    <FlickViewHeader
      logoImgUrl={companyObj.logoImgUrl}
      companyName={companyObj.company}
    />
    <div className="apln_list_wrap">
      <NewsMainThumb thumbNews={companyObj.thumbnews} />
      <NewsHeadList newsList={companyObj.newslist} />
    </div>
  </div>
);

export default ListView;
