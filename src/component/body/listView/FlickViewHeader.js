import React, { useEffect } from "react";

import IconButton from "../../common/IconButton";

const FlickViewHeader = ({ companyName, logoImgUrl }) => (
  <div className="apln_header">
    <h3 className="apln_tit">
      <a href="#" className="apln_tlink" target="_blank">
        <img
          src={logoImgUrl}
          height="24"
          alt={companyName}
          className="api_logo"
        />
      </a>
    </h3>
    <span className="apln_edit_info">
      <span className="apln_time">10.04.19:01</span> 편집
    </span>
    <div className="apln_btn_wrap">
      <IconButton
        aTagAttr={{
          className: "apln_btn_delete _PM_newsstand_unsubscribe",
          href: "#",
          style: { display: "inline-block" }
        }}
        iTagAttr={{
          className: "apln_btn_ico_delete"
        }}
        blindText="MY뉴스에서 삭제"
      />
    </div>
  </div>
);
export default FlickViewHeader;
